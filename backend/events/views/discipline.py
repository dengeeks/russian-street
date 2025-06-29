from rest_framework.exceptions import ValidationError
from rest_framework.views import APIView

from events.models.area import Area
from events.models.event import Event
from events.serializers.discipline import (SubDisciplineListSerializer, SubDisciplineDetailSerializer,
                                           DisciplineListSerializer)
from events.services.discipline import FilterService, SubDisciplineService, DisciplineService

MODEL_MAP = {
    'event': Event,
    'area': Area
}


class StructuredFilterOptionsAPIView(APIView):

    def get(self, request):
        # Валидация параметров
        model_type = request.query_params.get('type')
        if model_type not in MODEL_MAP:
            raise ValidationError("Parameter 'type' is required and must be 'event' or 'area'")

        try:
            region_id = int(request.query_params.get('region_id')) if 'region_id' in request.query_params else None
        except ValueError:
            raise ValidationError("region_id must be integer")

        # Получаем данные
        model_class = MODEL_MAP[model_type]
        data = FilterService.get_structured_options_for_model(
            model_class = model_class,
            region_id = region_id
        )

        return Response(data)


# api/views/discipline_views.py
from rest_framework import generics
from rest_framework.response import Response


class SubDisciplineListView(generics.ListAPIView):
    """API для получения списка поддисциплин"""
    serializer_class = SubDisciplineListSerializer

    def get_queryset(self):
        return SubDisciplineService.get_subdisciplines_for_list()


class SubDisciplineDetailView(generics.RetrieveAPIView):
    """API для получения детальной информации о поддисциплине"""
    serializer_class = SubDisciplineDetailSerializer
    lookup_field = 'pk'

    def get_object(self):
        pk = self.kwargs.get('pk')
        return SubDisciplineService.get_subdiscipline_detail(pk)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class DisciplineListView(generics.ListAPIView):
    """
    API для получения списка всех дисциплин с краткой информацией о субдисциплинах
    """
    serializer_class = DisciplineListSerializer

    def get_queryset(self):
        return DisciplineService.get_disciplines_with_subdisciplines()
