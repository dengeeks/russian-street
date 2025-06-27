from events.models.base import BaseEvent


class Area(BaseEvent):
    TYPE_AREA = [
        ('OPEN', 'Открытая'),
        ('CLOSED', 'Закрытая'),
    ]

    class Meta:
        verbose_name = 'Мероприятие'
        verbose_name_plural = 'Мероприятия'
