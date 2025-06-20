import logging

from rest_framework import views
from rest_framework.response import Response

from partners.serializers.partner import ListPartnerSerializer
from partners.services.partner import PartnerService

logger = logging.getLogger(__name__)


class ListPartnerAPI(views.APIView):
    serializer_class = ListPartnerSerializer

    def get(self, request):
        """
            Извлечение статического контента контактов с помощью ContactService.
        """
        try:
            data = PartnerService.get_content_data(
                serializer_class = self.serializer_class
            )
            return Response(data)
        except Exception as e:
            logger.error(f"Ошибка при загрузке данных партнеров: {str(e)}")
            return Response(
                {'error': 'Ошибка при загрузке данных партнеров'},
                status = 500
            )
