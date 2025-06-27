from django.conf import settings

from common.mixins import CacheServiceMixin
from teams.models.team_member import TeamMember
from teams.models.team_type import TeamType


class ListTeamMemberService(CacheServiceMixin):
    __team_type_model = TeamType
    __team_member_model = TeamMember
    CACHE_KEY = settings.CACHE_TEAM_KEY
    CACHE_TIMEOUT = settings.CACHE_TEAM_TIMEOUT

    @classmethod
    def _fetch_data(cls, serializer_class):
        """Получает и сериализует команду, сгруппированных по типам"""
        team_types = cls.__team_type_model.objects.prefetch_related('team_members').all()

        result = []
        for team_type in team_types:
            team_members = team_type.team_members.all()
            if team_members.exists():
                result.append(
                    {
                        'team_type': team_type.name,
                        'team_members': cls._serialize_collection(team_members, serializer_class)
                    }
                )

        return result
