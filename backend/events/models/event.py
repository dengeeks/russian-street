from django.db import models

from events.models.base import BaseEvent


class Event(BaseEvent):
    """
    Модель мероприятия.

    Наследует:
        - BaseEvent: Все поля базового мероприятия.

    Поля:
        - is_our_project (BooleanField): Флаг "Наш проект".
        - is_priority (BooleanField): Флаг приоритетного отображения.
        - service_id (CharField): Идентификатор внешнего сервиса.
    """
    is_our_project = models.BooleanField(
        verbose_name = 'Наш проект',
        default = False,
        help_text = 'Организовано нашей платформой'
    )
    is_priority = models.BooleanField(
        verbose_name = 'Приоритетное мероприятие',
        default = False,
        help_text = 'Отображается в топе мероприятий'
    )
    service_id = models.CharField(
        verbose_name = 'ID, SLUG внешнего сервиса',
        max_length = 255,
        help_text = 'Идентификатор для интеграции с внешними системами',
    )
    starting_date = models.DateTimeField('Дата начала')
    ending_date = models.DateTimeField('Дата окончания')

    class Meta:
        verbose_name = 'Мероприятие'
        verbose_name_plural = 'Мероприятия'
