import uuid

from django.core.exceptions import ValidationError
from django.core.validators import FileExtensionValidator
from django.db import models
from django.utils import timezone

from common.utils import setup_image_path
from common.validators import validate_iframe


class MediaContentMixin(models.Model):
    """
    Абстрактная модель для контента с медиа (изображение/видео).

    Поля:
        - format_type: тип контента (изображение или видео)
        - video_url: URL видео в iframe формате
        - image: загружаемое изображение
    """
    FORMAT_TYPE = [
        ('video_url', 'Видео'),
        ('image', 'Изображение'),
    ]

    format_type = models.CharField(
        max_length = 25,
        choices = FORMAT_TYPE,
        verbose_name = 'Тип контента',
        help_text = 'Выберите тип медиа (Изображение или видео)'
    )
    video_url = models.CharField(
        verbose_name = 'Ссылка на видео',
        help_text = 'URL видео',
        blank = True,
        null = True,
        max_length = 1000
    )
    image = models.ImageField(
        upload_to = setup_image_path,
        verbose_name = 'Изображение',
        max_length = 1000,
        help_text = 'Загрузите изображение',
        validators = [
            FileExtensionValidator(
                allowed_extensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg']
            )
        ],
        blank = True,
        null = True
    )

    class Meta:
        abstract = True


class DateTimeMixin(models.Model):
    """
    Миксин для включения полей created_at и updated_at в моделях.

    Атрибуты:
        created_at (DateTimeField): Дата создания записи.
        updated_at (DateTimeField): Дата редактирования записи.

    Мета:
        abstract (bool): Абстрактная модель. (не создает записей в БД)

    """
    created_at = models.DateTimeField(
        'Дата создания записи',
        default = timezone.now,
        editable = False
    )
    updated_at = models.DateTimeField(
        'Дата редактирования записи',
        auto_now = True,
        editable = False
    )

    class Meta:
        abstract = True


class UUIDMixin(models.Model):
    """
    Миксин для включения поля UUID в моделях.

    Атрибуты:
        id (UUIDField): UUID записи.

    """
    id = models.UUIDField(
        primary_key = True,
        unique = True,
        default = uuid.uuid4,
        editable = False,
        verbose_name = 'ID'
    )

    class Meta:
        abstract = True


class SingleInstanceMixin(models.Model):
    """
    Миксин для ограничения создания только одного экземпляра модели.

    Использование:
        Наследуем модель от SingleInstanceMixin.
        При попытке создать второй экземпляр будет вызван ValidationError.

    Особенности:
        - Проверяет существование экземпляра в методе save.
    """

    def clean(self):
        """
        Проверяет, что можно создать только один экземпляр модели.
        """
        if self.__class__.objects.exists() and self._state.adding:
            raise ValidationError(
                f'Можно создать только один объект {self.__class__.__name__}'
            )

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    class Meta:
        abstract = True


class MaxCountLimitedMixin(models.Model):
    """
    Миксин для ограничения количества объектов модели.

    Требует определения свойства `max_count` в наследуемом классе.
    Если количество объектов превышает `max_count`, будет вызван assert.

    Атрибуты:
        max_count (int): Максимально допустимое количество объектов модели.

    """

    MAX_COUNT = None

    def get_max_count(self):
        """
        Получает максимально допустимое количество объектов модели.

        Этот метод проверяет, что атрибут MAX_COUNT переопределён в подклассе,
        и возвращает его значение.

        Returns:
            int: Максимально допустимое количество объектов модели, определённое в подклассе.

        Raises:
            AssertionError: Если MAX_COUNT не переопределён в подклассе (равен None).
        """
        assert self.MAX_COUNT is not None, "MAX_COUNT должен быть переопределён в подклассе"
        assert isinstance(
            self.MAX_COUNT, int
        ) and self.MAX_COUNT > 0, "MAX_COUNT должен быть целым числом (int) и больше 0"
        return self.MAX_COUNT

    def clean(self):
        max_count = self.get_max_count()

        # Проверяем количество объектов только если это новый объект (pk ещё нет)
        if self.__class__.objects.count() >= max_count and self._state.adding:
            raise ValidationError(f'Нельзя создать более {max_count} объектов {self.__class__.__name__}')

    class Meta:
        abstract = True

