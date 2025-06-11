from django.contrib import admin
from django.utils.safestring import mark_safe
from unfold.admin import ModelAdmin

from common.admin import NoAddDeleteMixin, LinkToDetailMixin
from contents.models.cooperation import Cooperation


@admin.register(Cooperation)
class CooperationAdmin(LinkToDetailMixin, NoAddDeleteMixin, ModelAdmin):
    """
    Класс администратора для модели Cooperation.
    """
    fields = ['partners_count', 'projects_count', 'text', 'created_at', 'updated_at']
    list_display = ['link_to_detail', 'text_html', 'projects_count', 'partners_count']
    readonly_fields = ['link_to_detail', 'created_at', 'updated_at']

    def text_html(self, obj):
        """
        Отображает HTML-текста без экранирования.
        """
        if obj.text:
            return mark_safe(obj.text)
        return '—'

    text_html.short_description = 'Текстовое описание'
