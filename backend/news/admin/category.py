from django.contrib import admin
from unfold.admin import ModelAdmin

from news.models.category import Category


@admin.register(Category)
class CategoryAdmin(ModelAdmin):
    """
    Конфигурация модели Category для административной панели.
    """
    list_display = ['name']
    list_filter = ('name', )