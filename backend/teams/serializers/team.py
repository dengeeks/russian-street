from rest_framework import serializers

from teams.models.team_member import TeamMember


class ListTeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = [
            'id',
            'first_name',
            'last_name',
            'info',
            'image',
        ]
