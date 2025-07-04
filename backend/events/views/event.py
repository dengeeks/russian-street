import logging

from rest_framework import generics
from rest_framework.exceptions import ValidationError
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response

from events.pagination import EventPagination
from events.serializers.event import (EventSerializer, AreaSerializer, EventDetailSerializer, AreaDetailSerializer,
                                      EventActivityTypeSerializer, AreaTypeSerializer)
from events.services.event import EventFilterService, EventAreaDetailService, EventTypeService

logger = logging.getLogger(__name__)


class EventAreaListAPI(generics.ListAPIView):
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


class EvenAreaDetailAPI(RetrieveAPIView):
    """API для получения деталей объекта"""
    filter_service = EventAreaDetailService
    serializer_class = EventDetailSerializer

    def get_serializer_class(self):
        """
        Определяет сериализатор в зависимости от типа запрашиваемых данных
        """
        model_type = self.request.query_params.get('type', 'event')
        return EventDetailSerializer if model_type == 'event' else AreaDetailSerializer

    def retrieve(self, request, *args, **kwargs):
        """
        Основной метод обработки GET-запроса
        """
        try:
            # Валидация параметров
            type = request.query_params.get('type')
            self.filter_service.validate_type(request.query_params.get('type'))

            # Получение обьекта
            obj = EventAreaDetailService.get_object(type, kwargs['id'])

            serializer = self.get_serializer(obj)
            return Response(serializer.data, status = 200)

        except ValidationError as e:
            logger.warning(f"Ошибка: {e.detail}")
            return Response(
                {'error': e.detail},
                status = 400
            )


class EventTypeListAPI(generics.ListAPIView):
    """
    API для получения списка типов площадок или мероприятий.

    Параметры запроса:
    - type (обязательный): 'event' или 'area'
    """

    def get_serializer_class(self):
        """
        Определяет сериализатор в зависимости от типа запрашиваемых данных
        """
        model_type = self.request.query_params.get('type', 'event')
        return EventActivityTypeSerializer if model_type == 'event' else AreaTypeSerializer

    def get_queryset(self):
        """
        Возвращает базовый QuerySet в зависимости от типа
        """
        model_type = self.request.query_params.get('type', 'event')
        queryset = EventTypeService.get_queryset(model_type)
        return queryset

    def list(self, request, *args, **kwargs):
        model_type = request.query_params.get('type')

        try:
            EventTypeService.validate_type(model_type)
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many = True)
            return Response(serializer.data)

        except ValidationError as e:
            logger.warning(f"Ошибка валидации параметров: {e.detail}")
            return Response(
                {'error': 'Неверные параметры запроса', 'details': e.detail},
                status = 400
            )
        except Exception as e:
            logger.exception(f"Внутренняя ошибка сервера: {e}")
            return Response(
                {'error': 'Внутренняя ошибка сервера'},
                status = 500
            )
