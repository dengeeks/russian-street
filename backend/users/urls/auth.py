from django.urls import path

from users.views.auth import UserRegistrationAPI, LoginView, LogoutView

urlpatterns = [
    path('user/auth/registration/', UserRegistrationAPI.as_view(), name = 'signup'),
    path('user/auth/login/', LoginView.as_view(), name = 'login'),
    path('user/auth/logout/', LogoutView.as_view(), name = 'logout')
]
