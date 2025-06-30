from rest_framework import serializers

from users.models.user import UserAccount


class RegionManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ['uuid', 'email', 'first_name', 'last_name', 'phone_number', 'avatar', 'address']
