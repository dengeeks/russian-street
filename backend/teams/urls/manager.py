from django.urls import path

from teams.views.team import ListTeamMemberAPI

urlpatterns = [
    # получение руководителей
    path('list/team_member/', ListTeamMemberAPI.as_view()),
]
