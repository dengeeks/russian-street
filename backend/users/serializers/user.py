from rest_framework import serializers

from users.models.user import UserAccount


class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = [
            'email',
            'first_name',
            'last_name',
            'middle_name',
            'date_of_birth',
            'phone_number',
            'city',
            'passport_series',
            'passport_number',
            'passport_issue_date',
            'passport_issued_by',
            'consent_to_rights',
            'сonsent_to_processing'
        ]

    def create(self, validated_data):
        return UserAccount.objects.create_user(**validated_data)


class UserSmallSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = (
            'id',
            'first_name',
            'last_name',
            'middle_name',
            'phone_number'
        )
