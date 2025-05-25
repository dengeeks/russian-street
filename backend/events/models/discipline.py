from django.db import models

from common.constants.events import LEN_DISCIPLINE_NAME, LEN_SUBDISCTIPLINE_NAME
from common.mixins import DateTimeMixin


class Discipline(DateTimeMixin):
    """
    Модель, представляющая дисциплину уличной культуры.

    Атрибуты:
        - name (CharField): Название дисциплины.

    Мета:
        verbose_name (str): Название модели в единственном числе.
        verbose_name_plural (str): Название модели во множественном числе.

    Методы:
        __str__(): Возвращает строковое представление дисциплины.
    """
    name = models.CharField(
        'Название дисциплины',
        max_length = LEN_DISCIPLINE_NAME,
    )

    class Meta:
        verbose_name = 'Дисциплина уличной культуры'
        verbose_name_plural = 'Дисциплины уличных культур'

    def __str__(self):
        return f'{self.name}'


class SubDiscipline(DateTimeMixin):
    """
    Модель, подкатегорию дисциплин.

    Атрибуты:
        - name (CharField): Название подкатегории.
        - discipline (ForeignKey): Дисциплины связанные с подкатегорией.

    Мета:
        verbose_name (str): Название модели в единственном числе.
        verbose_name_plural (str): Название модели во множественном числе.

    Методы:
        __str__(): Возвращает строковое представление субдицлиплины.
    """
    name = models.CharField(
        'Название подкатегории',
        max_length = LEN_SUBDISCTIPLINE_NAME
    )
    discipline = models.ForeignKey(
        Discipline,
        on_delete = models.CASCADE,
        related_name = 'sub_disciplines',
        verbose_name = 'Дисциплина'
    )

    class Meta:
        verbose_name = 'Подкатегория дисциплины'
        verbose_name_plural = 'Подкатегории дисциплин'

    def __str__(self):
        return f'{self.discipline.name} - {self.name}'
