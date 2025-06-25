import logging

from rest_framework import views
from rest_framework.response import Response

from managers.serializers.manager import ListManagerSerializer, ManagerCardSerializer, ManagerDetailSerializer
from managers.services.manager import ManagerService, ManagerCardService, DetailManagerService

logger = logging.getLogger(__name__)


class ListManagerAPI(views.APIView):
    serializer_class = ListManagerSerializer

    def get(self, request):
        """
            Извлечение данных руководителей с помощью ManagerService.
        """
        try:
            data = ManagerService.get_content_data(
                serializer_class = self.serializer_class
            )
            return Response(data)
        except Exception as e:
            logger.error(f"Ошибка при загрузке данных руководителей: {str(e)}")
            return Response(
                {'error': 'Ошибка при загрузке данных руководителей'},
                status = 500
            )


class ManagerCardAPIView(views.APIView):
    """
    API для получения руководителя по региону
    """
    serializer_class = ManagerCardSerializer

    def get(self, request, region_id):
        return ManagerCardService.get_manager_by_region(region_id, self.serializer_class)


class ManagerDetailAPIView(views.APIView):
    """
    API для получения полных данных руководителя по UUID
    """
    serializer_class = ManagerDetailSerializer

    def get(self, request, manager_uuid):
        return DetailManagerService.get_manager_detail(manager_uuid, self.serializer_class)
