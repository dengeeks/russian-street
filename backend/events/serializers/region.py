from rest_framework import serializers

from events.models.region import Region, City, Location


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = (
            'id',
            'name',
            'region',
            'city',
            'type_of_area',
            'address',
        )


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = (
            'id',
            'name',
            'region',
        )


class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = (
            'id',
            'name',
            'owner',
            'code',
        )
