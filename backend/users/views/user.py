from rest_framework import permissions, generics
from rest_framework.response import Response

from users.serializers.user import UserUpdateSerializer, UserRetrieveSerializer
from users.services.user import UserUpdateService


class UserUpdateAPI(generics.UpdateAPIView):
    http_method_names = ['patch']
    serializer_class = UserUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        data, status = UserUpdateService.update_user(
            self.get_serializer, self.request.data, self.request.user
        )
        return Response(data = data, status = status)


class UserRetrieveAPI(generics.RetrieveAPIView):
    serializer_class = UserRetrieveSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user
