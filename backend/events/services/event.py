import uuid
from datetime import datetime

from django.contrib.contenttypes.models import ContentType
from django.db.models import Q, OuterRef, Value, Exists, BooleanField
from django.utils import timezone
from rest_framework.generics import get_object_or_404

from events.models.area import Area
from events.models.event import Event
from favorites.models.favorite import FavoriteObject


class FavoriteService:
    """
    Сервис для работы с избранным (универсально для event и area через contenttypes).
    """

    @staticmethod
    def annotate_is_favorite(queryset, user):
        if not user or not user.is_authenticated:
            return queryset.annotate(is_favorite = Value(False, output_field = BooleanField()))
        content_type = ContentType.objects.get_for_model(queryset.model)
        favorite_qs = FavoriteObject.objects.filter(
            user = user,
            content_type = content_type,
            object_id = OuterRef('pk')
        )
        return queryset.annotate(is_favorite = Exists(favorite_qs))

    @staticmethod
    def is_favorite(obj, user):
        if not user or not user.is_authenticated:
            return False
        content_type = ContentType.objects.get_for_model(obj.__class__)
        return FavoriteObject.objects.filter(
            user = user,
            content_type = content_type,
            object_id = obj.pk
        ).exists()


class EventFilterService:
    """
    Сервис для фильтрации и сортировки мероприятий и площадок

    Параметры:
    - type: Тип объекта ('event' или 'area')
    - region_id: UUID региона (опционально)
    - city_id: UUID города (опционально)
    - type_ids: Список UUID типов через запятую (опционально)
    - subdiscipline_ids: Список UUID поддисциплин через запятую (опционально)
    - starting_date: Дата начала периода (YYYY-MM-DD, только для мероприятий)
    - ending_date: Дата окончания периода (YYYY-MM-DD, только для мероприятий)
    - sort: Вариант сортировки ('recent')
    """

    MODEL_MAPPING = {
        'event': {
            'model': Event,
            'type_model': 'eventactivitytype',
            'default_order': '-is_priority',  # По умолчанию сортировка по приоритету
            'date_filter': True,
            'sort_options': {
                'recent': '-created_at',  # Недавно добавленные
            }
        },
        'area': {
            'model': Area,
            'type_model': 'areatype',
            'default_order': None,
            'date_filter': False,
            'sort_options': {
                'recent': '-created_at',  # Новые площадки (по дате создания)
            }
        }
    }

    @classmethod
    def _validate_date(cls, date_str, field_name):
        """
        Валидация даты в формате YYYY-MM-DD

        Args:
            date_str (str): Строка с датой
            field_name (str): Название поля для сообщения об ошибке

        Returns:
            date: Объект даты или None

        Raises:
            ValidationError: Если формат даты неверный
        """
        if not date_str:
            return None
        try:
            return datetime.strptime(date_str, '%Y-%m-%d').date()
        except ValueError:
            raise ValidationError(
                {
                    field_name: 'Неверный формат даты. Используйте YYYY-MM-DD'
                }
            )

    @classmethod
    def _validate_uuid_list(cls, uuid_str, field_name):
        """
        Валидация списка UUID через запятую

        Args:
            uuid_str (str): Строка с UUID через запятую
            field_name (str): Название поля для сообщения об ошибке

        Returns:
            list: Список UUID или пустой список

        Raises:
            ValidationError: Если какой-то UUID невалидный
        """
        if not uuid_str:
            return []
        try:
            return [uuid.UUID(tid.strip()) for tid in uuid_str.split(',')]
        except ValueError:
            raise ValidationError(
                {
                    field_name: 'Неверный формат UUID. Укажите UUID через запятую'
                }
            )

    @classmethod
    def _validate_uuid(cls, uuid_str, field_name):
        """
        Валидация одиночного UUID

        Args:
            uuid_str (str): Строка с UUID
            field_name (str): Название поля для сообщения об ошибке

        Returns:
            UUID: Валидный UUID или None

        Raises:
            ValidationError: Если UUID невалидный
        """
        if not uuid_str:
            return None
        try:
            return uuid.UUID(uuid_str)
        except ValueError:
            raise ValidationError(
                {
                    field_name: 'Неверный формат UUID'
                }
            )

    @classmethod
    def validate_params(cls, params):
        """
        Валидация параметров запроса

        Args:
            params (dict): Параметры запроса

        Returns:
            dict: Валидированные параметры

        Raises:
            ValidationError: При невалидных параметрах
        """
        model_type = params.get('type')
        if model_type not in cls.MODEL_MAPPING:
            raise ValidationError(
                {
                    'type': 'Неверный тип объекта. Допустимые значения: %(types)s' % {
                        'types': ', '.join(cls.MODEL_MAPPING.keys())
                    }
                }
            )

        config = cls.MODEL_MAPPING[model_type]

        # Валидация параметра сортировки
        sort = params.get('sort')
        if sort and config['sort_options'] and sort not in config['sort_options']:
            raise ValidationError(
                {
                    'sort': 'Неверный вариант сортировки. Допустимые значения: %(options)s' % {
                        'options': ', '.join(config['sort_options'].keys())
                    }
                }
            )

        validated_data = {
            'model_type': model_type,
            'sort': sort,
            'region_id': cls._validate_uuid(params.get('region_id'), 'region_id'),
            'city_id': cls._validate_uuid(params.get('city_id'), 'city_id'),
            'type_ids': cls._validate_uuid_list(params.get('type_ids'), 'type_ids'),
            'subdiscipline_ids': cls._validate_uuid_list(params.get('subdiscipline_ids'), 'subdiscipline_ids'),
        }

        # Валидация дат только для мероприятий
        if config['date_filter']:
            validated_data['starting_date'] = cls._validate_date(params.get('starting_date'), 'starting_date')
            validated_data['ending_date'] = cls._validate_date(params.get('ending_date'), 'ending_date')

            # Проверка что начальная дата не позже конечной
            if (validated_data['starting_date'] and validated_data['ending_date'] and
                    validated_data['starting_date'] > validated_data['ending_date']):
                raise ValidationError(
                    {
                        'starting_date': 'Дата начала должна быть раньше даты окончания'
                    }
                )

        return validated_data

    @classmethod
    def get_queryset(cls, validated_params, user = None):
        """
        Получение отфильтрованного QuerySet

        Args:
            validated_params (dict): Валидированные параметры запроса

        Returns:
            QuerySet: Отфильтрованный и отсортированный QuerySet
        """
        config = cls.MODEL_MAPPING[validated_params['model_type']]
        qs = config['model'].objects.select_related('city')

        # Базовые фильтры
        filters = Q()

        if validated_params['region_id']:
            filters &= Q(region_id = validated_params['region_id'])

        if validated_params['city_id']:
            filters &= Q(city_id = validated_params['city_id'])

        if validated_params['type_ids']:
            filters &= Q(type_id__in = validated_params['type_ids'])

        if validated_params['subdiscipline_ids']:
            filters &= Q(sub_discipline_id__in = validated_params['subdiscipline_ids'])

        # Фильтрация по датам (только для мероприятий)
        if config['date_filter']:
            date_filters = Q()

            if validated_params['starting_date']:
                date_filters &= Q(starting_date__date__gte = validated_params['starting_date'])

            if validated_params['ending_date']:
                date_filters &= Q(ending_date__date__lte = validated_params['ending_date'])
            else:
                date_filters &= Q(ending_date__date__gte = timezone.now().date())

            filters &= date_filters

        qs = qs.filter(filters)

        # Определение сортировки
        order = None
        if validated_params.get('sort'):
            order = config['sort_options'][validated_params['sort']]
        elif config['default_order']:
            order = config['default_order']

        if order:
            qs = qs.order_by(order)

        qs = FavoriteService.annotate_is_favorite(qs, user)
        return qs


class EventAreaDetailService:
    """Сервис для работы с деталями объектов"""

    MODEL_MAPPING = {
        'event': {
            'model': Event,
            'select_related': ['city'],
        },
        'area': {
            'model': Area,
            'select_related': ['city'],
        }
    }

    @classmethod
    def validate_type(cls, model_type: str) -> None:
        """Валидация типа объекта (event/area)"""
        if model_type not in cls.MODEL_MAPPING:
            raise ValidationError(
                {'type': f"Допустимые значения: {', '.join(cls.MODEL_MAPPING.keys())}"}
            )

    @classmethod
    def get_object(cls, model_type, object_id, user = None):
        config = cls.MODEL_MAPPING[model_type]
        obj = get_object_or_404(
            config['model'].objects
            .select_related(
                *config['select_related'],
            ),
            id = object_id
        )
        obj.is_favorite = FavoriteService.is_favorite(obj, user)
        return obj


from events.models.base import AreaType, EventActivityType
from rest_framework.exceptions import ValidationError


class EventTypeService:
    """
    Сервис для получения типов мероприятий и площадок.

    Поддерживаемые типы:
    - event: Типы мероприятий
    - area: Типы площадок
    """

    MODEL_MAPPING = {
        'event': EventActivityType,
        'area': AreaType,
    }

    @classmethod
    def validate_type(cls, model_type: str):
        if model_type not in cls.MODEL_MAPPING:
            raise ValidationError(
                {'type': f"Недопустимое значение. Допустимые: {', '.join(cls.MODEL_MAPPING.keys())}"}
            )

    @classmethod
    def get_queryset(cls, model_type: str):
        cls.validate_type(model_type)
        return cls.MODEL_MAPPING[model_type].objects.all()


from typing import Literal
from django.utils.timezone import now
from django.db.models import QuerySet

from events.models.event import Event
from events.models.area import Area


class ShortListService:
    """
    Сервис для получения краткого списка мероприятий или площадок.
    """

    ModelType = Literal['event', 'area']

    MODEL_MAPPING = {
        'event': Event,
        'area': Area,
    }

    @classmethod
    def get_list(cls, model_type, region_id = None, limit = 5, user = None):
        if model_type not in cls.MODEL_MAPPING:
            raise ValueError('Допустимые значения: event, area')

        limit = min(limit, 20)

        model = cls.MODEL_MAPPING[model_type]
        qs = model.objects.select_related('city')

        if region_id:
            qs = qs.filter(region_id = region_id)

        if model_type == 'event':
            qs = qs.filter(ending_date__gte = now())
            qs = qs.order_by('-is_priority', '-created_at')
        else:
            qs = qs.order_by('-created_at')

        qs = FavoriteService.annotate_is_favorite(qs, user)
        return qs[:limit]
