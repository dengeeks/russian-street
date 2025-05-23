from rest_framework import permissions, generics, status
from rest_framework.response import Response

from users.models.user import UserAccount
from users.serializers.approval import UserApprovalSerializer


class UserApprovalView(generics.UpdateAPIView):
    queryset = UserAccount.objects.all()
    permission_classes = [permissions.IsAdminUser]
    serializer_class = UserApprovalSerializer

    def patch(self, request, *args, **kwargs):
        user = self.get_object()
        if not user.is_active:
            UserAccount.objects.approve_user(user)
            return Response(
                {'message': 'Данные пользователя верны. '
                            'Пользователь одобрен. Временный пароль отправлен '
                            'на электронную почту.'},
                status = status.HTTP_200_OK
            )
        return Response(
            {'message': 'Пользователь уже подтверждён.'},
            status = status.HTTP_400_BAD_REQUEST
        )
