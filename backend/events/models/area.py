from events.models.base import BaseEvent


class Area(BaseEvent):
    """
    Модель площадки для мероприятий.

    Наследует:
        - BaseEvent: Все поля базового мероприятия.

    Поля:
        - type_area (CharField): Тип площадки (OPEN/CLOSED).
    """
    TYPE_AREA = [
        ('OPEN', 'Открытая'),
        ('CLOSED', 'Закрытая'),
    ]

    class Meta:
        verbose_name = 'Мероприятие'
        verbose_name_plural = 'Мероприятия'
