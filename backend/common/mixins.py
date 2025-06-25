import uuid

from django.core.cache import cache
from django.core.exceptions import ValidationError
from django.db import models
from django.utils import timezone


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
        assert isinstance(self.MAX_COUNT, int) and self.MAX_COUNT > 0, "MAX_COUNT должен быть целым числом (int) и больше 0"
        return self.MAX_COUNT

    def clean(self):
        max_count = self.get_max_count()

        # Проверяем количество объектов только если это новый объект (pk ещё нет)
        if self.__class__.objects.count() >= max_count and self._state.adding:
            raise ValidationError(f'Нельзя создать более {max_count} объектов {self.__class__.__name__}')

    class Meta:
        abstract = True


class CacheServiceMixin:
    """
    Класс-миксин для кэширования и сериализации данных JSON.
    Подклассы должны определять CACHE_KEY, CACHE_TIMEOUT как свойства класса и реализовывать _fetch_data.
    """

    # Уникальный ключ для кэширования данных.
    # Должен быть определён в подклассах.
    CACHE_KEY = None

    # Время жизни кэша в секундах.
    # Должен быть определён в подклассах.
    CACHE_TIMEOUT = None

    @classmethod
    def get_cache_key(cls, suffix = None):
        """
        Получает ключ кэша для класса, с возможностью добавления динамической части.

        Args:
            suffix : суффикс для уникального ключа (например, ID, фильтры или хэш).

        Returns:
            str: Уникальный ключ кэша, включающий базовый CACHE_KEY и динамическую часть.

        Raises:
            AssertionError: Если CACHE_KEY не переопределён в подклассе (равен None или не str).
        """
        assert cls.CACHE_KEY is not None, "CACHE_KEY должен быть переопределён в подклассе"
        assert isinstance(cls.CACHE_KEY, str), "CACHE_KEY должен быть строкой"

        if suffix is None:
            return cls.CACHE_KEY

        return f"{cls.CACHE_KEY}_{suffix}"

    @classmethod
    def get_cache_timeout(cls):
        """
        Получает время жизни кэша для класса.

        Этот метод проверяет, что атрибут CACHE_TIMEOUT переопределён в подклассе,
        и возвращает его значение.

        Returns:
            int: Время жизни кэша в секундах, определённое в подклассе.

        Raises:
            AssertionError: Если CACHE_TIMEOUT не переопределён в подклассе (равен None или не int).
        """
        assert cls.CACHE_TIMEOUT is not None, "CACHE_TIMEOUT должен быть переопределён в подклассе"
        assert isinstance(cls.CACHE_TIMEOUT, int), "CACHE_TIMEOUT должен быть целым числом (int)"

        return cls.CACHE_TIMEOUT

    @classmethod
    def get_content_data(cls, *args, suffix = None, **kwargs):
        """
        Извлечение и кеширование данных контента с помощью метода _fetch_data подкласса.

        Аргументы:
            *args, **kwargs: Аргументы для передачи в _fetch_data.

        Возвращает:
            dict или list: Сериализованные данные JSON.
        """
        # пробуем получить данные из кэша

        # Получаем ключ кэша с учётом суффикса
        cache_key = cls.get_cache_key(suffix)

        # Пробуем получить данные из кэша
        cached_data = cache.get(cache_key)
        if cached_data is not None:
            return cached_data

        # Получение и сериализация данных
        data = cls._fetch_data(*args, **kwargs)

        if not isinstance(data, (dict, list)):
            raise ValueError(
                f"_fetch_data в {cls.__name__} должен возвращать словарь или список, "
                f"вместо этого получен {type(data).__name__}"
            )

        # Кэширование сериализованных данных
        cache.set(cache_key, data, cls.get_cache_timeout())
        return data

    @classmethod
    def _fetch_data(cls, *args, **kwargs):
        """
        Абстрактный метод для извлечения и сериализации данных.
            Должен быть реализован подклассами.

        Аргументы:
            *args, **kwargs: Аргументы, специфичные для логики извлечения данных.

        Возвращает:
            dict или list: Сериализованные данные JSON.
        """
        raise NotImplementedError("Метод _fetch_data должен быть реализован в подклассе")

    @staticmethod
    def _serialize_object(obj, serializer_class):
        """
        Сериализовать один объект или вернуть None, если объект не существует.

        Аргументы:
            obj: Экземпляр модели для сериализации.
            serializer_class: Класс сериализатора для модели.

        Возвращает:
            Сериализированные данные или None.
        """
        return serializer_class(obj).data if obj else None

    @staticmethod
    def _serialize_collection(objects, serializer_class):
        """
        Сериализовать коллекцию объектов.

        Аргументы:
            объекты: Queryset или список экземпляров модели для сериализации.
            serializer_class: Класс сериализатора для модели.

        Возвращает:
            список: Сериализированные данные для коллекции.
        """
        return serializer_class(objects, many = True).data
