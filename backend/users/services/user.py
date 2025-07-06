from regions.models.region import Region
from users.models.user import UserAccount


class UserUpdateService:
    __model_user = UserAccount

    @classmethod
    def validate_data(cls, serializer):
        if serializer.is_valid():
            return True, serializer.validated_data
        return False, serializer.errors

    @classmethod
    def update_user(cls, serializer, data, user):
        is_valid, result = cls.validate_data(serializer(data = data))

        if not is_valid:
            return result, 400

        # Обновляем только переданные поля
        for attr, value in result.items():
            if attr == 'region':
                # Fetch the Region instance for the given UUID
                try:
                    region_instance = Region.objects.get(id = value)
                    setattr(user, attr, region_instance)
                except Region.DoesNotExist:
                    return {'error': 'Регион с указанным ID не найден.'}, 400
            else:
                setattr(user, attr, value)

        user.save()
        return {'message': 'Данные успешно обновлены'}, 200
