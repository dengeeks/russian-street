from common.serializers import BaseExcludeSerializer
from contents.models.event import EventContent


class EventContentSerializer(BaseExcludeSerializer):
    class Meta(BaseExcludeSerializer.Meta):
        model = EventContent
