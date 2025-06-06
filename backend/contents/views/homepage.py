import logging

from rest_framework.response import Response
from rest_framework.views import APIView

from contents.services.homepage import HomePageService

logger = logging.getLogger(__name__)


class HomePageAPI(APIView):
    def get(self, request):
        """
            Извлечение статического контента домашней страницы с помощью HomePageService.
        """
        try:
            data = HomePageService.get_content_data()
            return Response(data)
        except Exception as e:
            logger.error(f"Ошибка при загрузке статических данных главной страницы: {str(e)}")
            return Response(
                {'error': 'Произошла ошибка при получении статических данных главной страницы'},
                status = 500
            )
