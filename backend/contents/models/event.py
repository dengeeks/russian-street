from django.db import models

from common.models import DateTimeMixin, UUIDMixin, MediaContentMixin


class EventContent(UUIDMixin, DateTimeMixin, MediaContentMixin):
    """ Модель для хранения контактной информации организации, включая карту. """

    TYPE_CHOICES = [
        ('event', 'Мероприятия'),
        ('area', 'Площадки'),
    ]

    title = models.CharField(
        max_length = 125,
        verbose_name = 'Заголовок'
    )
    type = models.CharField(
        max_length = 10,
        choices = TYPE_CHOICES,
        unique = True,
        verbose_name = 'Тип',
        help_text = 'Тип записи (event или area). Должен быть только один объект каждого типа.'
    )

    def __str__(self):
        return 'Детали'

    class Meta:
        verbose_name = 'Промо блок страница мероприятия'
        verbose_name_plural = 'Промо блок страница мероприятия'
