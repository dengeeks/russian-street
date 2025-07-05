from ckeditor.fields import RichTextField
from django.core.validators import FileExtensionValidator
from django.db import models

from common.models import DateTimeMixin, UUIDMixin, MediaContentMixin
from common.utils import setup_image_path
from events.models.discipline import SubDiscipline
from regions.models.region import Region, City


class New(UUIDMixin, DateTimeMixin):
    """
    Модель для хранения информации о новостном материале.
    """

    title = models.CharField(max_length = 150, verbose_name = 'Заголовок')
    description = RichTextField(verbose_name = 'Описание')
    card_image = models.ImageField(
        upload_to = setup_image_path,
        verbose_name = 'Изображение',
        max_length = 1000,
        help_text = 'Загрузите изображение для карточки (страница новостей)',
        validators = [
            FileExtensionValidator(
                allowed_extensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg']
            )
        ],
    )
    subdiscipline = models.ForeignKey(
        to = SubDiscipline,
        on_delete = models.CASCADE,
        verbose_name = 'Направление',
        related_name = 'news'
    )

    region = models.ForeignKey(
        to = Region,
        on_delete = models.CASCADE,
        verbose_name = 'Регион',
        related_name = 'news'
    )
    city = models.ForeignKey(
        City,
        related_name = 'news',
        on_delete = models.CASCADE,
        verbose_name = 'Город',
    )
    count_views = models.PositiveIntegerField(
        verbose_name = 'Кол-во просмотров',
        default = 0
    )

    class Meta:
        verbose_name = 'новость'
        verbose_name_plural = 'новости'

    def __str__(self):
        return self.title


class GalleryNew(UUIDMixin, DateTimeMixin, MediaContentMixin):
    """
       Модель элемента галереи для новостей.

       Наследует:
           - UUIDMixin: UUID в качестве первичного ключа.
           - DateTimeMixin: Автоматические поля created_at и updated_at.
           - MediaContentMixin: Поля для медиа-контента.

       Поля:
           - subdiscipline (ForeignKey): Связь с поддисциплиной.
           - is_main (BooleanField): Флаг главного изображения.

    """
    new = models.ForeignKey(
        New,
        on_delete = models.CASCADE,
        related_name = 'gallery_items',
        verbose_name = 'Новость'
    )
    is_main = models.BooleanField(
        verbose_name = 'Главное фото',
        default = False,
        help_text = 'Использовать как основное изображение для заставки'
    )

    class Meta:
        verbose_name = 'Элемент галереи'
        verbose_name_plural = 'Элементы галереи'
