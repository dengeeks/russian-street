import logging

from rest_framework.response import Response
from rest_framework.views import APIView

from contents.services.contact import ContactService

logger = logging.getLogger(__name__)


class ContactAPI(APIView):
    def get(self, request):
        """
            Извлечение статического контента контактов с помощью ContactService.
        """
        try:
            data = ContactService.get_content_data()
            return Response(data)
        except Exception as e:
            logger.error(f"Ошибка при загрузке статических данных контактов: {str(e)}")
            return Response(
                {'error': 'Произошла ошибка при получении статических данных контактов'},
                status = 500
            )
