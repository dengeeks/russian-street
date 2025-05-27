from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager,
                                        PermissionsMixin)
from django.db import models, transaction
from django.utils import timezone

from common.constants.user import (LEN_FIRST_NAME, LEN_GENDER, LEN_LAST_NAME,
                                   LEN_MIDDLE_NAME, LEN_PASSPORT_ISSUED_BY,
                                   LEN_PASSPORT_NUMBER, LEN_PASSPORT_SERIES,
                                   LEN_PHONE_NUMBER, LEN_ROLE)
from common.mixins import DateTimeMixin
from common.validators import (validate_full_name, validate_passport_number,
                               validate_passport_series, validate_phone_number)


class UserAccountManager(BaseUserManager):
    """
    Кастомный менеджер для модели UserAccount,
    чтобы обрабатывать создание и подтверждение пользователей.

    Методы:
    create_superuser(email, password)
        Создает и возвращает суперпользователя с указанными email и паролем.

    create_user(email, password=None, **extra_fields)
        Создает и возвращает пользователя с указанными email и паролем.
        Дополнительные поля могут быть предоставлены через extra_fields.

    generate_temporary_password()
        Генерирует и возвращает случайный временный пароль для пользователя.

    send_temporary_password_email(email, temporary_password)
        Отправляет электронное письмо пользователю с предоставленным
        временным паролем.

    approve_user(user)
        Одобряет указанного пользователя, устанавливая временный пароль,
        обновляя статус пользователя на подтвержденный и отправляя
        электронное письмо с временным паролем.
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

    @transaction.atomic
    def approve_user(self, user):
        temporary_password = self.generate_temporary_password()
        user.set_password(temporary_password)
        user.is_active = True
        user.save()
        self.send_temporary_password_email(
            user.email,
            temporary_password,
            user.first_name
        )


class UserAccount(AbstractBaseUser, DateTimeMixin, PermissionsMixin):
    """
    Модель учетной записи пользователя.

    Атрибуты:
        role (CharField): Роль пользователя.
        first_name (CharField): Имя пользователя.
        last_name (CharField): Фамилия пользователя.
        middle_name (CharField): Отчество пользователя.
        gender (CharField): Пол пользователя.
        date_of_birth (Datetime): Дата рождения пользователя.
        phone_number (CharField): Номер телефона пользователя.
        email (EmailField): Электронная почта пользователя.
        city (CharField): Город пользователя.
        passport_series (CharField): Серия паспорта пользователя.
        passport_number (CharField): Номер паспорта пользователя.
        passport_issue_date (DateField): Дата выдачи паспорта.
        passport_issued_by (CharField): Орган, выдавший паспорт.
        consent_to_rights (CharField): Согласие пользователя на
        права, по умолчанию False.
        сonsent_to_processing (CharField): Согласие пользователя
        на обработку данных.
        USERNAME_FIELD (str): Поле, используемое для уникальной
        идентификации пользователя.
        REQUIRED_FIELDS (list): Дополнительные поля, обязательные
        при создании суперпользователя.
        objects (UserAccountManager): Менеджер модели UserAccount.
    """

    class Role(models.TextChoices):
        ADMIN = "ADMIN", "admin"
        USER = "USER", "user"
        REGIONAL_DIRECTOR = "REGIONAL_DIRECTOR", "regional_director"

    class Gender(models.TextChoices):
        MALE = "MALE", "male"
        FEMALE = "FEMALE", "female"

    role = models.CharField(
        max_length = LEN_ROLE,
        choices = Role.choices,
        default = Role.USER,
        verbose_name = 'Роль'
    )
    first_name = models.CharField(
        max_length = LEN_FIRST_NAME,
        validators = [validate_full_name],
        verbose_name = 'Имя'
    )
    last_name = models.CharField(
        max_length = LEN_LAST_NAME,
        validators = [validate_full_name],
        verbose_name = 'Фамилия',
        blank = True,
        null = True
    )
    middle_name = models.CharField(
        max_length = LEN_MIDDLE_NAME,
        validators = [validate_full_name],
        verbose_name = 'Отчество',
        null = True,
        blank = True
    )
    gender = models.CharField(
        max_length = LEN_GENDER,
        choices = Gender.choices,
        verbose_name = 'Пол',
        blank = True,
        null = True
    )
    date_of_birth = models.DateField(
        default = timezone.now,
        verbose_name = 'Дата рождения',
        blank = True,
        null = True
    )
    phone_number = models.CharField(
        max_length = LEN_PHONE_NUMBER,
        validators = [validate_phone_number],
        verbose_name = 'Телефон',
        blank = True,
        null = True
    )
    email = models.EmailField(unique = True, verbose_name = 'Электронная почта')
    city = models.CharField(
        max_length = 20,
        verbose_name = 'Город',
        blank = True,
        null = True
    )
    passport_series = models.CharField(
        max_length = LEN_PASSPORT_SERIES,
        validators = [validate_passport_series],
        verbose_name = 'Серия паспорта',
        blank = True,
        null = True
    )
    passport_number = models.CharField(
        max_length = LEN_PASSPORT_NUMBER,
        validators = [validate_passport_number],
        verbose_name = 'Номер паспорта',
        blank = True,
        null = True
    )
    passport_issue_date = models.DateField(
        verbose_name = 'Дата выдачи паспорта',
        default = timezone.now,
        blank = True,
        null = True
    )
    passport_issued_by = models.CharField(
        max_length = LEN_PASSPORT_ISSUED_BY,
        verbose_name = 'Кем выдан паспорт',
        blank = True,
        null = True
    )
    consent_to_rights = models.BooleanField(
        verbose_name = 'Согласие с правилами',
        default = False,
        blank = True,
        null = True
    )

    consent_to_processing = models.BooleanField(
        verbose_name = 'Согласие на обработку данных',
        default = False,
        blank = True,
        null = True
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

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

    def __str__(self):
        return f'{self.email}'

    def has_perm(self, perm, obj = None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return True

    def save(self, *args, **kwargs):
        if not self.role or self.role is None:
            self.role = UserAccount.Role.USER
        return super().save(*args, **kwargs)
