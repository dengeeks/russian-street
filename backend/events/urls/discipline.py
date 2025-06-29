from django.urls import path

from events.views.discipline import (StructuredFilterOptionsAPI, SubDisciplineDetailAPI, DisciplineListAPI,
                                     SubDisciplineListAPI)

urlpatterns = [
    # получение дисциплин и субдисциплин (С фильтрацией)
    path('filter/subdiscipline/', StructuredFilterOptionsAPI.as_view()),
    # получение списка субдисциплин
    path('list/subdiscipline/', SubDisciplineListAPI.as_view()),
    # получение списка деталей субдисциплины
    path('detail/subdiscipline/<uuid:pk>/', SubDisciplineDetailAPI.as_view()),
    # получение информации о дисциплинах (страница направлений)
    path('info/disciplines/', DisciplineListAPI.as_view()),
]
