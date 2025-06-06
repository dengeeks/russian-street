from django.core.validators import FileExtensionValidator
from django.db import models

from common.mixins import DateTimeMixin, UUIDMixin, SingleInstanceMixin, MaxCountLimitedMixin
from common.utils import setup_image_path
from common.validators import validate_iframe


class PromotionalVideo(DateTimeMixin, SingleInstanceMixin):
    """
    Модель для хранения ссылки на промо-видео, отображаемое на сайте.

    Наследует:
        - DateTimeMixin: автоматические поля создания и обновления.
        - SingleInstanceMixin: ограничение на создание только одного экземпляра.

    Поля:
        - video_url (URLField): Ссылка на видео в формате iframe.

    Meta:
        verbose_name: 'Промо-видео'
        verbose_name_plural: 'Промо-видео'
    """

    video_url = models.CharField(
        verbose_name = 'Ссылка на видео (iframe)',
        help_text = 'Введите URL видео в формате iframe для отображения на сайте.',
        max_length = 1000,
        validators = [validate_iframe]
    )

    class Meta:
        verbose_name = 'Промо-видео'
        verbose_name_plural = 'Промо-видео'


class StreetIsUsImage(UUIDMixin, DateTimeMixin, MaxCountLimitedMixin):
    """
    Модель для изображений раздела Street Is Us.

    Наследует:
        - UUIDMixin: UUID как первичный ключ.
        - DateTimeMixin: автоматические поля создания и обновления.
        - MaxCountLimitedMixin: ограничение по количеству (16 объектов).

    Поля:
        - image (ImageField): Загружаемое изображение.
        - order (PositiveIntegerField): Порядок отображения изображения.

    Атрибуты:
        - max_count = 16

    Meta:
        verbose_name: 'Изображение Street Is Us'
        verbose_name_plural: 'Изображения Street Is Us'
    """

    max_count = 16

    image = models.ImageField(
        upload_to = setup_image_path,
        verbose_name = 'Изображение',
        max_length = 1000,
        help_text = 'Загрузите изображение',
        validators = [
            FileExtensionValidator(
                allowed_extensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg']
            )
        ]
    )
    order = models.PositiveIntegerField(
        default = 0,
        verbose_name = 'Порядок',
        help_text = 'Определяет порядок отображения изображения.'
    )

    class Meta:
        verbose_name = 'Изображение Street Is Us'
        verbose_name_plural = 'Изображения Street Is Us'


class AboutUs(DateTimeMixin, SingleInstanceMixin):
    """
    Модель для отображения статистики о количестве публикаций в СМИ.

    Наследует:
        - DateTimeMixin: автоматические поля создания и обновления.
        - SingleInstanceMixin: ограничение на единственный экземпляр.

    Поля:
        - media_publications (PositiveIntegerField): Количество публикаций в СМИ.

    Meta:
        verbose_name: 'О нас'
        verbose_name_plural: 'О нас'
    """

    discipline = models.PositiveIntegerField(
        verbose_name = 'Количество направлений'
    )
    regions = models.PositiveIntegerField(
        verbose_name = 'Количество регионов',
    )
    media_publications = models.PositiveIntegerField(
        verbose_name = 'Количество Публикаций в СМИ',
    )
    event = models.PositiveIntegerField(
        verbose_name = 'Количество мероприятий'
    )
    person = models.PositiveIntegerField(
        verbose_name = 'Количество членов организаций'
    )

    class Meta:
        verbose_name = 'О нас'
        verbose_name_plural = 'О нас'

    def __str__(self):
        return f"О нас ({self.media_publications} публикаций)"


class MissionAndGoalsText(DateTimeMixin, SingleInstanceMixin):
    """
    Модель для хранения текста миссии и целей организации.

    Наследует:
        - DateTimeMixin: автоматические поля создания и обновления.
        - SingleInstanceMixin: ограничение на один экземпляр.

    Поля:
        - mission (TextField): Текст миссии.
        - goal (TextField): Текст цели.

    Meta:
        verbose_name: 'Миссия и цели (текст)'
        verbose_name_plural: 'Миссия и цели (текст)'
    """

    mission = models.TextField(
        verbose_name = 'Миссия',
        help_text = 'Опишите миссию организации.'
    )
    goal = models.TextField(
        verbose_name = 'Цель',
        help_text = 'Опишите цель организации.'
    )

    class Meta:
        verbose_name = 'Миссия и цели (текст)'
        verbose_name_plural = 'Миссия и цели (текст)'


class MissionAndGoalsImage(UUIDMixin, DateTimeMixin, MaxCountLimitedMixin):
    """
    Модель для изображений, сопровождающих блок "Миссия и цели".

    Наследует:
        - UUIDMixin: UUID primary key наследование.
        - DateTimeMixin: автоматические поля создания и обновления.
        - MaxCountLimitedMixin: ограничение по количеству изображений (до 4).

    Поля:
        - image (ImageField): Загружаемое изображение.
        - order (PositiveIntegerField): Порядок отображения.

    Атрибуты:
        - max_count = 4

    Meta:
        verbose_name: 'Изображение миссии и целей'
        verbose_name_plural: 'Изображения миссии и целей'
    """

    max_count = 4

    image = models.ImageField(
        upload_to = setup_image_path,
        verbose_name = 'Изображение',
        max_length = 1000,
        help_text = 'Загрузите изображение',
        validators = [
            FileExtensionValidator(
                allowed_extensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg']
            )
        ]
    )
    order = models.PositiveIntegerField(
        default = 0,
        verbose_name = 'Порядок',
        help_text = 'Определяет порядок отображения изображения.'
    )

    class Meta:
        verbose_name = 'Изображение миссии и целей'
        verbose_name_plural = 'Изображения миссии и целей'


class OrganizationInfo(DateTimeMixin, SingleInstanceMixin):
    """
    Модель для хранения контактной информации организации, включая карту.

    Наследует:
        - DateTimeMixin: автоматические поля создания и обновления.
        - SingleInstanceMixin: только один экземпляр.

    Поля:
        - iframe (URLField): iframe с картой Яндекс.Карт.
        - address (CharField): Адрес организации.
        - work_time (CharField): Режим работы.
        - email (EmailField): Контактная почта.

    Meta:
        verbose_name: 'Контактная информация'
        verbose_name_plural: 'Контактная информация'
    """

    iframe = models.CharField(
        max_length = 1000,
        verbose_name = 'Адрес Яндекс.Карт',
        help_text = 'Введите iframe Яндекс.Карт, начинающийся с <iframe>.',
        validators = [validate_iframe]
    )
    address = models.CharField(max_length = 250, verbose_name = 'Адрес')
    work_time = models.CharField(max_length = 125, verbose_name = 'Дни работы и время')
    email = models.EmailField(verbose_name = 'Почта')

    class Meta:
        verbose_name = 'Контактная информация'
        verbose_name_plural = 'Контактная информация'
