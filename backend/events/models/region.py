from django.db import models

from common.constants.events import (LEN_REGION_NAME, LEN_REGION_CODE, LEN_CITY_NAME, LEN_ADDRESS, TYPE_AREA,
                                     LEN_TYPE_AREA_NAME, LEN_TITLE)
from common.mixins import DateTimeMixin
from users.models.user import UserAccount


class Region(DateTimeMixin):
    """
    Модель, представляющая регион.

    Атрибуты:
        - name (CharField): Название региона.
        - owner (ForeignKey): Региональный руководитель.
        - code (CharField): Код региона.

    Мета:
        verbose_name (str): Название модели в единственном числе.
        verbose_name_plural (str): Название модели во множественном числе.

    Методы:
        __str__(): Возвращает строковое представление региона.
    """
    name = models.CharField(
        'Название региона',
        max_length = LEN_REGION_NAME,
        db_index = True,
        unique = True
    )
    owner = models.ForeignKey(
        UserAccount,
        related_name = 'regions',
        on_delete = models.CASCADE,
        verbose_name = 'Региональный руководитель',
    )
    code = models.CharField(
        'Код региона',
        max_length = LEN_REGION_CODE,
        unique = True
    )

    class Meta:
        verbose_name = 'Регион'
        verbose_name_plural = 'Регионы'

    def __str__(self):
        return f'{self.name}'


class City(DateTimeMixin):
    """
    Модель, представляющая город.

    Атрибуты:
        - name (CharField): Название города.
        - region (ForeignKey): Название региона.

    Мета:
        verbose_name (str): Название модели в единственном числе.
        verbose_name_plural (str): Название модели во множественном числе.

    Методы:
        __str__(): Возвращает строковое представление города.
    """
    name = models.CharField(
        'Название города',
        max_length = LEN_CITY_NAME,
        db_index = True,
        unique = True
    )
    region = models.ForeignKey(
        'Region',
        on_delete = models.CASCADE,
        related_name = 'region_city',
        verbose_name = 'Регион',
        help_text = 'Выберите регион'
    )

    class Meta:
        verbose_name = 'Город'
        verbose_name_plural = 'Города'

    def __str__(self):
        return f'{self.name}'


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
