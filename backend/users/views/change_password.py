from rest_framework import status, permissions, generics
from rest_framework.response import Response

from users.models.user import UserAccount
from users.serializers.change_password import ChangePasswordSerializer


class ChangePasswordView(generics.UpdateAPIView):
    serializer_class = ChangePasswordSerializer
    permission_classes = [permissions.IsAuthenticated]
    model = UserAccount

    def get_object(self, queryset = None):
        return self.request.user

    def update(self, request, *args, **kwargs):
        self.objects = self.get_object()
        serializer = self.get_serializer(data = request.data)

        if serializer.is_valid():
            if not self.objects.check_password(
                    serializer.data.get('old_password')
            ):
                return Response(
                    {'old_password': 'Wrong password.'},
                    status = status.HTTP_400_BAD_REQUEST
                )
            self.objects.set_password(serializer.data.get('new_password'))
            self.objects.save()
            return Response(
                {'status': 'success',
                 'message': 'Password updated successfully.'},
                status = status.HTTP_200_OK
            )

        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
