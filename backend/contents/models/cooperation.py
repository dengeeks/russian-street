from ckeditor.fields import RichTextField
from django.core.validators import FileExtensionValidator
from django.db import models

from common.models import DateTimeMixin, SingleInstanceMixin, UUIDMixin


class Cooperation(UUIDMixin, DateTimeMixin, SingleInstanceMixin):
    """
    Модель для страницы сотрудничество.

    Наследует:
        - DateTimeMixin: автоматические поля создания и обновления.
        - SingleInstanceMixin: ограничение на 1 обьект.

    Поля:
        - text (RichTextField): Текст с редактором.
        - partners_count (PositiveIntegerField): Количество партнеров.
        - projects_count (PositiveIntegerField): Количество реализованных проектов.

    Meta:
        verbose_name: 'Изображение миссии и целей'
        verbose_name_plural: 'Изображения миссии и целей'
    """

    def setup_first_image_path(self, filename: str):
        filename = filename.replace(' ', '_')
        return f'uploads/{self.__class__.__name__.lower()}/first/{self.pk}/{filename}'

    def setup_second_image_path(self, filename: str):
        filename = filename.replace(' ', '_')
        return f'uploads/{self.__class__.__name__.lower()}/second/{self.pk}/{filename}'

    text = RichTextField(
        verbose_name = 'Текстовое описание'
    )
    partners_count = models.PositiveIntegerField(
        verbose_name = 'Количество партнеров'
    )
    projects_count = models.PositiveIntegerField(
        verbose_name = 'Количество реализованных проектов'
    )
    first_image = models.ImageField(
        upload_to = setup_first_image_path,
        verbose_name = 'Изображение',
        max_length = 1000,
        help_text = 'Изображение (7 партнеров в России блок)',
        validators = [
            FileExtensionValidator(
                allowed_extensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg']
            )
        ]
    )
    second_image = models.ImageField(
        upload_to = setup_second_image_path,
        verbose_name = 'Изображение',
        max_length = 1000,
        help_text = 'Изображение (более 50 реализованых проектов блок)',
        validators = [
            FileExtensionValidator(
                allowed_extensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg']
            )
        ]
    )

    def __str__(self):
        return 'Детали'

    class Meta:
        verbose_name = 'сотрудничество'
        verbose_name_plural = 'сотрудничество'
