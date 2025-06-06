from django.conf import settings

from contents.models.everyone_likes import EveryoneLikes
from contents.serializers.everyone_likes import EveryOneLikesSerializer
from contents.services.base import BaseContentService


class EveryOneLikesService(BaseContentService):
    CACHE_KEY = settings.CACHE_EVERYONELIKES_KEY
    CACHE_TIMEOUT = settings.CACHE_EVERYONELIKES_TIMEOUT

    CONTENT_CONFIG = [
        ('everyone_likes', EveryoneLikes, EveryOneLikesSerializer, True),
    ]
