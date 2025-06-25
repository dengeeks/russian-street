from django.conf import settings
from django.db.models import Prefetch
from rest_framework import status
from rest_framework.response import Response

from common.mixins import CacheServiceMixin
from managers.models.manager import Manager
from managers.models.manager_type import ManagerType
from managers.models.social import SocialLinkManager
from regions.models.region import Region


class ManagerService(CacheServiceMixin):
    __manager_type_model = ManagerType
    __manager_model = Manager
    CACHE_KEY = settings.CACHE_MANAGERS_KEY
    CACHE_TIMEOUT = settings.CACHE_MANAGERS_TIMEOUT

    @classmethod
    def _fetch_data(cls, serializer_class):
        """Получает и сериализует руководителей, сгруппированных по типам"""
        manager_types = ManagerType.objects.prefetch_related('managers').all()

        result = []
        for manager_type in manager_types:
            managers = manager_type.managers.all()
            if managers.exists():  # Добавляем только если есть руководители этого типа
                result.append(
                    {
                        'manager_type': manager_type.name,
                        'managers': cls._serialize_collection(managers, serializer_class)
                    }
                )

        return result


class ManagerCardService:
    __manager_model = Manager
    __region_model = Region
    __social_link_model = SocialLinkManager

    @classmethod
    def get_manager_by_region(cls, region_id, serializer_class):
        """
        Получение руководителя региона с оптимизированными запросами
        """

        try:
            # Оптимизированный запрос с prefetch_related для соцсетей
            region = cls.__region_model.objects.only('id').get(pk = region_id)
            manager = (
                cls.__manager_model.objects
                .filter(region = region)
                .select_related('region')
                .prefetch_related(
                    Prefetch(
                        'social_links',
                        queryset = cls.__social_link_model.objects.select_related('social_media')
                    )
                )
                .first()
            )

            if not manager:
                return cls._prepare_error_response(
                    "Для данного региона не назначен руководитель",
                    status.HTTP_404_NOT_FOUND
                )

            serializer = serializer_class(manager)
            data = serializer.data
            return Response(data)

        except Region.DoesNotExist:
            return cls._prepare_error_response(
                "Регион не найден",
                status.HTTP_404_NOT_FOUND
            )

    @staticmethod
    def _prepare_error_response(message, status_code):
        return Response(
            {"detail": message},
            status = status_code
        )


class DetailManagerService:
    @staticmethod
    def get_manager_detail(manager_uuid, serializer_class):
        """
        Получение детальной информации о руководителе с оптимизацией запросов
        """

        try:
            manager = Manager.objects.filter(pk = manager_uuid) \
                .select_related('region', 'type') \
                .prefetch_related('social_links') \
                .first()

            if not manager:
                return Response(
                    {"detail": "Руководитель не найден"},
                    status = status.HTTP_404_NOT_FOUND
                )

            serializer = serializer_class(manager)
            data = serializer.data

            return Response(data)

        except Exception as e:
            return Response(
                {"detail": "Ошибка при получении данных руководителя"},
                status = status.HTTP_500_INTERNAL_SERVER_ERROR
            )
