from django.db import models

from common.mixins import DateTimeMixin


class TeamType(DateTimeMixin):
    """
    Модель, представляющая тип команды.

    Атрибуты:
        name (CharField): тип команды.

    Мета:
        verbose_name = 'тип команды'
        verbose_name_plural = 'тип команды'

    Методы:
        __str__(): Возвращает строковое представление тип команды.
    """
    name = models.CharField(
        verbose_name = 'Тип команды',
        max_length = 125
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'тип команды'
        verbose_name_plural = 'тип команды'
