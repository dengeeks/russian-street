from django import forms
from django.contrib import admin
from django.core.exceptions import ValidationError
from unfold.admin import ModelAdmin

from common.admin import LinkToDetailMixin
from events.models.discipline import SubDiscipline, Discipline


class SubDisciplineForm(forms.ModelForm):
    class Meta:
        model = SubDiscipline
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


@admin.register(Discipline)
class DisciplineAdmin(LinkToDetailMixin, ModelAdmin):
    """
    Класс администратора для модели Discipline.
    """
    fields = [
        'name', 'first_image', 'second_image', 'first_description',
        'second_description', 'created_at', 'updated_at'
    ]
    list_display = ['link_to_detail', 'name']
    readonly_fields = ['created_at', 'updated_at', 'link_to_detail']
    search_fields = ['name']


@admin.register(SubDiscipline)
class SubDisciplineAdmin(LinkToDetailMixin, ModelAdmin):
    """
    Класс администратора для модели SubDiscipline.
    """
    fields = [
        'name', 'description', 'format_type', 'video_url',
        'image', 'second_image', 'discipline', 'created_at', 'updated_at'
    ]
    form = SubDisciplineForm
    list_display = ['link_to_detail', 'name']
    readonly_fields = ['created_at', 'updated_at', 'link_to_detail']
    search_fields = ['name']
