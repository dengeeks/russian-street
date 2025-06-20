from common.serializers import BaseExcludeSerializer
from partners.models.partner import Partner


class ListPartnerSerializer(BaseExcludeSerializer):
    class Meta(BaseExcludeSerializer.Meta):
        model = Partner
        exclude = BaseExcludeSerializer.Meta.exclude + ['type']
