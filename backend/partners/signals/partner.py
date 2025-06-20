from django.conf import settings
from django.core.cache import cache
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

from partners.models.partner import Partner, PartnerType


@receiver(post_save, sender = Partner)
@receiver(post_delete, sender = Partner)
@receiver(post_save, sender = PartnerType)
@receiver(post_delete, sender = PartnerType)
def invalidate_partners_cache(sender, instance, **kwargs):
    """Инвалидирует кеш партнеров при любых изменениях"""
    cache.delete(settings.CACHE_PARTNERS_KEY)
