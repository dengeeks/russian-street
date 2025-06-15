from rest_framework import serializers

from users.models.user import UserAccount


class OAuth2UserRetrieveSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ['uuid', 'first_name', 'last_name', 'middle_name']
