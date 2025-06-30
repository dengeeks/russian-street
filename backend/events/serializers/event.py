from rest_framework import serializers

from events.models.area import Area
from events.models.base import EventActivityType, AreaType
from events.models.event import Event


class TypeSerializer(serializers.ModelSerializer):
    """Базовый сериализатор для типов (мероприятий/площадок)"""

    class Meta:
        fields = ('id', 'name')


class EventActivityTypeSerializer(TypeSerializer):
    class Meta(TypeSerializer.Meta):
        model = EventActivityType


class AreaTypeSerializer(TypeSerializer):
    class Meta(TypeSerializer.Meta):
        model = AreaType


class BaseEventSerializer(serializers.ModelSerializer):
    """Базовый сериализатор для мероприятий и площадок"""
    city = serializers.StringRelatedField()

    class Meta:
        fields = (
            'id', 'title', 'card_image', 'city',
        )


class EventSerializer(BaseEventSerializer):

    class Meta(BaseEventSerializer.Meta):
        model = Event
        fields = BaseEventSerializer.Meta.fields + (
            'starting_date',
        )


class AreaSerializer(BaseEventSerializer):

    class Meta(BaseEventSerializer.Meta):
        model = Area
        fields = BaseEventSerializer.Meta.fields
