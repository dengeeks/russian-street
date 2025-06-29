from django.core.validators import FileExtensionValidator
from django.db import models

from common.models import UUIDMixin, DateTimeMixin
from common.utils import setup_image_path
from teams.models.team_type import TeamType


class TeamMember(UUIDMixin, DateTimeMixin):
    """
    Модель для команды.

    Наследует:
        - UUIDMixin: UUID primary key наследование.
        - DateTimeMixin: автоматические поля создания и обновления.

    Поля:
        - image (ImageField): изображение.
        - first_name (CharField): Имя.
        - last_name (CharField): Фамилия.
        - info (TextField): Описание.
        - type (ForeignKey): Тип руководителя.

    Meta:
        verbose_name = 'команда'
        verbose_name_plural = 'команда'

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
        ]
    )
    first_name = models.CharField(
        max_length = 25,
        verbose_name = 'Имя',
    )
    last_name = models.CharField(
        max_length = 25,
        verbose_name = 'Фамилия'
    )

    info = models.TextField(
        verbose_name = 'Описание'
    )
    type = models.ForeignKey(
        to = TeamType,
        verbose_name = 'Тип команды',
        on_delete = models.RESTRICT,
        related_name = 'team_members'
    )

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

    class Meta:
        verbose_name = 'команда'
        verbose_name_plural = 'команда'
