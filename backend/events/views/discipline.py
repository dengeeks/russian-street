from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import mixins, viewsets

from events.models.discipline import Discipline, SubDiscipline
from events.serializers.discipline import DisciplineSerializer, SubDisciplineSerializer
from users.permissions import IsAdminOrReadOnly


class DisciplineViewSet(mixins.ListModelMixin,
                        mixins.RetrieveModelMixin,
                        viewsets.GenericViewSet):
    queryset = Discipline.objects.all()
    permission_classes = (IsAdminOrReadOnly,)
    serializer_class = DisciplineSerializer
    filter_backends = (DjangoFilterBackend,)


class SubDisciplineViewSet(mixins.ListModelMixin,
                           mixins.RetrieveModelMixin,
                           viewsets.GenericViewSet):
    queryset = SubDiscipline.objects.all()
    permission_classes = (IsAdminOrReadOnly,)
    serializer_class = SubDisciplineSerializer
    filter_backends = (DjangoFilterBackend,)