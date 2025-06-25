from rest_framework import serializers

from managers.models.manager import Manager
from managers.serializers.social import SocialLinkSerializer
from regions.serializers.region import RegionSerializer


class ListManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manager
        fields = [
            'id',
            'first_name',
            'last_name',
            'aboutus_image',
        ]


class ManagerCardSerializer(serializers.ModelSerializer):
    social_links = SocialLinkSerializer(many = True, read_only = True)

    class Meta:
        model = Manager
        fields = [
            'id',
            'first_name',
            'last_name',
            'middle_name',
            'email',
            'phone',
            'address',
            'social_links',
            'image'
        ]


class ManagerDetailSerializer(serializers.ModelSerializer):
    region = RegionSerializer(read_only = True)
    social_links = SocialLinkSerializer(many = True, read_only = True)

    class Meta:
        model = Manager
        fields = [
            'id',
            'first_name',
            'last_name',
            'middle_name',
            'email',
            'phone',
            'address',
            'info',
            'image',
            'region',
            'social_links',
        ]
