# from django_filters.rest_framework import DjangoFilterBackend
# from rest_framework import mixins, viewsets
#
# from events.models.region import City, Region
# from events.serializers.region import CitySerializer, RegionSerializer
# from users.permissions import IsAdminOrReadOnly
#
#
# class CityViewSet(mixins.ListModelMixin,
#                   mixins.RetrieveModelMixin,
#                   viewsets.GenericViewSet):
#     queryset = City.objects.all()
#     permission_classes = (IsAdminOrReadOnly,)
#     serializer_class = CitySerializer
#     filter_backends = (DjangoFilterBackend,)
#
#
# class RegionViewSet(mixins.ListModelMixin,
#                     mixins.RetrieveModelMixin,
#                     viewsets.GenericViewSet):
#     queryset = Region.objects.all()
#     permission_classes = (IsAdminOrReadOnly,)
#     serializer_class = RegionSerializer
#     filter_backends = (DjangoFilterBackend,)