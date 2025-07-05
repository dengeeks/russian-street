from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models

from common.models import DateTimeMixin
from users.models.user import UserAccount


class FavoriteObject(DateTimeMixin):
    user = models.ForeignKey(
        to = UserAccount,
        on_delete = models.CASCADE,
        related_name = 'favorites',
        verbose_name = 'Пользователь'
    )

    content_type = models.ForeignKey(
        ContentType,
        on_delete = models.CASCADE
    )
    object_id = models.UUIDField()
    content_object = GenericForeignKey('content_type', 'object_id')

    class Meta:
        unique_together = ('user', 'content_type', 'object_id')
        verbose_name = 'Избранный объект'
        verbose_name_plural = 'Избранные объекты'

    def __str__(self):
        return f'{self.user.email} → {self.content_type} | {self.object_id}'
