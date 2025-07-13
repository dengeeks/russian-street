from django.db import models

from events.models.base import BaseEvent, AreaType


class Area(BaseEvent):
    """ Модель площадки для мероприятий."""
    type = models.ForeignKey(
        AreaType,
        on_delete = models.PROTECT,
        verbose_name = 'Тип площадки'
    )

    class Meta:
        verbose_name = 'площадки'
        verbose_name_plural = 'площадки'
