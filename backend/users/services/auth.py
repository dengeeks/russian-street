from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from rest_framework_simplejwt.tokens import RefreshToken

from users.models.user import UserAccount
from users.tasks.auth import reset_password_task


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


class ResetPasswordService:

    @staticmethod
    def validate_data(serializer):
        if serializer.is_valid():
            return True, serializer
        return False, serializer.errors

    @classmethod
    def reset_password(cls, serializer, data):
        # генерация ссылки для сброса пароля
        is_valid, result = cls.validate_data(serializer(data = data))

        if not is_valid:
            return result, 400

        user = result.user
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.id))
        email = user.email
        name = user.first_name

        reset_password_task.delay(email, uid, token, name)

        return {'message': 'Ссылка для сброса пароля успешно отправлена'}, 200


class ResetPasswordConfirmService:
    __model_user = UserAccount

    @classmethod
    def validate_data(cls, serializer):
        if serializer.is_valid():
            return True, serializer.validated_data
        return False, serializer.errors

    @classmethod
    def confirm_reset_password(cls, serializer, data):
        is_valid, data = cls.validate_data(serializer(data = data))

        if not is_valid:
            return data, 400

        message = 'Ссылка для сброса пароля недействительна. Попробуйте запросить новую.'
        new_password = data.get('new_password')
        token = data.get('token')
        uid = data.get('uid')

        try:
            uid = force_str(urlsafe_base64_decode(uid))
            user_id = int(uid)
        except:
            return {'message': message}, 400

        try:
            user = cls.__model_user.objects.get(id = user_id)
        except cls.__model_user.DoesNotExist:
            return {'message': message}, 400

        if not default_token_generator.check_token(user, token):
            return {'message': message}, 400

        user.set_password(new_password)
        user.save()

        return {'message': 'Пароль успешно изменен'}, 200
