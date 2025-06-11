from django import forms
from django.contrib import admin
from django.core.exceptions import ValidationError
from django.utils.safestring import mark_safe
from unfold.admin import ModelAdmin

from common.admin import NoAddDeleteMixin, LinkToDetailMixin, ImagePreviewMixin
from contents.models.about_us import JoinStreet, Mission, Information


class JoinStreetForm(forms.ModelForm):
    class Meta:
        model = JoinStreet
        fields = '__all__'

    def clean(self):
        cleaned_data = super().clean()
        format_type = cleaned_data.get('format_type')
        video_url = cleaned_data.get('video_url')
        image = cleaned_data.get('image')

        # Проверка, что выбрано либо видео, либо изображение
        if not any([video_url, image]):
            raise ValidationError('Необходимо добавить видео или изображение.')

        # Валидация в зависимости от выбранного типа
        if format_type == 'video_url' and not video_url:
            raise ValidationError('Для типа "Видео" необходимо указать URL видео.')
        elif format_type == 'image' and not image:
            raise ValidationError('Для типа "Изображение" необходимо загрузить файл.')

        return cleaned_data

    def save(self, commit = True):
        instance = super().save(commit = False)

        # Удаляем ненужные файлы в зависимости от выбранного типа
        if self.cleaned_data.get('format_type') == 'video_url':
            if instance.image:
                # Удаляем файл изображения из хранилища
                instance.image.delete(save = False)
                instance.image = None
        elif self.cleaned_data.get('format_type') == 'image':
            instance.video_url = None

        if commit:
            instance.save()
            self.save_m2m()

        return instance


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
