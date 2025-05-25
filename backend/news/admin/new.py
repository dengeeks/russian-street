from django.contrib import admin
from unfold.admin import ModelAdmin

from news.admin.gallery_new import NewsImageInline
from news.models.new import News


@admin.register(News)
class NewsAdmin(ModelAdmin):
    """
    Конфигурация модели News для административной панели.
    """
    list_display = [
        'id',
        'title',
        'created_at',
    ]

    list_filter = ('title', 'category')
    inlines = [NewsImageInline]
