from django.contrib import admin
from django.core.exceptions import ValidationError
from django.forms import BaseInlineFormSet
from django.http import JsonResponse
from django.urls import path
from unfold.admin import ModelAdmin, TabularInline

from common.admin import LinkToDetailMixin, MediaContentFormMixin
from news.models.new import GalleryNew, New
from regions.models.region import City


class GalleryInlineFormSet(BaseInlineFormSet):
    def clean(self):
        super().clean()
        count = 0
        main_forms = []

        for form in self.forms:
            if form.cleaned_data.get('DELETE', False):
                continue
            count += 1
            if form.cleaned_data.get('is_main'):
                main_forms.append(form)

        if len(main_forms) == 0:
            # Ошибка «нет главного фото» — добавить ошибку к полю is_main каждой формы
            for form in self.forms:
                if form.cleaned_data.get('DELETE', False):
                    continue
                form.add_error('is_main', "Хотя бы один элемент галереи должен быть отмечен как главный.")

        if len(main_forms) > 1:
            # Ошибка «несколько главных фото» — добавить ошибку к полю is_main у всех отмеченных форм
            error = ValidationError("Должен быть только один элемент галереи с отметкой 'Главное фото'.")
            for form in main_forms:
                form.add_error('is_main', error)


class GalleryForm(MediaContentFormMixin):
    class Meta:
        model = GalleryNew
        fields = "__all__"


class GalleryInline(TabularInline):
    model = GalleryNew
    form = GalleryForm
    formset = GalleryInlineFormSet
    min_num = 1
    extra = 0
    fields = ['format_type', 'image', 'video_url', 'is_main']
    verbose_name = 'Элемент галереи'
    verbose_name_plural = 'Галерея'

    class Media:
        js = ('js/inline_format_type.js',)


@admin.register(New)
class NewAdmin(LinkToDetailMixin, ModelAdmin):
    """
    Класс администратора для модели New.
    """
    fields = [
        'title', 'description', 'card_image', 'subdiscipline',
        'region', 'city'
    ]
    list_display = ['link_to_detail', 'title', 'created_at', 'updated_at']
    readonly_fields = ['created_at', 'updated_at', 'link_to_detail']
    compressed_fields = True
    search_fields = ['name']
    inlines = [GalleryInline]

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if not request.user.is_superuser:
            return qs.filter(region__manager = request.user)
        return qs

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('get-cities/', self.admin_site.admin_view(self.get_cities)),
        ]
        return custom_urls + urls

    def get_cities(self, request):
        region_id = request.GET.get('region_id')
        if not region_id:
            return JsonResponse({'error': 'Region ID is required'}, status = 400)

        cities = City.objects.filter(region_id = region_id).values('id', 'name')
        return JsonResponse(list(cities), safe = False)

    class Media:
        js = ('js/event_admin.js',)
