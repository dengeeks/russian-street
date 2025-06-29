from django.contrib import admin
from unfold.admin import ModelAdmin

from common.admin import LinkToDetailMixin
from teams.models.team_type import TeamType


@admin.register(TeamType)
class TeamTypeAdmin(LinkToDetailMixin, ModelAdmin):
    """
    Класс администратора для модели TeamType.
    """
    fields = ['name', 'created_at', 'updated_at']
    list_display = ['name', 'name', 'updated_at']
    readonly_fields = ['link_to_detail', 'created_at', 'updated_at']
