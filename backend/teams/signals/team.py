from django.conf import settings
from django.core.cache import cache
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

from teams.models.team_member import TeamMember
from teams.models.team_type import TeamType


@receiver(post_save, sender = TeamMember)
@receiver(post_delete, sender = TeamMember)
@receiver(post_save, sender = TeamType)
@receiver(post_delete, sender = TeamType)
def invalidate_partners_cache(sender, instance, **kwargs):
    """Инвалидирует кеш команды при любых изменениях"""
    cache.delete(settings.CACHE_TEAM_KEY)
