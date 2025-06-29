from django.urls import path

from events.views.discipline import (StructuredFilterOptionsAPIView, SubDisciplineListView, SubDisciplineDetailView,
                                     DisciplineListView)

urlpatterns = [
    # получение направлений
    path('list/subdiscipline/', StructuredFilterOptionsAPIView.as_view()),
    path('subdisciplines/', SubDisciplineListView.as_view(), name = 'subdisciplines-list'),
    path('subdisciplines/<uuid:pk>/', SubDisciplineDetailView.as_view(), name = 'subdisciplines-detail'),

    path('disciplines/', DisciplineListView.as_view(), name = 'disciplines-list'),
]
