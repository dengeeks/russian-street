from common.serializers import BaseExcludeSerializer
from contents.models.cooperation import Cooperation


class CooperationSerializer(BaseExcludeSerializer):
    class Meta(BaseExcludeSerializer.Meta):
        model = Cooperation
