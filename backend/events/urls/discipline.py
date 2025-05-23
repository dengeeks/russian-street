from rest_framework.routers import SimpleRouter

from events.views.discipline import SubDisciplineViewSet, DisciplineViewSet

router = SimpleRouter()
router.register('discipline', DisciplineViewSet, basename = 'discipline')
router.register(
    'sub-discipline',
    SubDisciplineViewSet,
    basename = 'sub discipline'
)
