from datetime import date

from rest_framework import serializers

from common.validators import validate_phone_number
from regions.models.region import Region, City


class FeedbackCreateSerializer(serializers.Serializer):
    name = serializers.CharField(max_length = 50)
    phone = serializers.CharField(max_length = 12, validators = [validate_phone_number])
    email = serializers.EmailField()
    text = serializers.CharField()


class FeedbackOrganizationCreateSerializer(serializers.Serializer):
    first_name = serializers.CharField(max_length = 15)
    last_name = serializers.CharField(max_length = 25)
    middle_name = serializers.CharField(max_length = 25)
    gender = serializers.CharField(max_length = 25)
    date_of_birth = serializers.DateField()
    phone = serializers.CharField(max_length = 12, validators = [validate_phone_number])
    email = serializers.EmailField()
    region_id = serializers.UUIDField()
    city_id = serializers.UUIDField()
    social = serializers.CharField(max_length = 125)
    passport_series = serializers.CharField(max_length = 4)
    passport_number = serializers.CharField(max_length = 6)
    passport_issue_date = serializers.DateField()
    passport_issuer = serializers.CharField(max_length = 255)

    def validate_region_id(self, value):
        if not Region.objects.filter(id = value).exists():
            raise serializers.ValidationError("Регион с указанным ID не найден.")
        return value

    def validate_city_id(self, value):
        if not City.objects.filter(id = value).exists():
            raise serializers.ValidationError("Город с указанным ID не найден.")
        return value

    def validate_passport_series(self, value):
        if not value.isdigit() or len(value) != 4:
            raise serializers.ValidationError("Серия паспорта должна состоять из 4 цифр.")
        return value

    def validate_passport_number(self, value):
        if not value.isdigit() or len(value) != 6:
            raise serializers.ValidationError("Номер паспорта должен состоять из 6 цифр.")
        return value

    def validate_passport_issue_date(self, value):
        if value > date.today():
            raise serializers.ValidationError("Дата выдачи паспорта не может быть в будущем.")
        if value < date(1997, 7, 1):
            raise serializers.ValidationError("Дата выдачи паспорта не может быть раньше 01.07.1997.")
        return value

    def validate(self, data):
        return data
