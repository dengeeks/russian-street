import logging

from django.core.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.views import APIView

from users.serializers.manager import RegionManagerSerializer
from users.services.manager import RegionManagerService

logger = logging.getLogger(__name__)


class RegionManagerAPI(APIView):
    """
    API для получения руководителя региона по region_id
    """

    def get(self, request):
        region_id = request.query_params.get('region_id')

        if not region_id:
            return Response({'ошибка': 'Параметр region_id обязателен'}, status = 400)

        try:
            manager = RegionManagerService.get_manager_by_region_id(region_id)

            if not manager:
                return Response({}, status = 200)  # Пустой объект, если нет руководителя

            serializer = RegionManagerSerializer(manager)
            return Response(serializer.data)

        except ValidationError as e:
            logger.warning(f'Ошибка валидации: {e}')
            return Response({'ошибка': e.message_dict}, status = 400)

        except Exception as e:
            logger.error(f'Внутренняя ошибка сервера: {e}', exc_info = True)
            return Response({'ошибка': 'Внутренняя ошибка сервера'}, status = 500)
