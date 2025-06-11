from django.urls import reverse
from django.utils.html import format_html
from django.utils.safestring import mark_safe


class NoAddDeleteMixin:
    """
    Миксин для Django admin, запрещающий добавление и удаление объектов.
    """

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj = None):
        return False


class LinkToDetailMixin:
    """
    Миксин для добавления метода link_to_detail,
    который выводит ссылку на страницу редактирования объекта в админке.
    """

    def link_to_detail(self, obj):
        model_opts = obj._meta
        url = reverse(f'admin:{model_opts.app_label}_{model_opts.model_name}_change', args = [obj.pk])
        return format_html('<a href="{}">Перейти в детали</a>', url)

    link_to_detail.short_description = 'Детали'


class ImagePreviewMixin:
    """
    Миксин для отображения превью изображения по URL (строка) в админке.
    """

    def image_preview(self, obj):
        """
        Возвращает тег <img>, если image_url указан.
        """
        if obj.image.url:  # замените на нужное имя поля, если другое
            return mark_safe(
                f'''
                <a href="{obj.image.url}" target="_blank" style="display: inline-block; text-decoration: none;">
                    <div style="width: 260px; height: 260px; overflow: hidden; border-radius: 8px;">
                        <img src="{obj.image.url}" style="width: 100%; height: 100%; object-fit: cover;" />
                    </div>
                </a>
                '''
            )
        return '-'

    image_preview.short_description = 'Превью изображения'
