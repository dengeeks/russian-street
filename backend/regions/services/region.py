from uuid import UUID

from django.db.models import Count
from django.utils import timezone
from rest_framework.exceptions import ValidationError

from events.models.area import Area
from events.models.event import Event
from regions.models.region import City
from regions.models.region import Region


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


class RegionStatsService:
    """
    Сервис получения статистики по регионам:
    - Наличие мероприятий и площадок
    - Количество мероприятий и площадок
    """

    @classmethod
    def get_region_stats(cls):
        now = timezone.now().date()

        # Получаем все регионы заранее (1 запрос)
        regions = Region.objects.all().only('id', 'name')

        # Получаем кол-во мероприятий по region_id (1 запрос)
        events_by_region = (
            Event.objects
            .filter(ending_date__date__gte=now)
            .values('region_id')
            .annotate(count=Count('id'))
        )
        events_map = {e['region_id']: e['count'] for e in events_by_region}

        # Получаем кол-во площадок по region_id (1 запрос)
        areas_by_region = (
            Area.objects
            .values('region_id')
            .annotate(count=Count('id'))
        )
        areas_map = {a['region_id']: a['count'] for a in areas_by_region}

        data = []
        total_events = 0
        total_areas = 0

        for region in regions:
            count_events = events_map.get(region.id, 0)
            count_areas = areas_map.get(region.id, 0)

            data.append({
                "id": region.id,
                "name": region.name,
                "have_events": count_events > 0,
                "have_areas": count_areas > 0,
                "count_events": count_events,
                "count_areas": count_areas,
            })

            total_events += count_events
            total_areas += count_areas

        return {
            "regions": data,
            "total_events": total_events,
            "total_areas": total_areas,
        }