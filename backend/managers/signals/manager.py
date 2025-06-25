from django.conf import settings
from django.core.cache import cache
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

from managers.models.manager import Manager
from managers.models.manager_type import ManagerType
from managers.models.social import SocialLinkManager, SocialMediaManager


@receiver(post_save, sender = Manager)
@receiver(post_delete, sender = Manager)
@receiver(post_save, sender = ManagerType)
@receiver(post_delete, sender = ManagerType)
@receiver(post_save, sender = SocialLinkManager)
@receiver(post_delete, sender = SocialLinkManager)
@receiver(post_save, sender = SocialMediaManager)
@receiver(post_delete, sender = SocialMediaManager)
def invalidate_partners_cache(sender, instance, **kwargs):
    """Инвалидирует кеш партнеров при любых изменениях"""
    cache.delete(settings.CACHE_MANAGERS_KEY)
