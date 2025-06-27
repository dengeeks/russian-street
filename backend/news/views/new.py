# from django_filters.rest_framework import DjangoFilterBackend
# from rest_framework import viewsets
#
# from news.models.category import Category
# from news.models.new import News
# from news.serializers.new import NewsSerializer, CategorySerializer
# from users.permissions import IsAdminOrReadOnly
#
#
# class NewsViewSet(viewsets.ModelViewSet):
#     queryset = News.objects.all()
#     serializer_class = NewsSerializer
#     permission_classes = (IsAdminOrReadOnly,)
#     filter_backends = (DjangoFilterBackend,)
#     filterset_fields = ('category',)
#
#
# class CategoryViewSet(viewsets.ModelViewSet):
#     queryset = Category.objects.all()
#     serializer_class = CategorySerializer
#     permission_classes = (IsAdminOrReadOnly,)
