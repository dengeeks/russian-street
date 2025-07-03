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
    card_image = serializers.SerializerMethodField()

    class Meta:
        fields = (
            'id', 'title', 'card_image', 'city'
        )

    def get_card_image(self, obj):
        if obj.card_image:
            return obj.card_image.url
        return None


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


class EventDetailSerializer(BaseEventSerializer):
    class Meta(BaseEventSerializer.Meta):
        model = Event
        fields = BaseEventSerializer.Meta.fields + (
            'starting_date',
            'ending_date',
            'service_id',
            'description',
            'address',
            'yandex_address',
            'format_type',
            'video_url',
            'image'
        )


class AreaDetailSerializer(BaseEventSerializer):
    class Meta(BaseEventSerializer.Meta):
        model = Area
        fields = BaseEventSerializer.Meta.fields + (
            'description',
            'address',
            'yandex_address',
            'format_type',
            'video_url',
            'image'
        )
