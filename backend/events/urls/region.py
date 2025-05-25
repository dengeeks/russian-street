from rest_framework.routers import SimpleRouter

from events.views.region import RegionViewSet, CityViewSet

router = SimpleRouter()

router.register('city', CityViewSet, basename = 'city')
router.register('region', RegionViewSet, basename = 'region')
