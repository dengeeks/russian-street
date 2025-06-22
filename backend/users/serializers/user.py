from rest_framework import serializers

from common.constants.user import LEN_FIRST_NAME
from common.validators import validate_phone_number
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


class UserUpdateSerializer(serializers.Serializer):
    email = serializers.EmailField(required = False)
    first_name = serializers.CharField(max_length = 15, required = False)
    last_name = serializers.CharField(max_length = 25, required = False)
    middle_name = serializers.CharField(max_length = 25, required = False)
    phone_number = serializers.CharField(max_length = 25, required = False, validators = [validate_phone_number])
    region = serializers.CharField(max_length = 100, required = False)
    avatar = serializers.ImageField(required = False)

    def validate_email(self, value):
        # Проверка уникальности email (если обновляется)
        if UserAccount.objects.filter(email = value).exists():
            raise serializers.ValidationError("Пользователь с таким email уже существует.")
        return value

    def validate_avatar(self, value):
        max_size_mb = 5
        if value.size > max_size_mb * 1024 * 1024:
            raise serializers.ValidationError(f"Максимальный размер файла — {max_size_mb}MB.")

        allowed_types = ["image/jpeg", "image/png", "image/webp"]
        if value.content_type not in allowed_types:
            raise serializers.ValidationError("Допустимые форматы: JPEG, PNG, WEBP.")

        return value


class UserRetrieveSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = UserAccount
        fields = [
            'uuid', 'avatar', 'email', 'first_name', 'last_name',
            'middle_name', 'phone_number', 'region', 'status'
        ]

    def get_avatar(self, obj):
        if obj.avatar:
            return obj.avatar.url
        return None
