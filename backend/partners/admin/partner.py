from django.contrib import admin
from unfold.admin import ModelAdmin

from partners.models.partner import Partner


@admin.register(Partner)
class PartnerAdmin(ModelAdmin):
    """
    Класс администратора для модели Partner.
    """
    pass
