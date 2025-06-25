from django.urls import path

from managers.views.manager import ListManagerAPI, ManagerCardAPIView, ManagerDetailAPIView

urlpatterns = [
    # получение руководителей
    path('list/manager/', ListManagerAPI.as_view()),
    # карточка руководителя
    path('manager/by-region/<uuid:region_id>/', ManagerCardAPIView.as_view()),
    # детали руководителя
    path('detail/manager/<uuid:manager_uuid>/', ManagerDetailAPIView.as_view())
]
