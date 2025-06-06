from django.contrib import admin
from unfold.admin import ModelAdmin

from contents.models.homepage import (PromotionalVideo, OrganizationInfo, MissionAndGoalsImage, MissionAndGoalsText,
                                      StreetIsUsImage, AboutUs)


@admin.register(PromotionalVideo)
class PromotionalVideoAdmin(ModelAdmin):
    """
    Класс администратора для модели PromotionalVideo.
    """
    pass


@admin.register(StreetIsUsImage)
class StreetIsUsImageAdmin(ModelAdmin):
    """
    Класс администратора для модели StreetIsUsImage.
    """
    pass


@admin.register(AboutUs)
class AboutUsAdmin(ModelAdmin):
    """
    Класс администратора для модели AboutUs.
    """
    pass


@admin.register(MissionAndGoalsText)
class MissionAndGoalsTextAdmin(ModelAdmin):
    """
    Класс администратора для модели MissionAndGoalsText.
    """
    pass


@admin.register(MissionAndGoalsImage)
class MissionAndGoalsImageAdmin(ModelAdmin):
    """
    Класс администратора для модели MissionAndGoalsImage.
    """
    pass


@admin.register(OrganizationInfo)
class OrganizationInfoAdmin(ModelAdmin):
    """
    Класс администратора для модели OrganizationInfo.
    """
    pass
