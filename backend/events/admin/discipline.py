from django.contrib import admin

from unfold.admin import ModelAdmin
from events.models.discipline import SubDiscipline, Discipline


@admin.register(Discipline)
class DisciplineAdmin(ModelAdmin):
    """
    Класс администратора для модели Discipline.
    """
    pass


@admin.register(SubDiscipline)
class SubDisciplineAdmin(ModelAdmin):
    """
    Класс администратора для модели SubDiscipline.
    """
    pass