from rest_framework.routers import SimpleRouter

from events.views.event import EventViewSet, EventRegistrationViewSet, TypeEventViewSet

router = SimpleRouter()
router.register('events', EventViewSet, basename = 'events')
router.register('type-event', TypeEventViewSet, basename = 'type-event')
router.register(
    'registration-for-the-event',
    EventRegistrationViewSet,
    basename = 'registration-for-the-event'
)
