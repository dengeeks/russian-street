from rest_framework import serializers

from regions.models.region import City, Region
from users.serializers.manager import ExtendedRegionManagerSerializer


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ['id', 'name']


class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = ['id', 'name', 'code']


class RegionWithManagerSerializer(serializers.ModelSerializer):
    manager = ExtendedRegionManagerSerializer()

    class Meta:
        model = Region
        fields = ['id', 'name', 'code', 'image', 'info', 'manager']
