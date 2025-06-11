import re

from django.contrib import admin
from django.utils.safestring import mark_safe
from unfold.admin import ModelAdmin

from common.admin import NoAddDeleteMixin, LinkToDetailMixin, ImagePreviewMixin
from contents.models.homepage import (
    PromotionalVideo,
    OrganizationInfo,
    MissionAndGoalsImage,
    MissionAndGoalsText,
    StreetIsUsImage,
    AboutUs
)


@admin.register(PromotionalVideo)
class PromotionalVideoAdmin(LinkToDetailMixin, NoAddDeleteMixin, ModelAdmin):
    """
    Класс администратора для модели PromotionalVideo.
    """
    fields = ['video_preview', 'video_url', 'created_at', 'updated_at']
    list_display = ['link_to_detail', 'video_preview', 'video_url', 'created_at', 'updated_at']
    readonly_fields = ['video_preview', 'link_to_detail', 'created_at', 'updated_at']

    def video_preview(self, obj):
        """
        Отображение iframe с видео.
        """
        if obj.video_url:
            iframe = obj.video_url

            # Заменим width и height в iframe, если они есть
            iframe = re.sub(r'width="\d+"', 'width="320"', iframe)
            iframe = re.sub(r'height="\d+"', 'height="180"', iframe)

            return mark_safe(iframe)
        return '-'

    video_preview.short_description = 'Превью видео'


@admin.register(StreetIsUsImage)
class StreetIsUsImageAdmin(ImagePreviewMixin, NoAddDeleteMixin, LinkToDetailMixin, ModelAdmin):
    """
    Класс администратора для модели StreetIsUsImage.
    """
    fields = ['image', 'created_at', 'updated_at']
    list_display = ['link_to_detail', 'image_preview', 'created_at', 'updated_at']
    readonly_fields = ['image_preview', 'created_at', 'updated_at']
    list_display_links = ['link_to_detail']
    ordering = ['order']


@admin.register(AboutUs)
class AboutUsAdmin(LinkToDetailMixin, NoAddDeleteMixin, ModelAdmin):
    """
    Класс администратора для модели AboutUs.
    """
    fields = ['discipline', 'regions', 'media_publications', 'event', 'person', 'created_at', 'updated_at']
    list_display = ['link_to_detail', 'discipline', 'regions', 'media_publications', 'event', 'person']
    readonly_fields = ['created_at', 'updated_at']


@admin.register(MissionAndGoalsText)
class MissionAndGoalsTextAdmin(LinkToDetailMixin, NoAddDeleteMixin, ModelAdmin):
    """
    Класс администратора для модели MissionAndGoalsText.
    """
    fields = ['mission', 'goal', 'created_at', 'updated_at']
    list_display = ['link_to_detail', 'mission', 'goal', 'created_at', 'updated_at']
    readonly_fields = ['created_at', 'updated_at']


@admin.register(MissionAndGoalsImage)
class MissionAndGoalsImageAdmin(ImagePreviewMixin, NoAddDeleteMixin, LinkToDetailMixin, ModelAdmin):
    """
    Класс администратора для модели MissionAndGoalsImage.
    """
    fields = ['image', 'order', 'created_at', 'updated_at']
    list_display = ['link_to_detail', 'image_preview', 'created_at', 'updated_at']
    readonly_fields = ['image_preview', 'created_at', 'updated_at']
    list_display_links = ['link_to_detail', 'image_preview']


@admin.register(OrganizationInfo)
class OrganizationInfoAdmin(LinkToDetailMixin, NoAddDeleteMixin, ModelAdmin):
    """
    Класс администратора для модели OrganizationInfo.
    """
    fields = ['iframe_yandex_preview', 'iframe', 'address', 'work_time', 'phone', 'email', 'created_at', 'updated_at']
    list_display = ['link_to_detail', 'iframe_yandex_preview', 'address', 'phone', 'work_time', 'email']
    readonly_fields = ['iframe_yandex_preview', 'link_to_detail', 'created_at', 'updated_at']

    def iframe_yandex_preview(self, obj):
        """
        Отображение iframe с видео.
        """
        if obj.iframe:
            iframe = obj.iframe

            # Заменим width и height в iframe, если они есть
            iframe = re.sub(r'width="\d+"', 'width="320"', iframe)
            iframe = re.sub(r'height="\d+"', 'height="320"', iframe)

            return mark_safe(iframe)
        return '-'

    iframe_yandex_preview.short_description = 'Превью Яндекс.Карт'
