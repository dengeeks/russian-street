from rest_framework import generics
from rest_framework.exceptions import ValidationError
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
import logging

from events.serializers.event import EventSerializer, AreaSerializer
from events.services.event import EventFilterService

logger = logging.getLogger(__name__)


class EventPagination(PageNumberPagination):
    """
    Пагинация для списка мероприятий/площадок

    Параметры:
    - page: Номер страницы
    - page_size: Количество элементов на странице (макс. 100)
    """
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

    def get_paginated_response(self, data):
        return Response(
            {
                'count': self.page.paginator.count,
                'total_pages': self.page.paginator.num_pages,
                'current_page': self.page.number,
                'results': data
            }
        )


class EventListAPI(generics.ListAPIView):
    """
    API для получения отфильтрованного списка мероприятий/площадок

    Параметры запроса:
    - type (обязательный): 'event' или 'area'
    - region_id: UUID региона (опционально)
    - city_id: UUID города (опционально)
    - type_ids: UUID типов через запятую (опционально)
    - subdiscipline_ids: UUID поддисциплин через запятую (опционально)
    - starting_date: Дата начала (YYYY-MM-DD, только для мероприятий)
    - ending_date: Дата окончания (YYYY-MM-DD, только для мероприятий)
    - sort: Вариант сортировки ('recent')
    - page: Номер страницы
    - page_size: Размер страницы (по умолчанию 10, максимум 100)
    """
    pagination_class = EventPagination
    filter_service = EventFilterService
    serializer_class = EventSerializer  # Базовый сериализатор по умолчанию

    def get_queryset(self):
        """
        Возвращает базовый QuerySet в зависимости от типа
        """
        model_type = self.request.query_params.get('type', 'event')
        model_class = self.filter_service.MODEL_MAPPING[model_type]['model']
        return model_class.objects.all()

    def get_serializer_class(self):
        """
        Определяет сериализатор в зависимости от типа запрашиваемых данных
        """
        model_type = self.request.query_params.get('type', 'event')
        return EventSerializer if model_type == 'event' else AreaSerializer

    def list(self, request, *args, **kwargs):
        """
        Основной метод обработки GET-запроса
        """
        try:
            # Валидация параметров
            validated_params = self.filter_service.validate_params(request.query_params)

            # Получение отфильтрованного QuerySet
            queryset = self.filter_service.get_queryset(validated_params)

            # Пагинация и сериализация
            page = self.paginate_queryset(queryset)
            serializer = self.get_serializer(page, many = True)

            return self.get_paginated_response(serializer.data)

        except ValidationError as e:
            logger.warning(f"Ошибка валидации параметров: {e.detail}")
            return Response(
                {'error': 'Неверные параметры запроса', 'details': e.detail},
                status = 400
            )
        except Exception as e:
            logger.exception(f"Внутренняя ошибка сервера при обработке запроса: {e}")
            return Response(
                {'error': 'Внутренняя ошибка сервера'},
                status = 500
            )