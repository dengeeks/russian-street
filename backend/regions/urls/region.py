from django.urls import path

from regions.views.region import StructuredRegionCityAPI, RegionStatsAPI

urlpatterns = [
    # получение регионов с фильтрами
    path('filter/region/', StructuredRegionCityAPI.as_view()),
    # регионы для карты
    path('list/map-region/', RegionStatsAPI.as_view()),
]
