from django.urls import path

from regions.views.region import StructuredRegionCityAPI

urlpatterns = [
    # получение регионов с фильтрами
    path('filter/region/', StructuredRegionCityAPI.as_view()),
]
