from common.serializers import BaseExcludeSerializer
from contents.models.everyone_likes import EveryoneLikes


class EveryOneLikesSerializer(BaseExcludeSerializer):
    class Meta(BaseExcludeSerializer.Meta):
        model = EveryoneLikes
