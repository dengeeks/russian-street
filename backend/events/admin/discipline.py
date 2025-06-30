from django.contrib import admin
from django.core.exceptions import ValidationError
from django.forms import BaseInlineFormSet
from unfold.admin import ModelAdmin, TabularInline

from common.admin import LinkToDetailMixin, MediaContentFormMixin
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


class GalleryForm(MediaContentFormMixin):
    class Meta:
        model = GallerySubDiscipline
        fields = "__all__"


class GalleryInline(TabularInline):
    model = GallerySubDiscipline
    form = GalleryForm
    formset = GalleryInlineFormSet
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
        'name', 'first_image', 'second_image', 'description',
        'created_at', 'updated_at'
    ]
    list_display = ['link_to_detail', 'name', 'created_at', 'updated_at']
    readonly_fields = ['created_at', 'updated_at', 'link_to_detail']
    compressed_fields = True
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
    list_filter = ['discipline']
    readonly_fields = ['created_at', 'updated_at', 'link_to_detail']
    search_fields = ['name']
    compressed_fields = True
    inlines = [GalleryInline]
