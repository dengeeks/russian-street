import logging

from rest_framework import views
from rest_framework.response import Response

from teams.serializers.team import ListTeamMemberSerializer
from teams.services.team import ListTeamMemberService

logger = logging.getLogger(__name__)


class ListTeamMemberAPI(views.APIView):
    serializer_class = ListTeamMemberSerializer

    def get(self, request):
        """
            Извлечение данных руководителей с помощью ManagerService.
        """
        try:
            data = ListTeamMemberService.get_content_data(
                serializer_class = self.serializer_class
            )
            return Response(data)
        except Exception as e:
            logger.error(f"Ошибка при загрузке данных руководителей: {str(e)}")
            return Response(
                {'error': 'Ошибка при загрузке данных руководителей'},
                status = 500
            )


