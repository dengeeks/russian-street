from common.mixins import CacheServiceMixin


class BaseContentService(CacheServiceMixin):
    """
        Базовый класс-миксин для извлечения, сериализации и кэширования данных JSON.

        Подклассы должны переопределить:
        - `CACHE_KEY` (str): Базовый префикс ключа кэша.
        - `CACHE_TIMEOUT` (int): Время жизни кэша в секундах.
        - `CONTENT_CONFIG` (list): Список кортежей (key, model, serializer_class, is_collection).


        Пример:
            class AboutUsContentService(BaseContentService):
                CACHE_KEY = "ABOUT_US"
                CACHE_TIMEOUT = 3600
                CONTENT_CONFIG = [
                    ('video', PromotionalVideo, PromotionalVideoSerializer, False),
                ]
        """
    CONTENT_CONFIG = None

    @classmethod
    def get_content_config(cls):
        """
        Получает конфигурацию контента для класса.

        Returns:
            list: Список кортежей (ключ, модель, сериализатор, is_collection).

        Raises:
            AssertionError: Если CONTENT_CONFIG не переопределён или имеет неверную структуру.
        """
        assert cls.CONTENT_CONFIG is not None, "CONTENT_CONFIG должен быть переопределён в подклассе"
        assert isinstance(cls.CONTENT_CONFIG, list), "CONTENT_CONFIG должен быть списком"
        for config in cls.CONTENT_CONFIG:
            assert (
                    isinstance(config, tuple) and len(config) == 4
            ), "Каждый элемент CONTENT_CONFIG должен быть кортежем из 4 элементов"
            key, model, serializer_class, is_collection = config
            assert isinstance(key, str), f"Ключ {key} должен быть строкой"
            assert isinstance(is_collection, bool), f"is_collection для {key} должен быть boolean"
        return cls.CONTENT_CONFIG

    @classmethod
    def _fetch_data(cls, content_config = None):
        """
        Извлекать и сериализовать данные страницы о нас на основе конфигурации контента.

        Аргументы:
            content_config (list, необязательно): Список кортежей (ключ, модель, сериализатор, is_collection).
            По умолчанию cls.CONTENT_CONFIG.

        Возвращает:
            dict: Сериализованные данные JSON.
        """
        content_config = content_config or cls.CONTENT_CONFIG
        data = {}
        for key, model, serializer_class, is_collection in content_config:
            if is_collection:
                objects = model.objects.all()
                data[key] = cls._serialize_collection(objects, serializer_class)
            else:
                obj = model.objects.first()
                data[key] = cls._serialize_object(obj, serializer_class)
        return data
