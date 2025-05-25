from rest_framework.routers import SimpleRouter

from partners.views.partner import PartherViewSet

router = SimpleRouter()
router.register('partners', PartherViewSet, basename = 'parthers')
