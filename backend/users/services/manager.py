from uuid import UUID

from django.core.exceptions import ValidationError

from regions.models.region import Region


class RegionManagerService:

    @staticmethod
    def get_manager_by_region_id(region_id):
        """
        По region_id вернуть пользователя руководителя региона (или None).

        Args:
            region_id (str|UUID): UUID региона

        Returns:
            UserAccount | None
        """
        try:
            region_uuid = UUID(str(region_id))
        except ValueError:
            raise ValidationError({'region_id': 'Неверный UUID'})

        # Получаем регион с этим ID
        try:
            region = Region.objects.get(id = region_uuid)
        except Region.DoesNotExist:
            return None

        # Вернуть менеджера из поля Region.manager (если используется это поле)
        if hasattr(region, 'manager') and region.manager:
            return region.manager

        return None
