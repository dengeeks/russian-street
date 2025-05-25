from rest_framework import serializers

from events.models.discipline import SubDiscipline, Discipline


class DisciplineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discipline
        fields = (
            'id',
            'name',
        )


class SubDisciplineSerializer(serializers.ModelSerializer):
    discipline = DisciplineSerializer()

    class Meta:
        model = SubDiscipline
        fields = (
            'id',
            'name',
            'discipline',
        )
