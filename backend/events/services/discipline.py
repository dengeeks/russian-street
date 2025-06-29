from django.db.models import Prefetch

from events.models.discipline import Discipline, SubDiscipline


class FilterService:

    @staticmethod
    def _get_model_queryset(model_class, region_id = None):
        """Базовый queryset с фильтрацией по региону"""
        qs = model_class.objects.all()
        if region_id:
            qs = qs.filter(region_id = region_id)
        return qs

    @staticmethod
    def get_structured_options_for_model(model_class, region_id = None):
        """
        Возвращает структурированные данные для конкретной модели
        Новый формат: [
            {
                'discipline': {id, name},
                'subdisciplines': [{id, name}, ...]
            }, ...
        ]
        """
        model_qs = FilterService._get_model_queryset(model_class, region_id)

        # Получаем только нужные дисциплины и поддисциплины
        discipline_ids = model_qs.values_list('discipline_id', flat = True).distinct()
        subdiscipline_ids = model_qs.values_list('sub_discipline_id', flat = True).distinct()

        # Оптимальный запрос с prefetch
        disciplines = Discipline.objects.filter(
            id__in = discipline_ids
        ).prefetch_related(
            Prefetch(
                'sub_disciplines',
                queryset = SubDiscipline.objects.filter(id__in = subdiscipline_ids),
                to_attr = 'relevant_subdisciplines'
            )
        ).only('id', 'name')

        # Формируем результат с группировкой
        result = []
        for d in disciplines:
            discipline_entry = {
                'discipline': {
                    'id': str(d.id),
                    'name': d.name
                },
                'subdisciplines': [
                    {
                        'id': str(sd.id),
                        'name': sd.name
                    }
                    for sd in d.relevant_subdisciplines
                ]
            }
            result.append(discipline_entry)

        return result


# api/services/discipline_service.py


class SubDisciplineService:
    @staticmethod
    def get_subdisciplines_for_list():
        """Получение списка поддисциплин для главной страницы"""
        return SubDiscipline.objects.select_related('discipline').all()

    @staticmethod
    def get_subdiscipline_detail(pk):
        """Получение детальной информации о поддисциплине"""
        return (
            SubDiscipline.objects
            .select_related('discipline')
            .prefetch_related('gallery_items')
            .get(pk = pk)
        )