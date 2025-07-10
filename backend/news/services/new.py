import logging
import uuid
from datetime import datetime
from uuid import UUID

from django.db.models import F
from django.db.models import Q
from rest_framework.exceptions import ValidationError
from rest_framework.generics import get_object_or_404

from news.models.new import New

logger = logging.getLogger(__name__)


class NewsFilterService:
    SORT_OPTIONS = {
        'recent': '-created_at',
    }

    @classmethod
    def _validate_year(cls, value, field_name):
        if not value:
            return None
        try:
            year = int(value)
            if year < 1 or year > 9999:
                raise ValueError
            return year
        except ValueError:
            raise ValidationError({field_name: 'Неверный формат года. Ожидается целое число от 1 до 9999.'})

    @classmethod
    def _validate_month(cls, value, field_name):
        if not value:
            return None
        try:
            month = int(value)
            if month < 1 or month > 12:
                raise ValueError
            return month
        except ValueError:
            raise ValidationError({field_name: 'Неверный формат месяца. Ожидается число от 1 до 12.'})

    @classmethod
    def _validate_uuid(cls, value, field_name):
        if not value:
            return None
        try:
            return uuid.UUID(value)
        except ValueError:
            raise ValidationError({field_name: 'Неверный формат UUID'})

    @classmethod
    def _validate_sort(cls, sort):
        if sort and sort not in cls.SORT_OPTIONS:
            raise ValidationError(
                {
                    'sort': f'Неверное значение сортировки. Допустимые: {", ".join(cls.SORT_OPTIONS.keys())}'
                }
            )
        return cls.SORT_OPTIONS.get(sort, '-count_views')

    @classmethod
    def validate_params(cls, params):
        return {
            'region_id': cls._validate_uuid(params.get('region_id'), 'region_id'),
            'city_id': cls._validate_uuid(params.get('city_id'), 'city_id'),
            'subdiscipline_ids': cls._validate_uuid(params.get('subdiscipline_ids'), 'subdiscipline_ids'),
            'sort': cls._validate_sort(params.get('sort')),
            'created_at_year': cls._validate_year(params.get('created_at_year'), 'created_at_year'),
            'created_at_month': cls._validate_month(params.get('created_at_month'), 'created_at_month'),
        }

    @classmethod
    def get_queryset(cls, validated_params):
        qs = New.objects.select_related('city')
        filters = Q()

        if validated_params['region_id']:
            filters &= Q(region_id = validated_params['region_id'])
        if validated_params['city_id']:
            filters &= Q(city_id = validated_params['city_id'])
        if validated_params['subdiscipline_ids']:
            filters &= Q(subdiscipline_id = validated_params['subdiscipline_ids'])
        year = validated_params['created_at_year']
        month = validated_params['created_at_month']

        if year and month:
            # Фильтрация по году и месяцу
            start_date = datetime(year, month, 1)
            if month == 12:
                end_date = datetime(year + 1, 1, 1)
            else:
                end_date = datetime(year, month + 1, 1)
            filters &= Q(created_at__gte = start_date, created_at__lt = end_date)

        elif year:
            # Только год
            start_date = datetime(year, 1, 1)
            end_date = datetime(year + 1, 1, 1)
            filters &= Q(created_at__gte = start_date, created_at__lt = end_date)

        elif month:
            # Только месяц (независимо от года)
            filters &= Q(created_at__month = month)

        return qs.filter(filters).order_by(validated_params['sort'])


class NewsDetailService:
    """
    Сервис для получения детали новости с инкрементом просмотров по сессии.
    """

    SESSION_KEY = 'viewed_news'

    @classmethod
    def get_object(cls, news_id: UUID, session) -> New:
        """
        Получает новость и обновляет счётчик просмотров, если просмотр уникальный.

        :param news_id: UUID новости
        :param session: request.session
        :return: объект новости
        """
        news_id_str = str(news_id)

        viewed_news = session.get(cls.SESSION_KEY, [])

        if news_id_str not in viewed_news:
            cls._increment_views(news_id)
            viewed_news.append(news_id_str)
            session[cls.SESSION_KEY] = viewed_news
            session.modified = True

        return get_object_or_404(
            New.objects.select_related('city', 'subdiscipline').prefetch_related('gallery_items'),
            id = news_id
        )

    @classmethod
    def _increment_views(cls, news_id: UUID):
        """
        Увеличивает счётчик просмотров для уникального просмотра.
        """
        try:
            New.objects.filter(id = news_id).update(count_views = F('count_views') + 1)
        except Exception as e:
            logger.warning(f"Не удалось увеличить просмотры для новости {news_id}: {e}")
