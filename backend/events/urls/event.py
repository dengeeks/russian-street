from django.urls import path

from events.views.event import EventAreaListAPI, EvenAreaDetailAPI, EventTypeListAPI

urlpatterns = [
    # получение мероприятий и площадок
    path('list/event-or-area/', EventAreaListAPI.as_view()),
    path('detail/event-or-area/<uuid:id>/', EvenAreaDetailAPI.as_view()),
    path('list/type/event-or-area/', EventTypeListAPI.as_view()),
]
