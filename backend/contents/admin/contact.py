from django.contrib import admin
from unfold.admin import ModelAdmin

from contents.models.contact import ContactFooter, ContactHeader, EmailFooter


@admin.register(ContactFooter)
class ContactFooterAdmin(ModelAdmin):
    """
    Класс администратора для модели ContactFooter.
    """
    pass


@admin.register(ContactHeader)
class ContactHeaderAdmin(ModelAdmin):
    """
    Класс администратора для модели ContactHeader.
    """
    pass


@admin.register(EmailFooter)
class EmailFooterAdmin(ModelAdmin):
    """
    Класс администратора для модели EmailFooter.
    """
    pass
