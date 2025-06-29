from ckeditor.fields import RichTextField
from django.db import models

from common.models import DateTimeMixin, SingleInstanceMixin


class Cooperation(DateTimeMixin, SingleInstanceMixin):
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
    text = RichTextField(
        verbose_name = 'Текстовое описание'
    )
    partners_count = models.PositiveIntegerField(
        verbose_name = 'Количество партнеров'
    )
    projects_count = models.PositiveIntegerField(
        verbose_name = 'Количество реализованных проектов'
    )

    def __str__(self):
        return 'Детали'

    class Meta:
        verbose_name = 'сотрудничество'
        verbose_name_plural = 'сотрудничество'
