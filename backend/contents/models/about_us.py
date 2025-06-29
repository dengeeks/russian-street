from ckeditor.fields import RichTextField
from django.core.validators import FileExtensionValidator
from django.db import models

from common.models import UUIDMixin, DateTimeMixin, SingleInstanceMixin, MediaContentMixin
from common.utils import setup_image_path


class JoinStreet(UUIDMixin, DateTimeMixin, MediaContentMixin, SingleInstanceMixin):
    """
    Модель для блока стань частью улицы.

    Наследует:
        - UUIDMixin: UUID primary key наследование.
        - DateTimeMixin: автоматические поля создания и обновления.
        - SingleInstanceMixin: ограничение до одного экземпляра.
        - MediaContentMixin: Поля для медиа-контента.

    Поля:
        - format_type (CharField): тип (Изображение или видео).
        - video_url (CharField): iframe video (необязательное поле).
        - image (ImageField): изображение (необязательное поле).
        - text (RichTextField): Текст с редактором.

    Meta:
        verbose_name: 'стань частью улицы'
        verbose_name_plural: 'стань частью улицы'
    """

    text = RichTextField(
        verbose_name = 'Текстовое описание'
    )

    def __str__(self):
        return 'Детали'

    class Meta:
        verbose_name = 'стань частью улицы'
        verbose_name_plural = 'стань частью улицы'


class Mission(UUIDMixin, DateTimeMixin, SingleInstanceMixin):
    """
    Модель для блока миссия.

    Наследует:
        - UUIDMixin: UUID primary key наследование.
        - DateTimeMixin: автоматические поля создания и обновления.
        - SingleInstanceMixin: ограничение до одного экземпляра.

    Поля:
        - image (ImageField): Изображение.

    Meta:
        verbose_name: 'миссия'
        verbose_name_plural: 'миссия'
    """
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
    )

    def __str__(self):
        return 'Детали'

    class Meta:
        verbose_name = 'миссия'
        verbose_name_plural = 'миссия'


class Information(DateTimeMixin, SingleInstanceMixin):
    """
    Модель для информации об организации.

    Наследует:
        - DateTimeMixin: автоматические поля создания и обновления.
        - SingleInstanceMixin: ограничение на один экземпляр.

    Поля:
        - person (PositiveIntegerField): количество человек.
        - discipline (PositiveIntegerField): количество дисциплин.
        - organization (PositiveIntegerField): количество организаций.
        - event (PositiveIntegerField): количество мероприятий.

    Meta:
        verbose_name: 'информация'
        verbose_name_plural: 'информация'
    """
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

    def __str__(self):
        return 'Детали'

    class Meta:
        verbose_name = 'информация'
        verbose_name_plural = 'информация'
