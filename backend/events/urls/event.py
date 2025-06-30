from django.urls import path

from events.views.event import EventListAPI

urlpatterns = [
    # получение мероприятий и площадок
    path('list/event-or-area/', EventListAPI.as_view()),

]
