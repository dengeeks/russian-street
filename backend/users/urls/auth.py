from django.urls import path

from users.views.auth import SignupView, LoginView, LogoutView

urlpatterns = [
    path('auth/signup/', SignupView.as_view(), name = 'signup'),
    path('auth/login/', LoginView.as_view(), name = 'login'),
    path('auth/logout/', LogoutView.as_view(), name = 'logout')
]