from rest_framework import serializers


class FavoriteCreateSerializer(serializers.Serializer):
    type = serializers.ChoiceField(choices = ['event', 'area'])
    object_id = serializers.UUIDField()
