from rest_framework import serializers

from managers.models.social import SocialLinkManager


class SocialLinkSerializer(serializers.ModelSerializer):
    social_media_icon = serializers.SerializerMethodField()

    class Meta:
        model = SocialLinkManager
        fields = ['url', 'social_media_icon']

    def get_social_media_icon(self, obj):
        if obj.social_media.image:
            return obj.social_media.image.url
        return None
