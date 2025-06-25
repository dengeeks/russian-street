from django.db import models

from common.mixins import DateTimeMixin


class ManagerType(DateTimeMixin):
    """
    Модель, представляющая Тип руководителя.

    Атрибуты:
        name (CharField): Тип руководителя.

    Мета:
        verbose_name = 'тип руководителя'
        verbose_name_plural = 'тип руководителя'

    Методы:
        __str__(): Возвращает строковое представление тип руководителя.
    """
    name = models.CharField(
        verbose_name = 'Тип руководителя',
        max_length = 125
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'тип руководителя'
        verbose_name_plural = 'тип руководителя'
