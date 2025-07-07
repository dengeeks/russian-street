from django.conf import settings

from contents.models.event import EventContent
from contents.serializers.event import EventContentSerializer
from contents.services.base import BaseContentService


class EventContentService(BaseContentService):
    CACHE_KEY = settings.CACHE_EVENTCONTENT_KEY
    CACHE_TIMEOUT = settings.CACHE_EVENTCONTENT_TIMEOUT

    CONTENT_CONFIG = [
        ('event', EventContent, EventContentSerializer, True)
    ]
