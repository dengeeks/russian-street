from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets

from partners.models.partner import Partner
from partners.serializers.partner import PartnerSerializer
from users.permissions import IsAdminOrReadOnly


class PartherViewSet(viewsets.ModelViewSet):
    queryset = Partner.objects.all()
    serializer_class = PartnerSerializer
    permission_classes = (IsAdminOrReadOnly,)
    filter_backends = (DjangoFilterBackend,)
    filterset_fields = ('name',)
