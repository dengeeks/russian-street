from django.contrib import admin
from django.utils.safestring import mark_safe
from unfold.admin import ModelAdmin

from common.admin import NoAddDeleteMixin, LinkToDetailMixin, ImagePreviewMixin, MediaContentFormMixin
from contents.models.about_us import JoinStreet, Mission, Information


class JoinStreetForm(MediaContentFormMixin):
    class Meta:
        model = JoinStreet
        fields = '__all__'


@admin.register(JoinStreet)
class JoinStreetAdmin(LinkToDetailMixin, NoAddDeleteMixin, ModelAdmin):
    """
    Класс администратора для модели JoinStreet.
    """
    form = JoinStreetForm
    fields = ['format_type', 'video_url', 'image', 'text', 'created_at', 'updated_at']
    list_display = ['link_to_detail', 'text_html', 'created_at', 'updated_at']
    readonly_fields = ['link_to_detail', 'created_at', 'updated_at', 'text_html']

    def text_html(self, obj):
        """
        Отображает HTML-текста без экранирования.
        """
        if obj.text:
            return mark_safe(obj.text)
        return '—'

    text_html.short_description = 'Текстовое описание'

    class Media:
        js = ('js/join_street_form.js',)


@admin.register(Mission)
class MissionAdmin(ImagePreviewMixin, LinkToDetailMixin, NoAddDeleteMixin, ModelAdmin):
    """
    Класс администратора для модели Mission.
    """
    fields = ['image', 'created_at', 'updated_at']
    list_display = ['link_to_detail', 'image_preview', 'created_at', 'updated_at']
    readonly_fields = ['image_preview', 'link_to_detail', 'created_at', 'updated_at']


@admin.register(Information)
class InformationAdmin(LinkToDetailMixin, NoAddDeleteMixin, ModelAdmin):
    """
    Класс администратора для модели Information.
    """
    fields = ['person', 'discipline', 'organization', 'event', 'created_at', 'updated_at']
    list_display = ['link_to_detail', 'person', 'discipline', 'organization', 'event', 'created_at', 'updated_at']
    readonly_fields = ['link_to_detail', 'created_at', 'updated_at']
