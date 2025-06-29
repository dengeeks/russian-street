from django.urls import path

from events.views.discipline import StructuredFilterOptionsAPIView, SubDisciplineListView, SubDisciplineDetailView

urlpatterns = [
    # получение направлений
    path('list/subdiscipline/', StructuredFilterOptionsAPIView.as_view()),
    path('subdisciplines/', SubDisciplineListView.as_view(), name = 'subdisciplines-list'),
    path('subdisciplines/<uuid:pk>/', SubDisciplineDetailView.as_view(), name = 'subdisciplines-detail'),
]
