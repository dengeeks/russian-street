from django import forms
from django.contrib import admin
from django.core.exceptions import ValidationError
from django.http import JsonResponse
from django.urls import path
from unfold.admin import ModelAdmin

from common.admin import LinkToDetailMixin
from events.models.discipline import SubDiscipline
from events.models.event import Event


class EventForm(forms.ModelForm):
    class Meta:
        model = Event
        fields = '__all__'

    def clean(self):
        cleaned_data = super().clean()
        format_type = cleaned_data.get('format_type')
        video_url = cleaned_data.get('video_url')
        image = cleaned_data.get('image')

        # Проверка, что выбрано либо видео, либо изображение
        if not any([video_url, image]):
            raise ValidationError('Необходимо добавить видео или изображение.')

        # Валидация в зависимости от выбранного типа
        if format_type == 'video_url' and not video_url:
            raise ValidationError('Для типа "Видео" необходимо указать URL видео.')
        elif format_type == 'image' and not image:
            raise ValidationError('Для типа "Изображение" необходимо загрузить файл.')

        return cleaned_data

    def save(self, commit = True):
        instance = super().save(commit = False)

        # Удаляем ненужные файлы в зависимости от выбранного типа
        if self.cleaned_data.get('format_type') == 'video_url':
            if instance.image:
                # Удаляем файл изображения из хранилища
                instance.image.delete(save = False)
                instance.image = None
        elif self.cleaned_data.get('format_type') == 'image':
            instance.video_url = None

        if commit:
            instance.save()
            self.save_m2m()

        return instance


@admin.register(Event)
class EventAdmin(LinkToDetailMixin, ModelAdmin):
    form = EventForm
    list_display = [
        'link_to_detail', 'title', 'region', 'city', 'discipline', 'is_moderation',
        'is_our_project', 'is_priority', 'created_at'
    ]
    list_filter = [
        'is_moderation', 'is_our_project', 'is_priority', 'region',
        'city', 'discipline', 'sub_discipline', 'created_at'
    ]
    search_fields = ['title', 'description', 'address']
    readonly_fields = ['created_at', 'updated_at', 'link_to_detail']
    fieldsets = (
        ('Основная информация', {
            'fields': (
                'title',
                'description',
                'discipline',
                'sub_discipline',
                'is_moderation',
                'is_our_project',
                'is_priority',
                'service_id'
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

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(region__manager = request.user)

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

        from regions.models.region import City
        cities = City.objects.filter(region_id = region_id).values('id', 'name')
        return JsonResponse(list(cities), safe = False)

    def get_subdisciplines(self, request):
        discipline_id = request.GET.get('discipline_id')
        if not discipline_id:
            return JsonResponse({'error': 'Discipline ID is required'}, status = 400)

        subdisciplines = SubDiscipline.objects.filter(discipline_id = discipline_id).values('id', 'name')
        return JsonResponse(list(subdisciplines), safe = False)

    class Media:
        js = ('js/event_admin.js',)
