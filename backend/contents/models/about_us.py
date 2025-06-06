from ckeditor.fields import RichTextField
from django.core.validators import FileExtensionValidator
from django.db import models

from common.mixins import UUIDMixin, DateTimeMixin, SingleInstanceMixin
from common.utils import setup_image_path
from common.validators import validate_iframe


class JoinStreet(UUIDMixin, DateTimeMixin, SingleInstanceMixin):
    FORMAT_TYPE = [
        ('video_url', 'Видео'),
        ('image', 'Изображение'),
    ]

    format_type = models.CharField(
        max_length = 25,
        choices = FORMAT_TYPE,
        verbose_name = 'Тип',
        help_text = 'Выберите тип (Изображение или видео)'
    )
    video_url = models.CharField(
        verbose_name = 'Ссылка на видео (iframe)',
        help_text = 'Введите URL видео в формате iframe для отображения на сайте.',
        validators = [validate_iframe],
        blank = True,
        null = True,
        max_length = 1000
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
        ],
        blank = True,
        null = True
    )

    text = RichTextField(
        verbose_name = 'Текстовое описание'
    )


class Mission(UUIDMixin, DateTimeMixin, SingleInstanceMixin):
    image = models.ImageField(
        upload_to = setup_image_path,
        verbose_name = 'Изображение',
        max_length = 1000,
        help_text = 'Загрузите изображение',
        validators = [
            FileExtensionValidator(
                allowed_extensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg']
            )
        ],
        blank = True,
        null = True
    )


class Information(DateTimeMixin, SingleInstanceMixin):
    person = models.PositiveIntegerField(
        verbose_name = 'Количество человек'
    )
    discipline = models.PositiveIntegerField(
        verbose_name = 'Количество дисциплин'
    )
    organization = models.PositiveIntegerField(
        verbose_name = 'Количество организаций'
    )
    event = models.PositiveIntegerField(
        verbose_name = 'Количество мероприятий'
    )
