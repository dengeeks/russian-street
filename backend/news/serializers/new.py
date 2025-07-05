from rest_framework import serializers

from events.models.discipline import GallerySubDiscipline
from news.models.new import New


class GalleryNewSerializer(serializers.ModelSerializer):
    class Meta:
        model = GallerySubDiscipline
        fields = ('id', 'format_type', 'image', 'video_url', 'is_main')

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        print(representation)
        if instance.image:
            representation['image'] = instance.image.url
        return representation


class NewListSerializer(serializers.ModelSerializer):
    card_image = serializers.SerializerMethodField()
    city = serializers.StringRelatedField()

    class Meta:
        model = New
        fields = (
            'id',
            'title',
            'card_image',
            'created_at',
            'city'
        )

    def get_card_image(self, obj):
        if obj.card_image:
            return obj.card_image.url
        return None


class NewDetailSerializer(serializers.ModelSerializer):
    gallery_items = GalleryNewSerializer(many = True)
    city = serializers.StringRelatedField()

    class Meta:
        model = New
        fields = (
            'id',
            'title',
            'description',
            'created_at',
            'city',
            'count_views',
            'gallery_items'
        )
