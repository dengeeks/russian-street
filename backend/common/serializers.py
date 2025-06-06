from rest_framework import serializers


class BaseExcludeSerializer(serializers.ModelSerializer):
    """
    Базовый сериализатор для моделей домашней страницы, исключающий общие поля.
    """
    class Meta:
        abstract = True
        exclude = ['id', 'created_at', 'updated_at']