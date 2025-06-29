import uuid
from datetime import datetime

from django.conf import settings
from django.db.models import Prefetch
from django.utils import timezone
from django.utils.dateparse import parse_date
from rest_framework.exceptions import ValidationError

from common.mixins import CacheServiceMixin
from events.models.area import Area
from events.models.discipline import Discipline, SubDiscipline
from events.models.event import Event


class FilterService:
    """
    Сервис для фильтрации данных с четким разделением ответственности
    """

    __model_discipline = Discipline
    __model_subdiscipline = SubDiscipline
    MODEL_CHOICES = {'event': Event, 'area': Area}

    @classmethod
    def validate_and_get_filters(cls, params):
        """
        Валидация и преобразование параметров запроса.

        Args:
            params: Словарь параметров запроса

        Returns:
            dict: Валидированные фильтры:
                - model_class: Класс модели
                - region_id: UUID региона (опционально)
                - starting_date: Дата начала (опционально)
                - ending_date: Дата окончания (опционально)

        Raises:
            ValidationError: При невалидных параметрах
        """
        model_type = params.get('type')
        if model_type not in cls.MODEL_CHOICES:
            raise ValidationError(
                {
                    'error': 'Invalid model type',
                    'available_types': list(cls.MODEL_CHOICES.keys())
                }
            )

        try:
            region_id = uuid.UUID(params['region_id']) if params.get('region_id') else None
        except ValueError:
            raise ValidationError({'region_id': 'Must be valid UUID'})

        starting_date = cls._parse_date(params.get('starting_date'))
        ending_date = cls._parse_date(params.get('ending_date'))

        return {
            'model_class': cls.MODEL_CHOICES[model_type],
            'region_id': region_id,
            'starting_date': starting_date,
            'ending_date': ending_date
        }

    @staticmethod
    def _parse_date(date_str):
        """
        Парсинг строки с датой в объект datetime.

        Args:
            date_str: Строка с датой в формате YYYY-MM-DD

        Returns:
            datetime: Объект datetime

        Raises:
            ValidationError: При неверном формате даты
        """
        if not date_str:
            return None
        date = parse_date(date_str)
        if not date:
            raise ValidationError({'date': 'Use YYYY-MM-DD format'})
        return datetime.combine(date, datetime.min.time())

    @classmethod
    def _get_active_subdisciplines(cls, model_class, region_id = None, starting_date = None, ending_date = None):
        """
        Получение ID активных поддисциплин с учетом фильтров.

        Args:
            model_class: Класс модели для фильтрации
            region_id: UUID региона (опционально)
            starting_date: Дата начала периода (опционально)
            ending_date: Дата окончания периода (опционально)

        Returns:
            QuerySet: Уникальные ID поддисциплин
        """
        qs = model_class.objects.all()

        # Специальная фильтрация для событий
        if model_class.__name__ == 'Event':
            if starting_date:
                qs = qs.filter(starting_date__date__gte = starting_date)
            if ending_date:
                qs = qs.filter(ending_date__date__lte = ending_date)
            else:
                qs = qs.filter(ending_date__date__gte = timezone.localtime(timezone.now()))

        if region_id:
            qs = qs.filter(region_id = region_id)

        return qs.values_list('sub_discipline_id', flat = True).distinct()

    @classmethod
    def get_structured_options(cls, params):
        """
        Получение структурированных данных дисциплин и поддисциплин.

        Args:
            params: Параметры запроса

        Returns:
            list: Список словарей с данными:
                - discipline: Данные дисциплины
                - subdisciplines: Список поддисциплин

        Raises:
            ValidationError: При невалидных параметрах
        """
        validated = cls.validate_and_get_filters(params)
        subdiscipline_ids = cls._get_active_subdisciplines(
            model_class = validated['model_class'],
            region_id = validated['region_id'],
            starting_date = validated['starting_date'],
            ending_date = validated['ending_date']
        )

        disciplines = cls.__model_discipline.objects.filter(
            sub_disciplines__id__in = subdiscipline_ids
        ).prefetch_related(
            Prefetch(
                'sub_disciplines',
                queryset = cls.__model_subdiscipline.objects.filter(id__in = subdiscipline_ids),
                to_attr = 'relevant_subdisciplines'
            )
        ).distinct().only('id', 'name')

        return cls._format_result(disciplines)

    @staticmethod
    def _format_result(disciplines):
        """
        Форматирование результата в единую структуру.

        Args:
            disciplines: QuerySet дисциплин с поддисциплинами

        Returns:
            list: Отформатированный список данных
        """
        return [{
            'discipline': {'id': str(d.id), 'name': d.name},
            'subdisciplines': [
                {'id': str(sd.id), 'name': sd.name}
                for sd in d.relevant_subdisciplines
            ]
        } for d in disciplines]


class SubDisciplineService(CacheServiceMixin):
    """
    Сервис для работы с поддисциплинами с поддержкой кэширования.
    """
    __model_subdiscipline = SubDiscipline
    CACHE_KEY = settings.CACHE_SUBDISCIPLINE_KEY
    CACHE_TIMEOUT = settings.CACHE_SUBDISCIPLINE_TIMEOUT

    @classmethod
    def get_subdisciplines_for_list(cls, serializer_class):
        """
        Получение кэшированного списка поддисциплин.

        Args:
            serializer_class: Класс DRF сериализатора

        Returns:
            list: Список сериализованных поддисциплин
        """
        return cls.get_content_data(serializer_class = serializer_class)

    @classmethod
    def _fetch_data(cls, serializer_class, **kwargs):
        """
        Реализация абстрактного метода - получение и сериализация данных.

        Args:
            serializer_class: Класс DRF сериализатора
            **kwargs: Дополнительные параметры

        Returns:
            list: Список сериализованных поддисциплин
        """
        queryset = cls._get_base_queryset()
        return cls._serialize_collection(queryset, serializer_class)

    @classmethod
    def _get_base_queryset(cls):
        """
        Базовый QuerySet для поддисциплин.

        Returns:
            QuerySet: Поддисциплины с select_related
        """
        return cls.__model_subdiscipline.objects.select_related('discipline').all()

    @classmethod
    def get_subdiscipline_detail(cls, pk):
        """
        Получение детальной информации о поддисциплине.

        Args:
            pk: UUID поддисциплины
            serializer_class: Класс DRF сериализатора

        Returns:
            dict: Сериализованные данные поддисциплины
        """
        instance = (
            SubDiscipline.objects
            .select_related('discipline')
            .prefetch_related('gallery_items')
            .get(pk = pk)
        )
        return instance


class DisciplineService:
    __model_discipline = Discipline

    @classmethod
    def get_disciplines_with_subdisciplines(cls):
        """Получение всех дисциплин с предзагруженными субдисциплинами"""
        return cls.__model_discipline.objects.prefetch_related(
            Prefetch(
                'sub_disciplines',
                queryset = SubDiscipline.objects.only('id', 'name')
            )
        ).all()
