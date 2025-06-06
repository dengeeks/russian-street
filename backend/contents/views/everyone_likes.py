import logging

from rest_framework.response import Response
from rest_framework.views import APIView

from contents.services.everyone_likes import EveryOneLikesService

logger = logging.getLogger(__name__)


class EveryOneLikesAPI(APIView):
    def get(self, request):
        """
            Извлечение статического контента блока у нас понравится всем с помощью EveryOneLikesService.
        """
        try:
            data = EveryOneLikesService.get_content_data()
            return Response(data)
        except Exception as e:
            logger.error(f"Ошибка при загрузке статических данных блока у нас понравится всем': {str(e)}")
            return Response(
                {'error': 'Произошла ошибка при получении статических данных блока у нас понравится всем'},
                status = 500
            )
