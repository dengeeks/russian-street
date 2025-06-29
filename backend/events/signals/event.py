from django.conf import settings
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

from common.utils import delete_cache
from events.models.discipline import SubDiscipline, Discipline


@receiver([post_save, post_delete], sender = Discipline)
@receiver([post_save, post_delete], sender = SubDiscipline)
def clear_list_subdiscipline_cache(sender, instance, **kwargs):
    """
    Автоматическая очистка кеша поддисциплин при изменениях
    """
    prefixes = [f"{settings.CACHE_LIST_SUBDISCIPLINE_KEY}_*"]

    # Если изменена SubDiscipline, добавляем специфичный префикс
    if isinstance(instance, SubDiscipline):
        prefixes.append(f"{settings.CACHE_LIST_SUBDISCIPLINE_KEY}_*_discipline_{instance.discipline_id}_*")

    delete_cache(prefixes)
