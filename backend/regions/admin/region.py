from django.contrib import admin
from unfold.admin import ModelAdmin

from common.admin import LinkToDetailMixin, ImagePreviewMixin
from regions.models.region import Region, City


@admin.register(Region)
class RegionAdmin(ImagePreviewMixin, LinkToDetailMixin, ModelAdmin):
    """
    Класс администратора для модели Region.
    """
    fields = ['name', 'image', 'info', 'code', 'created_at', 'updated_at']
    list_display = ['link_to_detail', 'name', 'image_preview']
    readonly_fields = ['link_to_detail', 'image_preview', 'created_at', 'updated_at']
    search_fields = ['name']


@admin.register(City)
class CityAdmin(LinkToDetailMixin, ModelAdmin):
    """
    Класс администратора для модели City.
    """
    fields = ['name', 'region', 'created_at', 'updated_at']
    list_display = ['link_to_detail', 'name', 'region']
    readonly_fields = ['link_to_detail', 'created_at', 'updated_at']
    list_filter = ['region']
    search_fields = ['name']
