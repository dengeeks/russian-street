from django.conf import settings

from contents.models.cooperation import Cooperation
from contents.serializers.cooperation import CooperationSerializer
from contents.services.base import BaseContentService


class CooperationService(BaseContentService):
    CACHE_KEY = settings.CACHE_COOPERATION_KEY
    CACHE_TIMEOUT = settings.CACHE_COOPERATION_TIMEOUT

    CONTENT_CONFIG = [
        ('cooperation', Cooperation, CooperationSerializer, False),
    ]
