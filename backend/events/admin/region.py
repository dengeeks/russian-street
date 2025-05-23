from django.contrib import admin

from events.models.region import Region, Location, City
from unfold.admin import ModelAdmin


@admin.register(Region)
class RegionAdmin(ModelAdmin):
    """
    Класс администратора для модели Region.
    """
    pass
@admin.register(Location)
class LocationAdmin(ModelAdmin):
    """
    Класс администратора для модели Location.
    """
    pass


@admin.register(City)
class CityAdmin(ModelAdmin):
    """
    Класс администратора для модели City.
    """
    pass