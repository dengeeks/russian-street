from django.urls import path

from users.views.manager import RegionManagerAPI, ManagerDetailAPI

urlpatterns = [
    # получение деталей пользователя
    path('region-manager/card/', RegionManagerAPI.as_view()),
    path('detail/manager/<uuid:manager_uuid>/', ManagerDetailAPI.as_view()),
]
