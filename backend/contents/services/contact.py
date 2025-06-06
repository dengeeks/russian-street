from django.conf import settings

from contents.models.contact import ContactFooter, ContactHeader, EmailFooter
from contents.serializers.contact import ContactFooterSerializer, ContactHeaderSerializer, EmailFooterSerializer
from contents.services.base import BaseContentService


class ContactService(BaseContentService):
    CACHE_KEY = settings.CACHE_CONTACT_KEY
    CACHE_TIMEOUT = settings.CACHE_CONTACT_TIMEOUT

    CONTENT_CONFIG = [
        ('contact_footer', ContactFooter, ContactFooterSerializer, True),
        ('contact_header', ContactHeader, ContactHeaderSerializer, False),
        ('email_footer', EmailFooter, EmailFooterSerializer, False)
    ]
