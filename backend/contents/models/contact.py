from django.core.validators import FileExtensionValidator
from django.db import models

from common.mixins import DateTimeMixin, SingleInstanceMixin, UUIDMixin, MaxCountLimitedMixin
from common.utils import setup_image_path


class ContactHeader(DateTimeMixin, SingleInstanceMixin):

    youtube = models.URLField(verbose_name = 'Ссылка на Youtube')
    telegram = models.URLField(verbose_name = 'Ссылка на Telegram')
    vkontakte = models.URLField(verbose_name = 'Ссылка на VK')

    def __str__(self):
        return 'Детали'

    class Meta:
        verbose_name = 'контакты (header)'
        verbose_name_plural = 'контакты (header)'


class ContactFooter(UUIDMixin, DateTimeMixin, MaxCountLimitedMixin):
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
    email = models.EmailField(verbose_name = 'Почта поддержки в Footer')

    def __str__(self):
        return 'Детали'

    class Meta:
        verbose_name = 'почта (footer)'
        verbose_name_plural = 'почта (footer)'
