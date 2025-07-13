from django.urls import path

from events.views.event import (EventAreaListAPI, EvenAreaDetailAPI, EventTypeListAPI, ShortEventAreaListAPI)

urlpatterns = [
    # получение мероприятий и площадок
    path('list/event-or-area/', EventAreaListAPI.as_view()),
    # получение деталей мероприятия - площадок
    path('detail/event-or-area/<uuid:id>/', EvenAreaDetailAPI.as_view()),
    # список типов для мероприятия - площадок
    path('list/type/event-or-area/', EventTypeListAPI.as_view()),
    # Краткая API мероприятия - площадок
    path('list/short/event-or-area/', ShortEventAreaListAPI.as_view())
]
