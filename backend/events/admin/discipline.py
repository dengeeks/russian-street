from django import forms
from django.contrib import admin
from django.core.exceptions import ValidationError
from django.forms import BaseInlineFormSet
# from django.forms import BaseInlineFormSet
from unfold.admin import ModelAdmin, TabularInline

from common.admin import LinkToDetailMixin
from events.models.discipline import SubDiscipline, Discipline, GallerySubDiscipline


class GalleryInlineFormSet(BaseInlineFormSet):
    def clean(self):
        super().clean()
        count = 0
        main_forms = []

        for form in self.forms:
            if form.cleaned_data.get('DELETE', False):
                continue
            count += 1
            if form.cleaned_data.get('is_main'):
                main_forms.append(form)

        if len(main_forms) == 0:
            # Ошибка «нет главного фото» — добавить ошибку к полю is_main каждой формы
            for form in self.forms:
                if form.cleaned_data.get('DELETE', False):
                    continue
                form.add_error('is_main', "Хотя бы один элемент галереи должен быть отмечен как главный.")

        if len(main_forms) > 1:
            # Ошибка «несколько главных фото» — добавить ошибку к полю is_main у всех отмеченных форм
            error = ValidationError("Должен быть только один элемент галереи с отметкой 'Главное фото'.")
            for form in main_forms:
                form.add_error('is_main', error)


class GalleryInlineForm(forms.ModelForm):
    class Meta:
        model = GallerySubDiscipline
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


class GalleryInline(TabularInline):
    model = GallerySubDiscipline
    form = GalleryInlineForm
    formset = GalleryInlineFormSet  # <- важно добавить formset сюда
    min_num = 1
    extra = 0
    fields = ['format_type', 'image', 'video_url', 'is_main']
    verbose_name = 'Элемент галереи'
    verbose_name_plural = 'Галерея'

    class Media:
        js = ('js/inline_format_type.js',)


@admin.register(Discipline)
class DisciplineAdmin(LinkToDetailMixin, ModelAdmin):
    """
    Класс администратора для модели Discipline.
    """
    fields = [
        'name', 'first_image', 'second_image', 'first_description',
        'second_description', 'created_at', 'updated_at'
    ]
    list_display = ['link_to_detail', 'name', 'created_at', 'updated_at']
    readonly_fields = ['created_at', 'updated_at', 'link_to_detail']
    search_fields = ['name']


@admin.register(SubDiscipline)
class SubDisciplineAdmin(LinkToDetailMixin, ModelAdmin):
    """
    Класс администратора для модели SubDiscipline.
    """
    fields = [
        'name', 'description', 'main_page_info',
        'image', 'discipline', 'created_at', 'updated_at'
    ]
    list_display = ['link_to_detail', 'name', 'created_at', 'updated_at']
    readonly_fields = ['created_at', 'updated_at', 'link_to_detail']
    search_fields = ['name']
    compressed_fields = True
    inlines = [GalleryInline]
