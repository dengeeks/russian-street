from django.core.validators import FileExtensionValidator
from django.db import models

from common.mixins import UUIDMixin, DateTimeMixin
from common.utils import setup_image_path
from common.validators import validate_phone_number
from managers.models.manager_type import ManagerType
from regions.models.region import Region


class Manager(UUIDMixin, DateTimeMixin):
    """
    Модель для руководителей.

    Наследует:
        - UUIDMixin: UUID primary key наследование.
        - DateTimeMixin: автоматические поля создания и обновления.

    Поля:
        - aboutus_image (ImageField): изображение для страницы "О нас".
        - image (ImageField): изображение для детальной страницы.
        - first_name (CharField): Имя.
        - last_name (CharField): Фамилия.
        - middle_name (CharField): Отчество.
        - info (TextField): Описание.
        - email (EmailField): Электронная почта.
        - phone (CharField): Номер телефона.
        - address (CharField): Адрес офиса.
        - type (ForeignKey): Тип руководителя.
        - region (OneToOneField): Регион.

    Meta:
        verbose_name = 'руководитель'
        verbose_name_plural = 'руководители'

    """

    def setup_aboutus_image_path(self, filename: str):
        filename = filename.replace(' ', '_')
        return f'uploads/{self.__class__.__name__.lower()}/aboutus/{self.pk}/{filename}'

    aboutus_image = models.ImageField(
        upload_to = setup_aboutus_image_path,
        verbose_name = 'Изображение',
        max_length = 1000,
        help_text = 'Загрузите изображение для страницы "О нас" ',
        validators = [
            FileExtensionValidator(
                allowed_extensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg']
            )
        ]
    )
    image = models.ImageField(
        upload_to = setup_image_path,
        verbose_name = 'Изображение',
        max_length = 1000,
        help_text = 'Загрузите изображение для детальной страницы',
        validators = [
            FileExtensionValidator(
                allowed_extensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg']
            )
        ]
    )
    first_name = models.CharField(
        max_length = 25,
        verbose_name = 'Имя',
    )
    last_name = models.CharField(
        max_length = 25,
        verbose_name = 'Фамилия'
    )
    middle_name = models.CharField(
        max_length = 25,
        verbose_name = 'Отчество'
    )

    info = models.TextField(
        verbose_name = 'Описание'
    )
    email = models.EmailField(
        verbose_name = 'Электронная почта'
    )
    phone = models.CharField(
        verbose_name = 'Номер телефона',
        max_length = 20,
        validators = [validate_phone_number]
    )
    address = models.CharField(
        max_length = 125,
        verbose_name = 'Адрес офиса'
    )
    type = models.ForeignKey(
        to = ManagerType,
        verbose_name = 'Тип руководителя',
        on_delete = models.RESTRICT,
        related_name = 'managers'
    )
    region = models.OneToOneField(
        to=Region,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name='Регион',
        related_name='managers'
    )

    def __str__(self):
        return f'{self.first_name} {self.last_name} {self.middle_name}'

    class Meta:
        verbose_name = 'руководитель'
        verbose_name_plural = 'руководители'
