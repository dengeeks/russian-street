import uuid

from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager,
                                        PermissionsMixin)
from django.core.exceptions import ValidationError
from django.core.validators import FileExtensionValidator
from django.db import models

from common.mixins import DateTimeMixin
from common.validators import (validate_phone_number)
from regions.models.region import Region


class UserAccountManager(BaseUserManager):
    """
    Кастомный менеджер для модели UserAccount,
    чтобы обрабатывать создание и подтверждение пользователей.

    Методы:
        create_superuser(email, password)
            Создает и возвращает суперпользователя с указанными email и паролем.

        create(email, password=None, **extra_fields)
            Создает и возвращает пользователя с указанными email и паролем.
            Дополнительные поля могут быть предоставлены через extra_fields.

        _create_user(email, password=None, **extra_fields)
            Создает и возвращает пользователя с указанными email и паролем.
            Дополнительные поля могут быть предоставлены через extra_fields.

    """

    def _create_user(self, email, password, **extra_fields):
        if not password:
            raise ValueError("The given password must be set")
        if not email:
            raise ValueError("The given email must be set")

        email = self.normalize_email(email)
        user = self.model(email = email, **extra_fields)
        user.set_password(password)
        user.save(using = self._db)

        return user

    def create(self, email = None, password = None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email = None, password = None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user(email, password, **extra_fields)


class UserAccount(AbstractBaseUser, DateTimeMixin, PermissionsMixin):
    """
    Модель учетной записи пользователя.

    Поля:
        role (CharField): Роль пользователя.
        first_name (CharField): Имя пользователя.
        last_name (CharField): Фамилия пользователя.
        middle_name (CharField): Отчество пользователя.
        phone_number (CharField): Номер телефона пользователя.
        region (CharField): Регион пользователя
        email (EmailField): Электронная почта пользователя.
        status (BooleanField): Является ли членом организации?.

        USERNAME_FIELD (str): Поле, используемое для уникальной
        идентификации пользователя.
        REQUIRED_FIELDS (list): Дополнительные поля, обязательные
        при создании суперпользователя.
        objects (UserAccountManager): Менеджер модели UserAccount.
    """

    def setup_avatar_path(self, filename: str):
        filename = filename.replace(' ', '_')
        return f'uploads/{self.__class__.__name__.lower()}/{self.uuid}/{filename}'

    class Role(models.TextChoices):
        USER = 'user', "Пользователь"
        REGIONAL_DIRECTOR = 'regional_director', 'Региональный руководитель'
        FEDERAL_DIRECTOR = 'federal_director', 'Федеральный руководитель'

    uuid = models.UUIDField(
        unique = True,
        default = uuid.uuid4,
        editable = False,
        verbose_name = 'uuid'
    )
    role = models.CharField(
        max_length = 55,
        choices = Role.choices,
        default = Role.USER,
        verbose_name = 'Роль'
    )

    avatar = models.ImageField(
        upload_to = setup_avatar_path,
        verbose_name = 'Аватарка',
        max_length = 1000,
        validators = [
            FileExtensionValidator(
                allowed_extensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg']
            )
        ],
        blank = True,
        null = True
    )
    email = models.EmailField(
        unique = True,
        verbose_name = 'Электронная почта'
    )
    first_name = models.CharField(
        max_length = 15,
        verbose_name = 'Имя'
    )
    last_name = models.CharField(
        max_length = 25,
        verbose_name = 'Фамилия',
        blank = True,
        null = True
    )
    middle_name = models.CharField(
        max_length = 25,
        verbose_name = 'Отчество',
        null = True,
        blank = True
    )
    phone_number = models.CharField(
        max_length = 20,
        validators = [validate_phone_number],
        verbose_name = 'Телефон',
        blank = True,
        null = True
    )
    region = models.ForeignKey(
        to = Region,
        verbose_name = 'Регион',
        on_delete = models.SET_NULL,
        blank = True,
        null = True
    )
    info = models.TextField(
        verbose_name = 'Описание',
        blank = True,
        null = True
    )
    address = models.CharField(
        max_length = 125,
        verbose_name = 'Адрес офиса',
        blank = True,
        null = True
    )

    status = models.BooleanField(
        verbose_name = 'Является ли членом организации?',
        default = False
    )

    is_staff = models.BooleanField(
        verbose_name = 'Статус персонала',
        default = False,
        help_text = 'Определяет имеет ли пользователь доступ к админ панели.',
    )
    is_active = models.BooleanField(
        verbose_name = 'Активный',
        default = True,
        help_text = 'Определяет имеет ли пользователь доступ к сайту.'
    )
    is_superuser = models.BooleanField(
        verbose_name = 'Администратор',
        default = False,
        help_text = 'Дает полный доступам к админ панели.'
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserAccountManager()

    def __str__(self):
        return f'{self.email}'

    def clean(self):
        super().clean()

        required_fields = {
            'first_name': 'Имя',
            'last_name': 'Фамилия',
            'middle_name': 'Отчество',
            'info': 'Описание',
            'avatar': 'Аватар',
            'address': 'Адрес',
            'phone_number': 'Телефон',
            'email': 'Email'
        }

        if self.role in [self.Role.REGIONAL_DIRECTOR, self.Role.FEDERAL_DIRECTOR]:
            errors = {}

            for field_name, field_label in required_fields.items():
                field_value = getattr(self, field_name)

                # Проверяем, пустое ли поле (None или пустая строка)
                if field_value in (None, ''):
                    errors[field_name] = f'{field_label} обязательно для региональных/федеральных руководителей'
            if errors:
                raise ValidationError(errors)

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
