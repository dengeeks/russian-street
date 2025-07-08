from rest_framework import generics
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

from users.serializers.auth import UserRegistrationSerializer, ResetPasswordSerializer, ConfirmResetPasswordSerializer
from users.services.auth import (UserRegistrationService, ResetPasswordService, ResetPasswordConfirmService)
from users.throttle import UserCreateRateThrottle, AnonTenPer15MinutesThrottle


class AuthorizationAPI(TokenObtainPairView):
    pass


class RefreshTokenAPI(TokenRefreshView):
    pass


class UserRegistrationAPI(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer
    throttle_classes = [UserCreateRateThrottle]

    def post(self, request, *args, **kwargs):
        data, status = UserRegistrationService.create_user(self.get_serializer, self.request.data)
        return Response(data = data, status = status)


class ResetPasswordAPI(generics.CreateAPIView):
    serializer_class = ResetPasswordSerializer
    throttle_classes = [AnonTenPer15MinutesThrottle]

    def post(self, request, *args, **kwargs):
        data, status = ResetPasswordService.reset_password(self.get_serializer, self.request.data)
        return Response(data = data, status = status)


class ConfirmResetPasswordAPI(generics.CreateAPIView):
    serializer_class = ConfirmResetPasswordSerializer

    def post(self, request, *args, **kwargs):
        data, status = ResetPasswordConfirmService.confirm_reset_password(self.get_serializer, self.request.data)
        return Response(data = data, status = status)
