from django.contrib import admin
from django.http import JsonResponse
from django.urls import path
from unfold.admin import ModelAdmin

from common.admin import LinkToDetailMixin, MediaContentFormMixin
from events.models.area import Area
from events.models.base import AreaType, EventActivityType
from events.models.discipline import SubDiscipline
from events.models.event import Event
from regions.models.region import City


class EventForm(MediaContentFormMixin):
    class Meta:
        model = Event
        fields = "__all__"


class AreaForm(MediaContentFormMixin):
    class Meta:
        model = Area
        fields = "__all__"


class BaseEventAdmin(LinkToDetailMixin, ModelAdmin):
    """Базовый класс админки для мероприятий и площадок"""

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if not request.user.is_superuser:
            return qs.filter(region__manager = request.user)
        return qs

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('get-cities/', self.admin_site.admin_view(self.get_cities)),
            path('get-subdisciplines/', self.admin_site.admin_view(self.get_subdisciplines)),
        ]
        return custom_urls + urls

    def get_cities(self, request):
        region_id = request.GET.get('region_id')
        if not region_id:
            return JsonResponse({'error': 'Region ID is required'}, status = 400)

        cities = City.objects.filter(region_id = region_id).values('id', 'name')
        return JsonResponse(list(cities), safe = False)

    def get_subdisciplines(self, request):
        discipline_id = request.GET.get('discipline_id')
        if not discipline_id:
            return JsonResponse({'error': 'Discipline ID is required'}, status = 400)

        subdisciplines = SubDiscipline.objects.filter(
            discipline_id = discipline_id
        ).values('id', 'name')
        return JsonResponse(list(subdisciplines), safe = False)

    class Media:
        js = ('js/event_admin.js',)


@admin.register(Event)
class EventAdmin(BaseEventAdmin):
    form = EventForm
    list_display = [
        'link_to_detail', 'title', 'region', 'city', 'discipline',
        'is_our_project', 'is_priority', 'created_at'
    ]
    list_filter = [
        'is_our_project', 'is_priority', 'region',
        'city', 'discipline', 'sub_discipline', 'type', 'created_at'
    ]
    ordering = ['-created_at']
    search_fields = ['title', 'description', 'address']
    readonly_fields = ['created_at', 'updated_at', 'link_to_detail']
    fieldsets = (
        ('Основная информация', {
            'fields': (
                'title',
                'description',
                'discipline',
                'sub_discipline',
                'is_our_project',
                'is_priority',
                'service_id',
                'starting_date',
                'ending_date',
                'type'
            )
        }),
        ('Местоположение', {
            'fields': (
                'region',
                'city',
                'address',
                'yandex_address'
            )
        }),
        ('Медиа', {
            'fields': (
                'card_image',
                'format_type',
                'image',
                'video_url',
            )
        }),
        ('Системная информация', {
            'fields': (
                'created_at',
                'updated_at'
            ),
            'classes': ('collapse',)
        }),
    )
    compressed_fields = True


@admin.register(Area)
class AreaAdmin(BaseEventAdmin):
    form = AreaForm
    list_display = [
        'link_to_detail', 'title', 'region', 'city', 'discipline', 'created_at'
    ]
    list_filter = [
        'region', 'city', 'discipline', 'sub_discipline', 'type', 'created_at',
        'updated_at',
    ]
    search_fields = ['title', 'description', 'address']
    readonly_fields = ['created_at', 'updated_at', 'link_to_detail']
    ordering = ['-created_at']
    fieldsets = (
        ('Основная информация', {
            'fields': (
                'title',
                'description',
                'discipline',
                'sub_discipline',
                'type'
            )
        }),
        ('Местоположение', {
            'fields': (
                'region',
                'city',
                'address',
                'yandex_address'
            )
        }),
        ('Медиа', {
            'fields': (
                'card_image',
                'format_type',
                'image',
                'video_url',
            )
        }),
        ('Системная информация', {
            'fields': (
                'created_at',
                'updated_at'
            ),
            'classes': ('collapse',)
        }),
    )
    compressed_fields = True


@admin.register(AreaType)
class AreaTypeAdmin(ModelAdmin):
    """Админ-панель для типов площадок"""
    fields = ['name', 'created_at', 'updated_at']
    list_display = ['name', 'created_at', 'updated_at']
    search_fields = ['name']
    list_filter = ['created_at', 'updated_at']
    readonly_fields = ['created_at', 'updated_at']


@admin.register(EventActivityType)
class EventActivityTypeAdmin(ModelAdmin):
    """Админ-панель для типов мероприятий"""
    fields = ['name', 'created_at', 'updated_at']
    list_display = ['name', 'created_at', 'updated_at']
    search_fields = ['name']
    list_filter = ['created_at', 'updated_at']
    readonly_fields = ['created_at', 'updated_at']
