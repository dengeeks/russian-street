from django.db import models

from events.models.base import BaseEvent


class Event(BaseEvent):
    is_our_project = models.BooleanField(
        verbose_name = 'Наш проект'
    )
    is_priority = models.BooleanField(
        verbose_name = 'Приоритетное мероприятие'
    )
    service_id = models.CharField(
        max_length = 255,
        verbose_name = 'ID или Slug сервиса',
        help_text = 'Укажите здесь ID или Slug, чтобы связать мероприятие на нашем сайте'
    )

    class Meta:
        verbose_name = 'Мероприятие'
        verbose_name_plural = 'Мероприятия'
