from django.urls import path

from contents.views.cooperation import CooperationAPI

urlpatterns = [
    # получение статики с страницы сотрудничества
    path('static/cooperation/', CooperationAPI.as_view())
]
