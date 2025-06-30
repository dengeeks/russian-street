from django.db import models

from events.models.base import BaseEvent, AreaType


class Area(BaseEvent):
    """
    Модель площадки для мероприятий.

    Наследует:
        - BaseEvent: Все поля базового мероприятия.

    Поля:
        - type (ForeignKey): Тип площадки.
    """
    type = models.ForeignKey(
        AreaType,
        on_delete = models.PROTECT,
        verbose_name = 'Тип площадки'
    )

    class Meta:
        verbose_name = 'Мероприятие'
        verbose_name_plural = 'Мероприятия'
