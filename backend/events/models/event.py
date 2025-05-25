from django.core.exceptions import ValidationError
from django.core.validators import FileExtensionValidator
from django.db import models
from django.utils import timezone

from common.constants.events import ALLOWED_EXTENSIONS, LEN_TYPE_EVENT_NAME, LEN_DESCRIPTION, LEN_TITLE
from common.mixins import DateTimeMixin
from events.models.discipline import SubDiscipline, Discipline
from events.models.region import Location
from users.models.user import UserAccount


class GalleryEvent(DateTimeMixin):
    """
    Модель, представляющая галерею для меропрития.

    Атрибуты:
        - file (FileField): Файл для меропрития.
        - event (ForeignKey): Связь с мероприятием

    Мета:
        verbose_name (str): Название модели в единственном числе.
    """
    file = models.FileField(
        'Файл',
        upload_to = 'files_events/',
        help_text = 'Загрузите файл.',
        validators = [
            FileExtensionValidator(ALLOWED_EXTENSIONS),
        ]
    )
    event = models.ForeignKey(
        'Event',
        related_name = 'gallery_events',
        on_delete = models.CASCADE,
        verbose_name = 'Мероприятие',
        help_text = 'Медиа-файлы, связанные с этим мероприятием'
    )

    class Meta:
        verbose_name = 'Галерея меропрития'
        verbose_name_plural = 'Галерея меропритий'


class TypeEvent(DateTimeMixin):
    """
    Модель, представляющая тип мероприятия.

    Атрибуты:
        - name (CharField): Название типа мероприятия.

    Мета:
        verbose_name (str): Название модели в единственном числе.
        verbose_name_plural (str): Название модели во множественном числе.

    Методы:
        __str__(): Возвращает строковое представление типа мероприятия.
    """
    name = models.CharField(
        'Название типа меропрития',
        max_length = LEN_TYPE_EVENT_NAME,
    )

    class Meta:
        verbose_name = 'Тип мероприятия'
        verbose_name_plural = 'Типы мероприятий'

    def __str__(self):
        return f'{self.name}'


class Event(DateTimeMixin):
    """
    Модель, представляющая мероприятие.

    Атрибуты:
        title (CharField): Название мероприятия.
        description (TextField): Описание мероприятия.
        start_datetime (DateTimeField): Дата и время начала мероприятия.
        end_datetime (DateTimeField): Дата и время окончания мероприятия.
        discipline (ForeignKey): Дисциплина мероприятия.
        sub_discipline (ForeignKey): Тип субдисциплины мероприятия.
        type_of_event (ForeignKey): Тип мероприятия.
        location (ForeignKey): Локация мероприятия.
        is_moderation (BooleanField): Флаг модерации мероприятия.
        organizers_contact (JSONField): Дополнительные поля в формате JSON.
        author (ForeignKey): Автор мероприятия.
        count_entrant (IntegerField): Количество участников мероприятия.

    Мета:
        verbose_name (str): Название модели в единственном числе.
        verbose_name_plural (str): Название модели во множественном числе.

    Методы:
        __str__(): Возвращает строковое представление мероприятия.
         clean(): Валидирует даты начала и конца мероприятия.
    """
    title = models.CharField(
        'Название мероприятия',
        max_length = LEN_TITLE,
        help_text = 'Введите название мероприятия'
    )
    description = models.TextField(
        'Описание',
        max_length = LEN_DESCRIPTION,
        help_text = 'Введите описание мероприятия'
    )
    start_datetime = models.DateTimeField(
        'Дата и время начала',
        help_text = 'Введите дату и время начала мероприятия'
    )
    end_datetime = models.DateTimeField(
        'Дата и время окончания',
        help_text = 'Введите дату и время окончания мероприятия'
    )
    discipline = models.ForeignKey(
        Discipline,
        on_delete = models.CASCADE,
        related_name = 'events_discipline',
        verbose_name = 'Дисциплина уличного спорта',
        help_text = 'Выберите дисциплину уличного спорта'
    )
    sub_discipline = models.ForeignKey(
        SubDiscipline,
        on_delete = models.CASCADE,
        related_name = 'events_sub_discipline',
        verbose_name = 'Субдисциплина уличного спорта',
        help_text = 'Выберите субдисциплину'
    )
    type_of_event = models.ForeignKey(
        TypeEvent,
        on_delete = models.CASCADE,
        related_name = 'events_type_of_event',
        verbose_name = 'Тип мероприятия',
        help_text = 'Выберите тип мероприятия'
    )
    location = models.ForeignKey(
        Location,
        on_delete = models.CASCADE,
        related_name = 'events_location',
        verbose_name = 'Локация мероприятия',
    )
    is_moderation = models.BooleanField(
        default = False
    )
    organizers_contact = models.JSONField(
        'Связь с организатором',
        blank = True,
        null = True,
        help_text = 'Введите ссылку на связь с организаторами'
    )
    author = models.ForeignKey(
        UserAccount,
        related_name = 'event_author',
        on_delete = models.CASCADE,
        verbose_name = 'Автор мероприятия',
    )
    count_entrant = models.IntegerField(
        default = 0
    )

    class Meta:
        verbose_name = 'Мероприятие'
        verbose_name_plural = 'Мероприятия'

    def __str__(self):
        return f'{self.location.region.name}: {self.title}'

    def clean(self):
        if self.start_datetime and self.end_datetime:
            if self.start_datetime >= self.end_datetime:
                raise ValidationError(
                    'Дата и время начала мероприятия должны быть '
                    'раньше даты и времени окончания.'
                )
            if self.start_datetime < timezone.now():
                raise ValidationError(
                    'Дата и время начала мероприятия не могут быть в прошлом.'
                )


class EventRegistration(DateTimeMixin):
    """
    Модель, представляющая мероприятие.

    Атрибуты:
        user (ForeignKey): Пользователь, зарегистрированный на меропритие.
        event (ForeignKey): Мероприятие.

    Мета:
        verbose_name (str): Название модели в единственном числе.
        verbose_name_plural (str): Название модели во множественном числе.
        constraints (UniqueConstraint): уникальная пара значений.

    Методы:
        __str__(): Возвращает строковое представление мероприятия.
    """
    user = models.ForeignKey(
        UserAccount,
        verbose_name = 'Пользователь',
        on_delete = models.CASCADE
    )
    event = models.ForeignKey(
        Event,
        verbose_name = 'Мероприятие',
        on_delete = models.CASCADE
    )

    class Meta:
        verbose_name = 'Регистрация на мероприятие'
        verbose_name_plural = 'Регистрации на мероприятии'
        constraints = [
            models.UniqueConstraint(
                fields = ['user', 'event'],
                name = 'unique_registration_for_event'
            )
        ]

    def __str__(self):
        return f'{self.user} зарегистрирован на меропритие {self.event}'
