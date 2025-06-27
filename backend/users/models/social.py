from django.core.validators import FileExtensionValidator
from django.db import models

from common.mixins import UUIDMixin, DateTimeMixin
from common.utils import setup_image_path
from users.models.user import UserAccount


class SocialMediaManager(UUIDMixin, DateTimeMixin):
    """
    Модель для изображения соцсети.

    Наследует:
        - UUIDMixin: UUID primary key наследование.
        - DateTimeMixin: автоматические поля создания и обновления.

    Поля:
        - name (URLField): Название соцсети.
        - image (ImageField): Изображение.

    Meta:
        verbose_name = 'изображение соцсети'
        verbose_name_plural = 'изображения соцсети'
    """

    name = models.CharField(
        max_length = 25,
        unique = True,
        verbose_name = 'Название соцсети',
    )
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
        return self.name

    class Meta:
        verbose_name = 'изображение соцсети'
        verbose_name_plural = 'изображения соцсети'


class SocialLinkManager(DateTimeMixin):
    """
    Модель для хранений ссылок соцсетей руководителей.

    Наследует:
        - DateTimeMixin: автоматические поля создания и обновления.

    Поля:
        - url (URLField): Ссылка на соцсеть.
        - social_media (ForeignKey): Соцсеть руководителя.
        - manager (ForeignKey): Руководитель.

    Meta:
        verbose_name = 'соцсеть руководителя'
        verbose_name_plural = 'соцсети руководителя'

    """
    url = models.URLField(
        verbose_name = 'Ссылка на соцсеть'
    )
    social_media = models.ForeignKey(
        to = SocialMediaManager,
        on_delete = models.CASCADE,
        verbose_name = 'Соцсеть руководителя',
        related_name = 'social_links'
    )
    manager = models.ForeignKey(
        to = UserAccount,
        on_delete = models.CASCADE,
        verbose_name = 'Руководитель',
        related_name = 'social_links'
    )

    class Meta:
        verbose_name = 'соцсеть руководителя'
        verbose_name_plural = 'соцсети руководителя'
