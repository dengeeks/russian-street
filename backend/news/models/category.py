from django.db import models

from common.constants.news import LEN_CATEGORY_NAME
from common.mixins import DateTimeMixin


class Category(DateTimeMixin):
    """
    Модель для хранения категорий.

    Attributes:
        name (str): Наименование категории.
    """
    name = models.CharField(
        max_length=LEN_CATEGORY_NAME,
        unique=True,
        verbose_name='Наименование'
    )

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'

    def __str__(self):
        return self.name