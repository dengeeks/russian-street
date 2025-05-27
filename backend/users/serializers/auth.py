from rest_framework import serializers

from common.constants.user import LEN_FIRST_NAME
from users.models.user import UserAccount


class UserRegistrationSerializer(serializers.Serializer):
    first_name = serializers.CharField(max_length = LEN_FIRST_NAME)
    email = serializers.EmailField()
    password = serializers.CharField(min_length = 8)

    def validate_email(self, email):
        if UserAccount.objects.filter(email = email).exists():
            raise serializers.ValidationError('Пользователь с такой электронной почтой уже зарегистрирован.')
        return email


class ResetPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()
    user = None

    def validate_email(self, email):
        user = UserAccount.objects.filter(email = email).first()
        if not user:
            raise serializers.ValidationError("Почта не существует")

        self.user = user
        return email


class ConfirmResetPasswordSerializer(serializers.Serializer):
    new_password = serializers.CharField(min_length = 8)
    token = serializers.CharField()
    uid = serializers.CharField()
