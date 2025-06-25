from django.contrib import admin
from unfold.admin import ModelAdmin

from common.admin import LinkToDetailMixin, ImagePreviewMixin
from managers.admin.social import SocialLinkManagerInline
from managers.models.manager import Manager


@admin.register(Manager)
class ManagerAdmin(ImagePreviewMixin, LinkToDetailMixin, ModelAdmin):
    """
    Класс администратора для модели Manager.
    """
    fields = [
        'aboutus_image', 'image', 'first_name', 'last_name', 'middle_name', 'info',
        'email', 'phone', 'address', 'type', 'region'
    ]
    list_display = ['link_to_detail', 'image_preview', 'first_name', 'last_name', 'type']
    readonly_fields = ['link_to_detail', 'image_preview', 'created_at', 'updated_at']
    list_filter = ['type']
    search_fields = ['first_name', 'last_name', 'middle_name']
    inlines = [SocialLinkManagerInline]
