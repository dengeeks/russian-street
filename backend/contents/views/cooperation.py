import logging

from rest_framework.response import Response
from rest_framework.views import APIView

from contents.services.cooperation import CooperationService

logger = logging.getLogger(__name__)


class CooperationAPI(APIView):
    def get(self, request):
        """
            Извлечение статического контента страницы сотрудничество с помощью CooperationService.
        """
        try:
            data = CooperationService.get_content_data()
            return Response(data)
        except Exception as e:
            logger.error(f"Ошибка при загрузке статических данных страницы сотрудничество: {str(e)}")
            return Response(
                {'error': 'Произошла ошибка при получении статических данных страницы сотрудничество'},
                status = 500
            )
