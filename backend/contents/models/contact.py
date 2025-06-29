from django.core.validators import FileExtensionValidator
from django.db import models

from common.models import DateTimeMixin, SingleInstanceMixin, UUIDMixin, MaxCountLimitedMixin
from common.utils import setup_image_path


class ContactHeader(DateTimeMixin, SingleInstanceMixin):
    """
    Модель для контактов (header).

    Наследует:
        - UUIDMixin: UUID primary key наследование.
        - SingleInstanceMixin: ограничение на один экземпляр.

    Поля:
        - youtube (URLField): Ссылка на Youtube.
        - telegram (URLField): Ссылка на Telegram.
        - vkontakte (URLField): Ссылка на VK.


    Meta:
        verbose_name: 'Изображение миссии и целей'
        verbose_name_plural: 'Изображения миссии и целей'
    """
    youtube = models.URLField(verbose_name = 'Ссылка на Youtube')
    telegram = models.URLField(verbose_name = 'Ссылка на Telegram')
    vkontakte = models.URLField(verbose_name = 'Ссылка на VK')

    def __str__(self):
        return 'Детали'

    class Meta:
        verbose_name = 'контакты (header)'
        verbose_name_plural = 'контакты (header)'


class ContactFooter(UUIDMixin, DateTimeMixin, MaxCountLimitedMixin):
    """
    Модель для контактов (footer).

    Наследует:
        - UUIDMixin: UUID primary key наследование.
        - DateTimeMixin: автоматические поля создания и обновления.
        - MaxCountLimitedMixin: ограничение по количеству изображений (до 6).

    Поля:
        - url (URLField): Ссылка на соцсеть.
        - image (ImageField): Изображение.


    Meta:
        verbose_name: 'контакты (footer)'
        verbose_name_plural: 'контакты (footer)'
    """
    MAX_COUNT = 6

    url = models.URLField(verbose_name = 'Ссылка на соцсеть')
    image = models.ImageField(
        upload_to = setup_image_path,
        verbose_name = 'Изображение',
        max_length = 1000,
        help_text = 'Загрузите изображение соцсети',
        validators = [
            FileExtensionValidator(
                allowed_extensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg']
            )
        ]
    )

    def __str__(self):
        return 'Детали'

    class Meta:
        verbose_name = 'контакты (footer)'
        verbose_name_plural = 'контакты (footer)'


class EmailFooter(DateTimeMixin):
    """
    Модель для почты (footer)".

    Наследует:
        - DateTimeMixin: автоматические поля создания и обновления.

    Поля:
        - email (EmailField): Загружаемое изображение.

    Meta:
        verbose_name: 'почта (footer)'
        verbose_name_plural: 'почта (footer)'
    """
    email = models.EmailField(verbose_name = 'Почта поддержки в Footer')

    def __str__(self):
        return 'Детали'

    class Meta:
        verbose_name = 'почта (footer)'
        verbose_name_plural = 'почта (footer)'
