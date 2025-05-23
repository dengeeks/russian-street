from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import mixins, viewsets

from events.models.event import Event, TypeEvent, EventRegistration
from events.serializers.event import (EventSerializer, EventSmallReadSerializer, TypeEventSerializer,
                                      EventRegistrationSerializer)
from users.permissions import IsAdminOrReadOnly, IsAdminOrCreateOnly


class EventViewSet(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    permission_classes = (IsAdminOrReadOnly,)
    filter_backends = (DjangoFilterBackend,)
    filterset_fields = (
        'discipline',
        'start_datetime',
        'location__city',
        'location__region',
        'discipline',
        'sub_discipline',
    )

    def get_queryset(self):
        return Event.objects.filter(is_moderation = True)

    def get_serializer_class(self):
        if self.action == 'list':
            return EventSmallReadSerializer
        if self.action == 'retrieve':
            return EventSerializer
        return EventSerializer

    def perform_create(self, serializer):
        serializer.save(author = self.request.user)


class TypeEventViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet
    ):
    queryset = TypeEvent.objects.all()
    permission_classes = (IsAdminOrReadOnly,)
    serializer_class = TypeEventSerializer
    filter_backends = (DjangoFilterBackend,)


class EventRegistrationViewSet(viewsets.ModelViewSet):
    queryset = EventRegistration.objects.all()
    serializer_class = EventRegistrationSerializer
    permission_classes = (IsAdminOrCreateOnly,)
    filter_backends = (DjangoFilterBackend,)
    filterset_fields = ('user', 'event')

    def perform_create(self, serializer):
        serializer.save(user = self.request.user)
