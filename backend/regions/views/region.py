from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.exceptions import ValidationError


import logging

from regions.serializers.region import RegionSerializer, CitySerializer
from regions.services.region import RegionFilterService

logger = logging.getLogger(__name__)


class StructuredRegionCityAPI(APIView):

    def get(self, request):
        try:
            queryset, data_type = RegionFilterService.get_queryset(request.query_params)

            if data_type == 'region':
                serializer = RegionSerializer(queryset, many=True)
            else:
                serializer = CitySerializer(queryset, many=True)

            return Response(serializer.data)

        except ValidationError as e:
            logger.warning(f'Ошибка валидации: {str(e)}')
            return Response(
                {
                    'ошибка': 'Неверные параметры запроса',
                    'детали': e.message_dict
                },
                status=400
            )

        except Exception as e:
            logger.error(f'Внутренняя ошибка сервера: {str(e)}', exc_info=True)
            return Response(
                {'ошибка': 'Внутренняя ошибка сервера'},
                status=500
            )
