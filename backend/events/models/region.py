from django.db import models

from common.constants.events import (LEN_REGION_NAME, LEN_REGION_CODE, LEN_CITY_NAME, LEN_ADDRESS, TYPE_AREA,
                                     LEN_TYPE_AREA_NAME, LEN_TITLE)
from common.mixins import DateTimeMixin
from regions.models.region import Region, City
from users.models.user import UserAccount


class Location(DateTimeMixin):
    """
    Модель, представляющая локацию мероприятия.

    Атрибуты:
        region (ForeignKey): Регион проведения мероприятия.
        city (ForeignKey): Город проведения мероприятия.
        type_of_area (CharField): Тип площадки мероприятия.
        address (CharField): Адрес площадки мероприятия.

    Мета:
        verbose_name (str): Название модели в единственном числе.
        verbose_name_plural (str): Название модели во множественном числе.

    Методы:
        __str__(): Возвращает строковое представление локации.
        clean(): Валидирует город и регион на соответствие друг другу.
    """
    name = models.CharField(
        'Название площадки',
        max_length = LEN_TITLE,
        help_text = 'Введите название площадки',
    )
    region = models.ForeignKey(
        Region,
        related_name = 'location_region',
        on_delete = models.CASCADE,
        verbose_name = 'Регион проведения',
    )
    city = models.ForeignKey(
        City,
        related_name = 'location_city',
        on_delete = models.CASCADE,
        verbose_name = 'Город проведения',
        help_text = 'Выберите город'
    )
    type_of_area = models.CharField(
        'Тип площадки',
        max_length = LEN_TYPE_AREA_NAME,
        choices = TYPE_AREA,
        help_text = 'Выберите тип площадки'
    )
    address = models.CharField(
        'Адрес площадки',
        max_length = LEN_ADDRESS
    )

    class Meta:
        verbose_name = 'Локация мероприятия'
        verbose_name_plural = 'Локации мероприятия'

    def __str__(self):
        return f'{self.name}: {self.city.name}'
