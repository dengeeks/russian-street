from django.contrib import admin
from unfold.admin import TabularInline, ModelAdmin

from common.admin import LinkToDetailMixin, ImagePreviewMixin
from managers.models.social import SocialLinkManager, SocialMediaManager


@admin.register(SocialMediaManager)
class SocialMediaManagerAdmin(ImagePreviewMixin, LinkToDetailMixin, ModelAdmin):
    fields = ['name', 'image']
    list_display = ['link_to_detail', 'image_preview', 'name', 'image']
    readonly_fields = ['link_to_detail', 'image_preview', 'created_at', 'updated_at']


class SocialLinkManagerInline(TabularInline):
    model = SocialLinkManager
    extra = 1
    fields = ['social_media', 'url']
    verbose_name_plural = "Социальные сети руководителя"
