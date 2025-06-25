from django.contrib import admin
from unfold.admin import ModelAdmin

from common.admin import LinkToDetailMixin
from managers.models.manager_type import ManagerType


@admin.register(ManagerType)
class ManagerTypeAdmin(LinkToDetailMixin, ModelAdmin):
    """
    Класс администратора для модели ManagerType.
    """
    fields = ['name', 'created_at', 'updated_at']
    list_display = ['name', 'name', 'updated_at']
    readonly_fields = ['link_to_detail', 'created_at', 'updated_at']
