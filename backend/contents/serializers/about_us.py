from common.serializers import BaseExcludeSerializer
from contents.models.about_us import JoinStreet, Mission, Information


class JoinStreetSerializer(BaseExcludeSerializer):
    class Meta(BaseExcludeSerializer.Meta):
        model = JoinStreet


class MissionSerializer(BaseExcludeSerializer):
    class Meta(BaseExcludeSerializer.Meta):
        model = Mission


class InformationSerializer(BaseExcludeSerializer):
    class Meta(BaseExcludeSerializer.Meta):
        model = Information
