from django import forms
from django.contrib import admin
from django.core.exceptions import ValidationError
from unfold.admin import ModelAdmin

from contents.models.about_us import JoinStreet, Mission, Information


class BaseCategoryAdmin(ModelAdmin):
    """Базовый класс для админки категорий."""

    # Поля для всех категорий
    readonly_fields = ['is_all_translated']
    search_fields = ['title']
    search_help_text = 'Поиск по названию'
    list_filter = ['is_all_translated']
    list_filter_submit = True
    compressed_fields = True
    list_display = ['title', 'is_all_translated', 'created_at', 'updated_at']

    # Общие блоки переводов
    TRANSLATION_FIELDS = {
        'Английский (обязательный)': {
            'fields': ('title_en', 'h1_en', 'meta_title_en', 'meta_desc_en'),
            'classes': ('tab',),  # Вкладка для английского
        },
        'Русский': {
            'fields': ('title_ru', 'h1_ru', 'meta_title_ru', 'meta_desc_ru'),
            'classes': ('tab',),  # Вкладка для русского
        },
    }


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
class JoinStreetAdmin(ModelAdmin):
    """
    Класс администратора для модели JoinStreet.
    """
    form = JoinStreetForm

    class Media:
        js = ('js/join_street_form.js',)


@admin.register(Mission)
class MissionAdmin(ModelAdmin):
    """
    Класс администратора для модели Mission.
    """
    pass


@admin.register(Information)
class InformationAdmin(ModelAdmin):
    """
    Класс администратора для модели Information.
    """
    pass
