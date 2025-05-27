from rest_framework import status, generics, views, permissions
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView
from users.permissions import IsAdminOrCreateOnly
from users.serializers.auth import UserRegistrationSerializer
from users.services.auth import UserRegistrationService


class AuthorizationAPI(TokenObtainPairView):
    pass


class RefreshTokenAPI(TokenRefreshView):
    pass


class UserRegistrationAPI(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = (IsAdminOrCreateOnly,)

    def post(self, request, *args, **kwargs):
        # переопределение поведения метода post
        data, status = UserRegistrationService.create_user(self.get_serializer, self.request.data)
        return Response(data = data, status = status)


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
