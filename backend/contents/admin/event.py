from django.contrib import admin
from unfold.admin import ModelAdmin

from common.admin import MediaContentFormMixin, LinkToDetailMixin, NoAddDeleteMixin
from contents.models.event import EventContent


class EventContentForm(MediaContentFormMixin):
    class Meta:
        model = EventContent
        fields = '__all__'


@admin.register(EventContent)
class EventContentAdmin(LinkToDetailMixin, NoAddDeleteMixin, ModelAdmin):
    """
    Класс администратора для модели EventContent.
    """
    form = EventContentForm
    fields = ['title', 'format_type', 'video_url', 'image', 'type', 'created_at', 'updated_at']
    list_display = ['link_to_detail', 'title', 'type', 'created_at', 'updated_at']
    readonly_fields = ['link_to_detail', 'created_at', 'updated_at']
