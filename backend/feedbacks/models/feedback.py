from django.db import models

from common.constants.feedback import (LEN_STATUS)
from common.models import DateTimeMixin
from common.validators import validate_phone_number
from regions.models.region import Region, City
from users.models.user import UserAccount


class Feedback(DateTimeMixin):
    """
    Модель, представляющая обратную связь.

    Атрибуты:
        - user (ForeignKey): Пользователь отправивший запрос.
        - name (CharField): Имя отправителя.
        - content (TextField): Содержимое письма
        - phone_number (BooleanField): Номер телефона
        - consent_to_rights (BoolField): Согласие о правилах
        - consent_to_processing (BoolField): Согласие на обработку данных
        - status (CharField): Статус заявки.

    Мета:
        verbose_name (str): Название модели в единственном числе.
        verbose_name_plural (str): Название модели во множественном числе.

    Методы:
        __str__(): Возвращает строковое представление обратной связи.
    """
    STATUS_FEEDBACK = [
        ('PENDING', 'В ожидании'),
        ('CLOSED', 'Закрыто'),
    ]
    name = models.CharField(
        verbose_name = 'Имя отправителя',
        max_length = 50,
    )
    phone = models.CharField(
        verbose_name = 'Телефон',
        validators = [validate_phone_number],
        max_length = 12

    )
    email = models.EmailField(
        verbose_name = 'Электронный адрес'
    )
    text = models.TextField(
        verbose_name = 'Сообщение'
    )
    status = models.CharField(
        'Статус заявки',
        max_length = LEN_STATUS,
        choices = STATUS_FEEDBACK,
        default = 'PENDING'
    )

    class Meta:
        verbose_name = 'Обратная связь'
        verbose_name_plural = 'Обратная связь'

    def __str__(self):
        return f'Письмо от {self.email}'


class FeedbackOrganization(DateTimeMixin):
    """
    Модель, представляющая обратную связь.

    Атрибуты:
        - user (ForeignKey): Пользователь отправивший запрос.
        - name (CharField): Имя отправителя.
        - content (TextField): Содержимое письма
        - phone_number (BooleanField): Номер телефона
        - consent_to_rights (BoolField): Согласие о правилах
        - consent_to_processing (BoolField): Согласие на обработку данных
        - status (CharField): Статус заявки.

    Мета:
        verbose_name (str): Название модели в единственном числе.
        verbose_name_plural (str): Название модели во множественном числе.

    Методы:
        __str__(): Возвращает строковое представление обратной связи.
    """
    STATUS_FEEDBACK = [
        ('PENDING', 'В ожидании'),
        ('CLOSED', 'Закрыто'),
    ]
    first_name = models.CharField(
        max_length = 15,
        verbose_name = 'Имя'
    )
    last_name = models.CharField(
        max_length = 25,
        verbose_name = 'Фамилия',
    )
    middle_name = models.CharField(
        max_length = 25,
        verbose_name = 'Отчество',
    )
    gender = models.CharField(
        max_length = 25,
        verbose_name = 'Пол'
    )
    date_of_birth = models.DateField(
        verbose_name = 'Дата рождения'
    )
    phone = models.CharField(
        verbose_name = 'Телефон',
        validators = [validate_phone_number],
        max_length = 12

    )
    email = models.EmailField(
        verbose_name = 'Электронный адрес'
    )
    region = models.ForeignKey(
        to = Region,
        verbose_name = 'Регион',
        on_delete = models.CASCADE,
        related_name = 'feedbacks_organizations'
    )
    city = models.ForeignKey(
        to = City,
        verbose_name = 'Город',
        on_delete = models.CASCADE,
        related_name = 'feedbacks_organizations'
    )
    social = models.CharField(
        verbose_name = 'Соцсеть для связи',
        max_length = 125
    )
    passport_series = models.CharField(
        max_length = 4,
        verbose_name = 'Серия паспорта'
    )
    passport_number = models.CharField(
        max_length = 6,
        verbose_name = 'Номер паспорта'
    )
    passport_issue_date = models.DateField(
        verbose_name = 'Дата выдачи'
    )
    passport_issuer = models.CharField(
        max_length = 255,
        verbose_name = 'Кем выдан'
    )
    status = models.CharField(
        'Статус заявки',
        max_length = LEN_STATUS,
        choices = STATUS_FEEDBACK,
        default = 'PENDING'
    )
    user = models.ForeignKey(
        to = UserAccount,
        verbose_name = 'Пользователь',
        on_delete = models.CASCADE,
        related_name = 'feedback_organizations'
    )

    class Meta:
        verbose_name = 'Обратная связь'
        verbose_name_plural = 'Обратная связь'

    def __str__(self):
        return f'Письмо от {self.email}'
