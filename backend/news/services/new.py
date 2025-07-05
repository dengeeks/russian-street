import logging
import uuid
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
            'subdiscipline_id': cls._validate_uuid(params.get('subdiscipline_id'), 'subdiscipline_id'),
            'sort': cls._validate_sort(params.get('sort')),
        }

    @classmethod
    def get_queryset(cls, validated_params):
        qs = New.objects.select_related('city')
        filters = Q()

        if validated_params['region_id']:
            filters &= Q(region_id = validated_params['region_id'])
        if validated_params['city_id']:
            filters &= Q(city_id = validated_params['city_id'])
        if validated_params['subdiscipline_id']:
            filters &= Q(subdiscipline_id = validated_params['subdiscipline_id'])

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
            New.objects.select_related('city').prefetch_related('gallery_items'),
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
