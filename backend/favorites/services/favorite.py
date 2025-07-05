from django.contrib.contenttypes.models import ContentType
from django.core.exceptions import ObjectDoesNotExist

from events.models.area import Area
from events.models.event import Event
from favorites.models.favorite import FavoriteObject


class FavoriteToggleService:
    MODEL_MAPPING = {
        'event': Event,
        'area': Area,
    }

    @classmethod
    def toggle(cls, user, model_type: str, object_id):
        model = cls.MODEL_MAPPING.get(model_type)
        if not model:
            raise ValueError('Неверный тип объекта.')

        try:
            instance = model.objects.get(id = object_id)
        except model.DoesNotExist:
            raise ObjectDoesNotExist('Объект не найден.')

        content_type = ContentType.objects.get_for_model(model)
        favorite_qs = FavoriteObject.objects.filter(
            user = user,
            content_type = content_type,
            object_id = instance.id
        )

        if favorite_qs.exists():
            favorite_qs.delete()
            return {'is_favorite': False, 'message': 'Удалено из избранного.'}
        else:
            FavoriteObject.objects.create(
                user = user,
                content_type = content_type,
                object_id = object_id
            )
            return {'is_favorite': True, 'message': 'Добавлено в избранное.'}
