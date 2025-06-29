from rest_framework import serializers

from events.models.discipline import GallerySubDiscipline, SubDiscipline, Discipline


class GallerySubDisciplineSerializer(serializers.ModelSerializer):
    class Meta:
        model = GallerySubDiscipline
        fields = ('id', 'format_type', 'image', 'video_url', 'is_main')

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.image:
            representation['image'] = instance.image.url
        return representation


class SubDisciplineListSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = SubDiscipline
        fields = ('id', 'name', 'image', 'main_page_info')

    def get_image(self, obj):
        if obj.image:
            return obj.image.url
        return None


class SubDisciplineDetailSerializer(serializers.ModelSerializer):
    gallery_items = GallerySubDisciplineSerializer(many = True)

    class Meta:
        model = SubDiscipline
        fields = ('id', 'name', 'description', 'gallery_items', 'discipline')


class SubDisciplineShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubDiscipline
        fields = ('id', 'name')


class DisciplineListSerializer(serializers.ModelSerializer):
    sub_disciplines = SubDisciplineShortSerializer(
        many = True,
        source = 'sub_disciplines.all',
        read_only = True
    )

    first_image = serializers.SerializerMethodField()
    second_image = serializers.SerializerMethodField()

    class Meta:
        model = Discipline
        fields = (
            'id',
            'name',
            'first_image',
            'second_image',
            'first_description',
            'second_description',
            'sub_disciplines'
        )

    def get_first_image(self, obj):
        if obj.first_image:
            return obj.first_image.url
        return None

    def get_second_image(self, obj):
        if obj.second_image:
            return obj.second_image.url
        return None
