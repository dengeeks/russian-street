from django.contrib import admin
from unfold.admin import ModelAdmin

from contents.models.everyone_likes import EveryoneLikes


@admin.register(EveryoneLikes)
class EveryoneLikesAdmin(ModelAdmin):
    """
    Класс администратора для модели EveryoneLikes.
    """
    pass
