from django.urls import path

from users.views.manager import RegionManagerAPI, ManagerDetailAPI

urlpatterns = [
    # получение карточки регионального рук
    path('region-manager/card/', RegionManagerAPI.as_view()),
    # детали регионального рук
    path('detail/manager/<uuid:manager_uuid>/', ManagerDetailAPI.as_view()),
]
