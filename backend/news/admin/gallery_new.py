from django.contrib import admin
from unfold.admin import ModelAdmin, TabularInline

from news.models.gallery_new import GalleryNews


class NewsImageInline(TabularInline):
    """
    Inline-модель для административной панели Django,
    предназначенная для отображения и редактирования изображений
    связанных с моделью News.
    """
    model = GalleryNews
    extra = 5


@admin.register(GalleryNews)
class GalleryNewsAdmin(ModelAdmin):
    """
    Конфигурация модели GalleryNews для административной панели.
    """
    list_display = ['news', 'file']
    list_filter = ('news',)
