from django.urls import path

from contents.views.event import EventContentAPI

urlpatterns = [
    # получение статики с страницы сотрудничества
    path('static/event-area/', EventContentAPI.as_view())
]
