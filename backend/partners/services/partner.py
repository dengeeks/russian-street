from django.conf import settings

from common.mixins import CacheServiceMixin
from partners.models.partner import PartnerType, Partner


class PartnerService(CacheServiceMixin):
    __partner_type_model = PartnerType
    __partner_model = Partner
    CACHE_KEY = settings.CACHE_PARTNERS_KEY
    CACHE_TIMEOUT = settings.CACHE_PARTNERS_TIMEOUT

    @classmethod
    def _fetch_data(cls, serializer_class):
        """Получает и сериализует партнеров, сгруппированных по типам"""
        partner_types = PartnerType.objects.prefetch_related('partners').all()

        result = []
        for partner_type in partner_types:
            partners = partner_type.partners.all()
            if partners.exists():  # Добавляем только если есть партнеры этого типа
                result.append(
                    {
                        'partner_type': partner_type.name,
                        'partners': cls._serialize_collection(partners, serializer_class)
                    }
                )

        return result
