from rest_framework_simplejwt.tokens import RefreshToken

from users.models.user import UserAccount


class UserRegistrationService:
    __model_user = UserAccount

    @classmethod
    def validate_data(cls, serializer):
        if serializer.is_valid():
            return True, serializer
        return False, serializer.errors

    @classmethod
    def get_token(cls, user):
        # получение токена авторизации
        jwt_token = RefreshToken.for_user(user)
        return {
            'refresh': str(jwt_token),
            'access': str(jwt_token.access_token),
        }, 201

    @classmethod
    def create_user(cls, serializer, data):
        # валидация данных
        is_valid, result = cls.validate_data(serializer(data = data))

        if not is_valid:
            return result, 400

        # получение данных входных данных от пользователя
        first_name = result.validated_data['first_name']
        email = result.validated_data['email']
        password = result.validated_data['password']

        # создание пользователя
        user = cls.__model_user.objects.create(first_name = first_name, email = email, password = password)

        return cls.get_token(user)
