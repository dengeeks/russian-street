from django.core.validators import FileExtensionValidator
from django.db import models

from common.models import UUIDMixin, DateTimeMixin
from common.utils import setup_image_path


class PartnerType(DateTimeMixin):
    """ Модель, представляющая Тип партнера."""
    name = models.CharField(
        verbose_name = 'Тип партнера',
        max_length = 125
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'тип партнера'
        verbose_name_plural = 'тип партнера'


class Partner(UUIDMixin, DateTimeMixin):
    """Модель, представляющая партёра."""

    name = models.CharField(
        'Название партнёра',
        max_length = 150,
        unique = True,
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
    description = models.TextField(
        verbose_name = 'Описание партёра'
    )
    type = models.ForeignKey(
        to = PartnerType,
        verbose_name = 'Тип партнера',
        on_delete = models.RESTRICT,
        related_name = 'partners'
    )
    url = models.URLField(
        verbose_name = 'Ссылка на партнера',
        max_length = 1000,
        blank = True,
        null = True
    )

    class Meta:
        verbose_name = 'партнёр'
        verbose_name_plural = 'партнёры'

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        print(f"🔄 Partner.save() вызван для ID={self.id}")  # Debug
        super().save(*args, **kwargs)