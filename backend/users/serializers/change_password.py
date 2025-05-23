from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required = True)
    new_password = serializers.CharField(
        required = True,
        validators = [validate_password]
    )
    new_password_confirm = serializers.CharField(required = True)

    def validate(self, attrs):
        new_password = attrs.get('new_password')
        new_password_confirm = attrs.get('new_password_confirm')

        if new_password != new_password_confirm:
            raise serializers.ValidationError(
                {'message': 'Пароли не совпадают.'}
            )

        return attrs
