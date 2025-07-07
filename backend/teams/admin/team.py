from django.contrib import admin
from unfold.admin import ModelAdmin

from common.admin import LinkToDetailMixin
from teams.models.team_member import TeamMember


@admin.register(TeamMember)
class TeamMemberAdmin(LinkToDetailMixin, ModelAdmin):
    """
    Класс администратора для модели TeamMember.
    """
    fields = ['image', 'first_name', 'last_name', 'info', 'type', 'created_at', 'updated_at']
    list_display = ['link_to_detail', 'first_name', 'last_name', 'type']
    readonly_fields = ['link_to_detail', 'created_at', 'updated_at']
    list_filter = ['type']
    search_fields = ['first_name', 'last_name']
    compressed_fields = True