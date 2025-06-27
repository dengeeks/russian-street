from django.contrib import admin
from unfold.admin import ModelAdmin

from common.admin import LinkToDetailMixin, ImagePreviewMixin
from teams.models.team_member import TeamMember


@admin.register(TeamMember)
class TeamMemberAdmin(ImagePreviewMixin, LinkToDetailMixin, ModelAdmin):
    """
    Класс администратора для модели TeamMember.
    """
    fields = ['image', 'first_name', 'last_name', 'info', 'type']
    list_display = ['link_to_detail', 'image_preview', 'first_name', 'last_name', 'type']
    readonly_fields = ['link_to_detail', 'image_preview', 'created_at', 'updated_at']
    list_filter = ['type']
    search_fields = ['first_name', 'last_name']
