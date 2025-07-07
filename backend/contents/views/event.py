import logging

from rest_framework.response import Response
from rest_framework.views import APIView

from contents.services.event import EventContentService

logger = logging.getLogger(__name__)


class EventContentAPI(APIView):
    def get(self, request):
        """
            Извлечение статического контента страницы о нас с помощью EventContentService.
        """
        try:
            data = EventContentService.get_content_data()
            return Response(data)
        except Exception as e:
            logger.error(f"Ошибка при загрузке статических данных мероприятий и площадок: {str(e)}")
            return Response(
                {'error': 'Произошла ошибка при получении статических данных мероприятий и площадок'},
                status = 500
            )
