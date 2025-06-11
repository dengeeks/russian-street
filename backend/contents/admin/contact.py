from django.contrib import admin
from unfold.admin import ModelAdmin

from common.admin import LinkToDetailMixin, NoAddDeleteMixin, ImagePreviewMixin
from contents.models.contact import ContactFooter, ContactHeader, EmailFooter


@admin.register(ContactFooter)
class ContactFooterAdmin(ImagePreviewMixin, LinkToDetailMixin, ModelAdmin):
    """
    Класс администратора для модели ContactFooter.
    """
    fields = ['url', 'image', 'created_at', 'updated_at']
    list_display = ['link_to_detail', 'url', 'image_preview', 'created_at', 'updated_at']
    readonly_fields = ['link_to_detail', 'image_preview', 'created_at', 'updated_at']


@admin.register(ContactHeader)
class ContactHeaderAdmin(LinkToDetailMixin, NoAddDeleteMixin, ModelAdmin):
    """
    Класс администратора для модели ContactHeader.
    """
    fields = ['youtube', 'telegram', 'vkontakte', 'created_at', 'updated_at']
    list_display = ['link_to_detail', 'youtube', 'telegram', 'vkontakte']
    readonly_fields = ['link_to_detail', 'created_at', 'updated_at']


@admin.register(EmailFooter)
class EmailFooterAdmin(LinkToDetailMixin, NoAddDeleteMixin, ModelAdmin):
    """
    Класс администратора для модели EmailFooter.
    """
    fields = ['email', 'created_at', 'updated_at']
    list_display = ['link_to_detail', 'email', 'created_at', 'updated_at']
    readonly_fields = ['link_to_detail', 'created_at', 'updated_at']
