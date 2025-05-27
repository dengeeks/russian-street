from django.urls import path

from users.views.auth import UserRegistrationAPI, LoginView, LogoutView, AuthorizationAPI, RefreshTokenAPI

urlpatterns = [
    path('user/auth/registration/', UserRegistrationAPI.as_view(), name = 'signup'),
    path('user/auth/login/', LoginView.as_view(), name = 'login'),
    path('user/auth/logout/', LogoutView.as_view(), name = 'logout'),

    path('user/auth/authorization/', AuthorizationAPI.as_view(), name = 'authorization'),
    path('user/auth/refresh-token/', RefreshTokenAPI.as_view(), name = 'refresh-token'),
]
