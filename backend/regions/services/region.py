from uuid import UUID

from rest_framework.exceptions import ValidationError

from regions.models.region import Region, City


class RegionFilterService:
    @classmethod
    def validate_and_get_filters(cls, params):
        region_id = params.get('region_id')
        if region_id:
            try:
                region_id = UUID(region_id)
            except ValueError:
                raise ValidationError({'region_id': 'Должен быть валидный UUID'})
        return {'region_id': region_id}

    @classmethod
    def get_queryset(cls, params):
        filters = cls.validate_and_get_filters(params)
        if filters['region_id']:
            return City.objects.filter(region_id = filters['region_id']).only('id', 'name'), 'city'
        return Region.objects.all().only('id', 'name', ), 'region'
