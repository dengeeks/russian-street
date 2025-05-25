from rest_framework import status, generics, views, permissions
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response

from users.models.user import UserAccount
from users.permissions import IsAdminOrCreateOnly
from users.serializers.user import UserAccountSerializer


class SignupView(generics.CreateAPIView):
    queryset = UserAccount.objects.all()
    serializer_class = UserAccountSerializer
    permission_classes = (IsAdminOrCreateOnly,)

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {'message': 'Когда ваши данные будут проверены.'
                            'Вы получите электронное письмо с вашим паролем.'},
                status = status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)


class LoginView(ObtainAuthToken):
    permission_classes = (IsAdminOrCreateOnly,)

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data = request.data,
            context = {'request': request}
        )
        if serializer.is_valid(raise_exception = True):
            user = serializer.validated_data['user']
            token, create = Token.objects.get_or_create(user = user)
            return Response(
                {
                    'token': token.key,
                    'user_id': user.pk,
                    'email': user.email
                }
            )
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)


class LogoutView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        request.user.auth_token.delete()
        return Response(status = status.HTTP_200_OK)
