from django.contrib import admin
from unfold.admin import ModelAdmin

from contents.models.cooperation import Cooperation


@admin.register(Cooperation)
class CooperationAdmin(ModelAdmin):
    """
    Класс администратора для модели Cooperation.
    """
    pass