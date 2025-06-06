from common.serializers import BaseExcludeSerializer
from contents.models.contact import ContactHeader, EmailFooter, ContactFooter


class ContactHeaderSerializer(BaseExcludeSerializer):
    class Meta(BaseExcludeSerializer.Meta):
        model = ContactHeader


class ContactFooterSerializer(BaseExcludeSerializer):
    class Meta(BaseExcludeSerializer.Meta):
        model = ContactFooter


class EmailFooterSerializer(BaseExcludeSerializer):
    class Meta(BaseExcludeSerializer.Meta):
        model = EmailFooter
