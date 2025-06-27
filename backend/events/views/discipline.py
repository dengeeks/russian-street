import logging

from rest_framework import views, status
from rest_framework.response import Response

from events.serializers.discipline import ListSubDisciplineSerializer, SubDisciplineDetailSerializer
from events.services.discipline import ListSubDisciplineService, SubDisciplineDetailService

logger = logging.getLogger(__name__)


class ListSubDisciplineAPI(views.APIView):
    """
    API для получения списка поддисциплин с пагинацией.

    Параметры:
        - page: номер страницы (default: 1)
        - per_page: элементов на странице (default: 11)
        - discipline_id: фильтр по ID дисциплины (optional)
    """
    serializer_class = ListSubDisciplineSerializer

    def get(self, request):
        try:
            page = int(request.GET.get('page', 1))
            per_page = int(request.GET.get('per_page', 11))
            discipline_id = request.GET.get('discipline_id', None)
            data = ListSubDisciplineService.get_by_discipline_paginated(
                discipline_id = discipline_id,
                page_number = page,
                per_page = per_page,
                serializer_class = self.serializer_class

            )
            return Response(data)
        except Exception as e:
            logger.error(f"Ошибка при загрузке направлений: {str(e)}")
            return Response(
                {'error': 'Ошибка при загрузке направлений'},
                status = 500
            )


class SubDisciplineDetailAPI(views.APIView):
    """
    API для получения поддисциплины по ID
    """
    serializer_class = SubDisciplineDetailSerializer

    def get(self, request, pk):
        subdiscipline = SubDisciplineDetailService.get_subdiscipline_by_id(pk)

        if not subdiscipline:
            return Response(
                {'error': 'Направление не найдено'},
                status = status.HTTP_404_NOT_FOUND
            )

        serializer = self.serializer_class(
            subdiscipline,
        )

        return Response(serializer.data)
