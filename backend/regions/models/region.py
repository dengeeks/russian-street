from django.core.validators import FileExtensionValidator
from django.db import models

from common.models import DateTimeMixin, UUIDMixin
from common.utils import setup_image_path


class Region(UUIDMixin, DateTimeMixin):
    """
    Модель, представляющая регион.

    Атрибуты:
        - name (CharField): Название региона.
        - code (CharField): Код региона.
        - image (ImageField): Изображение.
        - info (TextField): Описание региона.

    Мета:
        verbose_name = 'регион'
        verbose_name_plural = 'регионы'

    Методы:
        __str__(): Возвращает строковое представление региона.
    """
    name = models.CharField(
        'Название региона',
        max_length = 50,
        db_index = True,
        unique = True
    )
    code = models.CharField(
        'Код региона',
        max_length = 10,
        unique = True
    )
    image = models.ImageField(
        upload_to = setup_image_path,
        verbose_name = 'Изображение',
        max_length = 1000,
        help_text = 'Загрузите изображение',
        validators = [
            FileExtensionValidator(
                allowed_extensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg']
            )
        ]
    )
    manager = models.ForeignKey(
        to = 'users.UserAccount',
        verbose_name = 'Руководитель региона',
        related_name = 'regions',
        on_delete = models.CASCADE
    )
    info = models.TextField(
        verbose_name = 'Описание региона'
    )

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'регион'
        verbose_name_plural = 'регионы'


class City(DateTimeMixin):
    """
    Модель, представляющая город.

    Атрибуты:
        - name (CharField): Название города.
        - region (ForeignKey): Название региона.

    Мета:
        verbose_name (str): Название модели в единственном числе.
        verbose_name_plural (str): Название модели во множественном числе.

    Методы:
        __str__(): Возвращает строковое представление города.
    """
    name = models.CharField(
        'Название города',
        max_length = 25,
        db_index = True,
        unique = True
    )
    region = models.ForeignKey(
        to = Region,
        on_delete = models.CASCADE,
        related_name = 'cities',
        verbose_name = 'Регион',
        help_text = 'Выберите регион'
    )

    class Meta:
        verbose_name = 'город'
        verbose_name_plural = 'города'

    def __str__(self):
        return f'{self.name}'
