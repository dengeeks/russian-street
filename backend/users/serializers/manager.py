from rest_framework import serializers

from users.models.social import SocialLinkManager, SocialMediaManager
from users.models.user import UserAccount


class SocialMediaSerializer(serializers.ModelSerializer):
    """Сериализатор для соцсетей менеджера"""

    class Meta:
        model = SocialMediaManager
        fields = ['image']


class SocialLinkSerializer(serializers.ModelSerializer):
    """Сериализатор ссылок на соцсети менеджера"""
    social_media = SocialMediaSerializer()

    class Meta:
        model = SocialLinkManager
        fields = ['url', 'social_media']


class RegionManagerSerializer(serializers.ModelSerializer):
    social_links = SocialLinkSerializer(many = True)

    class Meta:
        model = UserAccount
        fields = ['uuid', 'email', 'first_name', 'last_name', 'phone_number', 'avatar', 'address', 'social_links']
