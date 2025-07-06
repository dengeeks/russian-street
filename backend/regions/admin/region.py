from django.contrib import admin
from unfold.admin import ModelAdmin

from common.admin import LinkToDetailMixin, NoAddDeleteMixin
from regions.models.region import Region, City
from users.models.user import UserAccount


@admin.register(Region)
class RegionAdmin(LinkToDetailMixin, NoAddDeleteMixin, ModelAdmin):
    """
    Класс администратора для модели Region.
    """
    fields = ['name', 'image', 'info', 'manager', 'code', 'created_at', 'updated_at']
    list_display = ['link_to_detail', 'name', 'code', 'created_at', 'updated_at']
    readonly_fields = ['link_to_detail', 'created_at', 'updated_at', 'code']
    search_fields = ['name', 'code']
    compressed_fields = True

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == 'manager':
            kwargs['queryset'] = UserAccount.objects.filter(role = 'regional_director')
        return super().formfield_for_foreignkey(db_field, request, **kwargs)


@admin.register(City)
class CityAdmin(LinkToDetailMixin, ModelAdmin):
    """
    Класс администратора для модели City.
    """
    fields = ['name', 'region', 'created_at', 'updated_at']
    list_display = ['link_to_detail', 'name', 'region', 'created_at', 'updated_at']
    readonly_fields = ['link_to_detail', 'created_at', 'updated_at']
    list_filter = ['region']
    search_fields = ['name']
    autocomplete_fields = ['region']
