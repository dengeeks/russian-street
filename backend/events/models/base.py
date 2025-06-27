from ckeditor.fields import RichTextField
from django.core.validators import FileExtensionValidator
from django.db import models

from common.mixins import DateTimeMixin, UUIDMixin
from common.utils import setup_image_path
from common.validators import validate_iframe
from events.models.discipline import Discipline, SubDiscipline
from regions.models.region import Region, City
from users.models.user import UserAccount


class BaseEvent(UUIDMixin, DateTimeMixin):
    FORMAT_TYPE = [
        ('video_url', 'Видео'),
        ('image', 'Изображение'),
    ]

    title = models.CharField(
        max_length = 255,
        verbose_name = 'Название'
    )
    description = RichTextField(
        verbose_name = 'Описание'
    )
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
    address = models.CharField(
        max_length = 255,
        verbose_name = 'Адрес'
    )
    yandex_address = models.CharField(
        max_length = 1000,
        verbose_name = 'Адрес Яндекс.Карт',
        help_text = 'Введите iframe Яндекс.Карт, начинающийся с <iframe>.',
        validators = [validate_iframe]
    )
    region = models.ForeignKey(
        to = Region,
        verbose_name = 'Регион',
        on_delete = models.CASCADE,
    )
    city = models.ForeignKey(
        to = City,
        verbose_name = 'Город',
        on_delete = models.CASCADE
    )
    discipline = models.ForeignKey(
        Discipline,
        on_delete = models.CASCADE,
        related_name = '%(class)s_discipline',
        verbose_name = 'Дисциплина уличного спорта',
        help_text = 'Выберите дисциплину уличного спорта'
    )
    sub_discipline = models.ForeignKey(
        SubDiscipline,
        on_delete = models.CASCADE,
        related_name = '%(class)s_sub_discipline',
        verbose_name = 'Субдисциплина уличного спорта',
        help_text = 'Выберите субдисциплину'
    )
    is_moderation = models.BooleanField(
        default = False,
        verbose_name = 'Черновик'
    )

    class Meta:
        abstract = True
