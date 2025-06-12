from django.urls import path

from users.views.user import UserRetrieveAPI, UserUpdateAPI

urlpatterns = [
    # получение деталей пользователя
    path('user/profile/', UserRetrieveAPI.as_view(), name = 'user_profile'),
    # обновления данных пользователя
    path('user/update/', UserUpdateAPI.as_view(), name = 'user_update'),
]
