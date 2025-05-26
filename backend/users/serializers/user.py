from rest_framework import serializers

from common.constants.user import LEN_FIRST_NAME
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
            'consent_to_processing'
        ]

    def create(self, validated_data):
        return UserAccount.objects.create_user(**validated_data)


class UserRegistrationSerializer(serializers.Serializer):
    first_name = serializers.CharField(max_length = LEN_FIRST_NAME)
    email = serializers.EmailField()
    password = serializers.CharField(min_length = 8)

    def validate_email(self, email):
        if UserAccount.objects.filter(email = email).exists():
            raise serializers.ValidationError('Пользователь с такой электронной почтой уже зарегистрирован.')
        return email


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
