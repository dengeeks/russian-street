from rest_framework import serializers

from regions.models.region import Region


class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = ['id', 'name', 'code', 'image', 'info']
