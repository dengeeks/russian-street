from django.core.exceptions import ObjectDoesNotExist
from rest_framework import permissions, status, generics
from rest_framework.response import Response

from favorites.serializers.favorite import FavoriteCreateSerializer
from favorites.services.favorite import FavoriteToggleService


class FavoriteToggleAPI(generics.CreateAPIView):
    """
    API для добавления/удаления из избранного объекта (мероприятие или площадка).

    POST:
    {
        "type": "event" | "area",
        "object_id": "uuid"
    }
    """
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = FavoriteCreateSerializer

    def post(self, request, *args, **kwargs):
        serializer = FavoriteCreateSerializer(data = request.data)
        if serializer.is_valid():
            try:
                result = FavoriteToggleService.toggle(
                    user = request.user,
                    model_type = serializer.validated_data['type'],
                    object_id = serializer.validated_data['object_id']
                )
                return Response(
                    {
                        'detail': result['message'],
                        'is_favorite': result['is_favorite']
                    },
                    status = status.HTTP_200_OK
                )
            except ObjectDoesNotExist as e:
                return Response({'detail': str(e)}, status = status.HTTP_404_NOT_FOUND)
            except ValueError as e:
                return Response({'detail': str(e)}, status = status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
