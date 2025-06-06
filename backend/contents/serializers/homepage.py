from common.serializers import BaseExcludeSerializer
from contents.models.homepage import (
    PromotionalVideo,
    StreetIsUsImage,
    AboutUs,
    MissionAndGoalsText,
    MissionAndGoalsImage,
    OrganizationInfo
)


class PromotionalVideoSerializer(BaseExcludeSerializer):
    class Meta(BaseExcludeSerializer.Meta):
        model = PromotionalVideo


class StreetIsUsImageSerializer(BaseExcludeSerializer):
    class Meta(BaseExcludeSerializer.Meta):
        model = StreetIsUsImage


class AboutUsSerializer(BaseExcludeSerializer):
    class Meta(BaseExcludeSerializer.Meta):
        model = AboutUs


class MissionAndGoalsTextSerializer(BaseExcludeSerializer):
    class Meta(BaseExcludeSerializer.Meta):
        model = MissionAndGoalsText


class MissionAndGoalsImageSerializer(BaseExcludeSerializer):
    class Meta(BaseExcludeSerializer.Meta):
        model = MissionAndGoalsImage


class OrganizationInfoSerializer(BaseExcludeSerializer):
    class Meta(BaseExcludeSerializer.Meta):
        model = OrganizationInfo
