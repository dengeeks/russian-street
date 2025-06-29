from django.conf import settings
from django.core.cache import cache
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

from events.models.discipline import SubDiscipline, Discipline, GallerySubDiscipline


@receiver([post_save, post_delete], sender = Discipline)
@receiver([post_save, post_delete], sender = SubDiscipline)
@receiver([post_save, post_delete], sender = GallerySubDiscipline)
def clear_list_subdiscipline_cache(sender, instance, **kwargs):
    """
    Автоматическая очистка кеша поддисциплин при изменениях
    """
    cache.delete(settings.CACHE_SUBDISCIPLINE_KEY)
