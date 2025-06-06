import logging

from rest_framework.response import Response
from rest_framework.views import APIView

from contents.services.abouts_us import AboutUsService

logger = logging.getLogger(__name__)


class AboutUsAPI(APIView):
    def get(self, request):
        """
            Извлечение статического контента страницы о нас с помощью AboutUsService.
        """
        try:
            data = AboutUsService.get_content_data()
            return Response(data)
        except Exception as e:
            logger.error(f"Ошибка при загрузке статических данных страницы о нас: {str(e)}")
            return Response(
                {'error': 'Произошла ошибка при получении статических данных страницы о нас'},
                status = 500
            )
