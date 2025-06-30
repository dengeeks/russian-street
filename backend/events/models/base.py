from ckeditor.fields import RichTextField
from django.core.validators import FileExtensionValidator
from django.db import models

from common.models import DateTimeMixin, UUIDMixin, MediaContentMixin
from common.validators import validate_iframe
from events.models.discipline import Discipline, SubDiscipline
from regions.models.region import Region, City


class EventType(UUIDMixin, DateTimeMixin):
    """Базовая модель типа событий (площадки/мероприятия).

    Наследует:
        - UUIDMixin: UUID в качестве первичного ключа.
        - DateTimeMixin: Автоматические поля created_at и updated_at.

    Поля:
        - name (CharField): Название типа .
    """
    name = models.CharField(
        max_length = 100,
        verbose_name = 'Название',
        unique = True,
    )

    class Meta:
        abstract = True

    def __str__(self):
        return self.name


class AreaType(EventType):
    """Модель типа спортивной площадки.

    Наследует:
        - EventType: Базовая модель типа событий.
    """

    class Meta:
        verbose_name = 'Тип площадки'
        verbose_name_plural = 'Типы площадок'


class EventActivityType(EventType):
    """Модель типа спортивного мероприятия.

    Наследует:
        - EventType: Базовая модель типа событий.
    """

    class Meta:
        verbose_name = 'Тип мероприятия'
        verbose_name_plural = 'Типы мероприятий'


class BaseEvent(UUIDMixin, DateTimeMixin, MediaContentMixin):
    """
    Абстрактная модель базового мероприятия.

    Наследует:
        - UUIDMixin: UUID в качестве первичного ключа.
        - DateTimeMixin: Автоматические поля created_at и updated_at.
        - MediaContentMixin: Поля для медиа-контента.

    Поля:
        - title (CharField): Название мероприятия.
        - description (RichTextField): Полное описание с HTML-форматированием.
        - address (CharField): Физический адрес проведения.
        - yandex_address (CharField): Код iframe для Яндекс.Карт.
        - region (ForeignKey): Регион проведения.
        - city (ForeignKey): Город проведения.
        - discipline (ForeignKey): Основная дисциплина.
        - sub_discipline (ForeignKey): Поддисциплина.
    """

    def setup_image_path(self, filename: str):
        filename = filename.replace(' ', '_')
        return f'uploads/{self.__class__.__name__.lower()}/card/{self.pk}/{filename}'

    title = models.CharField(
        max_length = 255,
        verbose_name = 'Название'
    )

    card_image = models.ImageField(
        upload_to = setup_image_path,
        verbose_name = 'Изображение',
        max_length = 1000,
        help_text = 'Загрузите изображение для карточки(страница мероприятий)',
        validators = [
            FileExtensionValidator(
                allowed_extensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg']
            )
        ],
    )
    description = RichTextField(
        verbose_name = 'Описание'
    )
    address = models.CharField(
        max_length = 255,
        verbose_name = 'Адрес'
    )
    yandex_address = models.CharField(
        max_length = 1000,
        verbose_name = 'Адрес Яндекс.Карт',
        help_text = 'Введите iframe Яндекс.Карт, начинающийся с <iframe>.',
        validators = [validate_iframe]
    )
    region = models.ForeignKey(
        to = Region,
        verbose_name = 'Регион',
        on_delete = models.CASCADE,
    )
    city = models.ForeignKey(
        to = City,
        verbose_name = 'Город',
        on_delete = models.CASCADE
    )
    discipline = models.ForeignKey(
        Discipline,
        on_delete = models.CASCADE,
        related_name = '%(class)s_discipline',
        verbose_name = 'Дисциплина уличного спорта',
        help_text = 'Выберите дисциплину уличного спорта'
    )
    sub_discipline = models.ForeignKey(
        SubDiscipline,
        on_delete = models.CASCADE,
        related_name = '%(class)s_sub_discipline',
        verbose_name = 'Субдисциплина уличного спорта',
        help_text = 'Выберите субдисциплину'
    )

    class Meta:
        abstract = True
