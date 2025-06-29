import logging

from rest_framework import generics
from rest_framework.exceptions import NotFound, ValidationError
from rest_framework.response import Response
from rest_framework.views import APIView

from events.serializers.discipline import (SubDisciplineListSerializer, SubDisciplineDetailSerializer,
                                           DisciplineListSerializer)
from events.services.discipline import FilterService, SubDisciplineService, DisciplineService

logger = logging.getLogger(__name__)


class StructuredFilterOptionsAPI(APIView):
    """
    API для получения структурированных опций фильтрации дисциплин и поддисциплин.

    Поддерживает фильтрацию по:
    - Типу модели (event/area)
    - Региону (region_id)
    - Периоду (starting_date, ending_date)
    """

    def get(self, request):
        """
        Обработка GET-запроса для получения фильтрованных опций.

        Параметры:
        - type (обязательный): Тип модели (event/area)
        - region_id (опционально): UUID региона
        - starting_date (опционально): Дата начала периода (YYYY-MM-DD)
        - ending_date (опционально): Дата окончания периода (YYYY-MM-DD)
        """
        try:
            data = FilterService.get_structured_options(request.query_params)
            return Response(data)

        except ValidationError as e:
            logger.warning(f'Ошибка валидации: {str(e)}')
            return Response(
                {
                    'ошибка': 'Неверные параметры запроса',
                    'детали': e.detail
                },
                status = 400
            )

        except Exception as e:
            logger.error(f'Ошибка сервера: {str(e)}', exc_info = True)
            return Response(
                {
                    'ошибка': 'Внутренняя ошибка сервера'
                },
                status = 500
            )


class SubDisciplineListAPI(generics.ListAPIView):
    """API для получения списка поддисциплин"""
    serializer_class = SubDisciplineListSerializer

    def get_queryset(self):
        return SubDisciplineService.get_subdisciplines_for_list(self.serializer_class)


class SubDisciplineDetailAPI(generics.RetrieveAPIView):
    """API для получения детальной информации о поддисциплине"""
    serializer_class = SubDisciplineDetailSerializer
    lookup_field = 'pk'
    lookup_url_kwarg = 'pk'

    def get_object(self):
        try:
            pk = self.kwargs.get('pk')
            return SubDisciplineService.get_subdiscipline_detail(pk)
        except:
            raise NotFound('Направление не найдено')


class DisciplineListAPI(generics.ListAPIView):
    """
    API для получения списка всех дисциплин с краткой информацией о субдисциплинах
    """
    serializer_class = DisciplineListSerializer

    def get_queryset(self):
        return DisciplineService.get_disciplines_with_subdisciplines()
