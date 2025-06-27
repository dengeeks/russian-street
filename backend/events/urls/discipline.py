from django.urls import path

from events.views.discipline import ListSubDisciplineAPI, SubDisciplineDetailAPI

urlpatterns = [
    # получение направлений
    path('list/subdiscipline/', ListSubDisciplineAPI.as_view()),
    path('detail/subdiscipline/<uuid:pk>/', SubDisciplineDetailAPI.as_view()),
]
