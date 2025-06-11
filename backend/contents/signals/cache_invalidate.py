import logging

from django.conf import settings
from django.core.cache import cache
from django.db import models
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

from contents.models import homepage, about_us, contact, cooperation, everyone_likes

logger = logging.getLogger(__name__)

# Словарь модулей
MODULES = {
    'homepage': homepage,
    'about_us': about_us,
    'contact': contact,
    'cooperation': cooperation,
    'everyone_likes': everyone_likes,
}

# Словарь ключей
CACHE_KEYS = {
    'homepage': settings.CACHE_HOMEPAGE_KEY,
    'about_us': settings.CACHE_ABOUTUS_KEY,
    'contact': settings.CACHE_CONTACT_KEY,
    'cooperation': settings.CACHE_COOPERATION_KEY,
    'everyone_likes': settings.CACHE_EVERYONELIKES_KEY,
}

# Модели для каждого модуля
MODULE_MODELS = {
    module_name: [
        model for name, model in module.__dict__.items()
        if isinstance(model, type) and issubclass(model, models.Model) and model != models.Model
    ]
    for module_name, module in MODULES.items()
}


@receiver(post_save, sender = None)
@receiver(post_delete, sender = None)
def invalidate_contents_cache(sender, instance, **kwargs):
    """
        Инвалидирует кэш API для модуля при изменении или удалении моделей из contents.
        """
    # Проверяем, что модель из приложения contents
    if sender._meta.app_label != 'contents':
        return

    for module_name, models in MODULE_MODELS.items():
        if sender in models:
            cache_key = CACHE_KEYS.get(module_name)
            if cache_key:
                try:
                    cache.delete(cache_key)
                    logger.debug(f"Кэш аннулирован для {module_name}: {cache_key}")
                except Exception as e:
                    logger.error(f"Не удалось аннулировать кэш для {module_name}: {e}")
            break
