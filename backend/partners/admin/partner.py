from django.contrib import admin
from unfold.admin import ModelAdmin

from common.admin import LinkToDetailMixin
from partners.models.partner import Partner, PartnerType


@admin.register(PartnerType)
class PartnerTypeAdmin(LinkToDetailMixin, ModelAdmin):
    """
    Класс администратора для модели PartnerType.
    """
    fields = ['name', 'created_at', 'updated_at']
    list_display = ['link_to_detail', 'name', 'created_at', 'updated_at']
    readonly_fields = ['link_to_detail', 'created_at', 'updated_at']


@admin.register(Partner)
class PartnerAdmin(LinkToDetailMixin, ModelAdmin):
    """
    Класс администратора для модели Partner.
    """
    fields = ['name', 'image', 'description', 'type', 'url', 'created_at', 'updated_at']
    list_display = ['link_to_detail', 'name', 'created_at', 'updated_at']
    readonly_fields = ['link_to_detail', 'created_at', 'updated_at']
    list_filter = ['type']
    search_fields = ['name']
    compressed_fields = True
