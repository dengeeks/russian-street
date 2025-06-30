from django.urls import path

from users.views.manager import RegionManagerAPI

urlpatterns = [
    # получение деталей пользователя
    path('region-manager/card/', RegionManagerAPI.as_view()),

]
