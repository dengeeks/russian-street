from rest_framework import serializers

from events.models.discipline import SubDiscipline


class ListSubDisciplineSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubDiscipline
        fields = [
            'id',
            'name',
            'second_image'
        ]


class SubDisciplineDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubDiscipline
        fields = [
            'id',
            'name',
            'description',
            'format_type',
            'video_url',
            'image',
            'discipline'
        ]
