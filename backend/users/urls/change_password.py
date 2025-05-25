from django.urls import path

from users.views.change_password import ChangePasswordView

urlpatterns = [
    path(
        'change-password/',
        ChangePasswordView.as_view(),
        name = 'change-password'
    )
]
