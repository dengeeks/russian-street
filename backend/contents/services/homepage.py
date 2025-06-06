from django.conf import settings

from contents.models.homepage import (
    PromotionalVideo,
    AboutUs,
    MissionAndGoalsText,
    OrganizationInfo,
    StreetIsUsImage,
    MissionAndGoalsImage
)
from contents.serializers.homepage import (
    PromotionalVideoSerializer,
    AboutUsSerializer,
    MissionAndGoalsTextSerializer,
    MissionAndGoalsImageSerializer,
    OrganizationInfoSerializer,
    StreetIsUsImageSerializer
)
from contents.services.base import BaseContentService


class HomePageService(BaseContentService):
    CACHE_KEY = settings.CACHE_HOMEPAGE_KEY
    CACHE_TIMEOUT = settings.CACHE_HOMEPAGE_TIMEOUT

    CONTENT_CONFIG = [
        ('promotional_video', PromotionalVideo, PromotionalVideoSerializer, False),
        ('about_us', AboutUs, AboutUsSerializer, False),
        ('mission_and_goals_text', MissionAndGoalsText, MissionAndGoalsTextSerializer, False),
        ('organization_info', OrganizationInfo, OrganizationInfoSerializer, False),
        ('street_images', StreetIsUsImage, StreetIsUsImageSerializer, True),
        ('mission_images', MissionAndGoalsImage, MissionAndGoalsImageSerializer, True),
    ]
