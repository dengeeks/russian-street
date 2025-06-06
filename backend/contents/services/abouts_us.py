from django.conf import settings

from contents.models.about_us import (
    JoinStreet,
    Mission,
    Information,
)
from contents.serializers.about_us import (
    JoinStreetSerializer,
    InformationSerializer,
    MissionSerializer,
)
from contents.services.base import BaseContentService


class AboutUsService(BaseContentService):
    CACHE_KEY = settings.CACHE_ABOUTUS_KEY
    CACHE_TIMEOUT = settings.CACHE_ABOUTUS_TIMEOUT

    CONTENT_CONFIG = [
        ('join_street', JoinStreet, JoinStreetSerializer, False),
        ('mission', Mission, MissionSerializer, False),
        ('info', Information, InformationSerializer, False),
    ]
