from rest_framework import serializers

from users.models.user import UserAccount


class UserApprovalSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ('id',)
