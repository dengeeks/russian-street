import logging

from rest_framework import generics
from rest_framework.exceptions import ValidationError

from news.pagination import NewPagination
from news.serializers.new import NewListSerializer, NewDetailSerializer
from news.services.new import NewsFilterService, NewsDetailService

logger = logging.getLogger(__name__)


class NewsListAPI(generics.ListAPIView):
    """
    API для получения списка новостей.

    Параметры запроса:
    - region_id: UUID региона (опционально)
    - city_id: UUID города (опционально)
    - subdiscipline_id: UUID направления (опционально)
    - sort: Вариант сортировки (напр. 'recent')
    """
    serializer_class = NewListSerializer
    pagination_class = NewPagination  # можно использовать стандартную PageNumberPagination

    def get_queryset(self):
        try:
            # Валидация входных параметров
            validated_params = NewsFilterService.validate_params(self.request.query_params)

            # Получение отфильтрованного queryset
            return NewsFilterService.get_queryset(validated_params)
        except ValidationError as e:
            logger.warning(f'Ошибка валидации параметров: {e.detail}')
            raise
        except Exception as e:
            logger.error(f'Внутренняя ошибка при получении новостей: {e}')
            raise ValidationError({'error': 'Внутренняя ошибка сервера'})


class NewsDetailAPI(generics.RetrieveAPIView):
    """
    API для получения деталей новости + учёт уникального просмотра (через сессию)
    """
    serializer_class = NewDetailSerializer

    def get_object(self):
        new_id = self.kwargs.get('id')
        new = NewsDetailService.get_object(new_id, self.request.session)
        return new
