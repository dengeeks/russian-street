from django.contrib import admin
from unfold.admin import ModelAdmin

from common.admin import LinkToDetailMixin, NoAddDeleteMixin
from contents.models.everyone_likes import EveryoneLikes


@admin.register(EveryoneLikes)
class EveryoneLikesAdmin(LinkToDetailMixin, NoAddDeleteMixin, ModelAdmin):
    """
    Класс администратора для модели EveryoneLikes.
    """
    fields = ['title', 'description', 'created_at', 'updated_at']
    list_display = ['link_to_detail', 'title', 'description', 'created_at', 'updated_at']
    readonly_fields = ['link_to_detail', 'created_at', 'updated_at']
