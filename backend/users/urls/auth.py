from django.urls import path

from users.views.auth import (UserRegistrationAPI, AuthorizationAPI, RefreshTokenAPI,
                              ResetPasswordAPI, ConfirmResetPasswordAPI)

urlpatterns = [
    # регистрация
    path('user/auth/registration/', UserRegistrationAPI.as_view(), name = 'signup'),

    # авторизация - обновление токена
    path('user/auth/authorization/', AuthorizationAPI.as_view(), name = 'authorization'),
    path('user/auth/refresh-token/', RefreshTokenAPI.as_view(), name = 'refresh-token'),

    # сброс пароля
    path('user/auth/reset-password/', ResetPasswordAPI.as_view()),
    # сброс пароля - подтверждение
    path('user/auth/reset-password/confirm/', ConfirmResetPasswordAPI.as_view()),
]
