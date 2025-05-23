from django.urls import path

from users.views.user import UserProfileView

urlpatterns = [
    path('user/profile/', UserProfileView.as_view(), name = 'user_profile'),
]
