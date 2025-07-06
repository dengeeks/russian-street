import os
import random
from datetime import timedelta

from django.core.files import File
from django.core.management.base import BaseCommand
from django.db import transaction
from django.utils import timezone
from django.utils.timezone import now

from events.models.area import Area, AreaType
from events.models.base import EventActivityType
from events.models.discipline import Discipline, SubDiscipline
from events.models.event import Event
from regions.models.region import Region


class Command(BaseCommand):
    help = 'Создаёт типы мероприятий, площадок и 10к событий с рандомными регионами/городами и медиа'

    # Список медиа для случайного выбора (путь к локальному файлу или URL видео)
    MEDIA_ITEMS = [
        {'type': 'image', 'path': 'back_media/default_region/Yakutia-3.jpg'},
        {'type': 'video_url', 'url': 'https://youtu.be/xbqVWZD-sfI?si=zVm3cugRcWjb3Nan'},
    ]

    # Путь к одному локальному изображению для поля card_image (одинаковое для всех объектов)
    CARD_IMAGE_PATH = 'back_media/default_region/Yakutia-3.jpg'

    def get_random_media(self):
        """Случайно выбирает элемент из MEDIA_ITEMS."""
        return random.choice(self.MEDIA_ITEMS)

    def prepare_media_field(self, obj):
        """Заполняет поля MediaContentMixin у объекта и card_image."""
        media = self.get_random_media()

        if media['type'] == 'video_url':
            obj.format_type = 'video_url'
            obj.video_url = media['url']
            obj.image = None
        else:
            obj.format_type = 'image'
            obj.video_url = ''
            with open(media['path'], 'rb') as f:
                obj.image.save(os.path.basename(media['path']), File(f), save = False)

        # Всегда сохраняем в card_image один и тот же локальный файл
        with open(self.CARD_IMAGE_PATH, 'rb') as f_card:
            obj.card_image.save(os.path.basename(self.CARD_IMAGE_PATH), File(f_card), save = False)

    @transaction.atomic
    def handle(self, *args, **options):
        # Проверка наличия файлов изображений для MEDIA_ITEMS и CARD_IMAGE_PATH
        for item in self.MEDIA_ITEMS:
            if item['type'] == 'image':
                if not os.path.isfile(item['path']):
                    self.stderr.write(self.style.ERROR(f"Файл изображения не найден: {item['path']}"))
                    return

        if not os.path.isfile(self.CARD_IMAGE_PATH):
            self.stderr.write(self.style.ERROR(f"Файл для card_image не найден: {self.CARD_IMAGE_PATH}"))
            return

        # Создаём типы мероприятий
        event_types = ['Концерт', 'Турнир', 'Фестиваль', 'Выставка', 'Мастер-класс']
        for etype in event_types:
            obj, created = EventActivityType.objects.get_or_create(name = etype)
            if created:
                self.stdout.write(f"Создан тип мероприятия: {etype}")

        # Создаём типы площадок
        area_types = ['Стадион', 'Площадка', 'Зал', 'Улица', 'Клуб']
        for atype in area_types:
            obj, created = AreaType.objects.get_or_create(name = atype)
            if created:
                self.stdout.write(f"Создан тип площадки: {atype}")

        # Получаем регионы с городами
        regions = Region.objects.prefetch_related('cities').all()
        if not regions.exists():
            self.stderr.write(self.style.ERROR("В базе нет регионов"))
            return

        disciplines = list(Discipline.objects.all())
        if not disciplines:
            self.stderr.write(self.style.ERROR("В базе нет дисциплин"))
            return

        subdiscipline_map = {}
        for discipline in disciplines:
            subdiscipline_map[discipline.id] = list(SubDiscipline.objects.filter(discipline = discipline))

        event_type_objs = list(EventActivityType.objects.all())
        area_type_objs = list(AreaType.objects.all())

        self.stdout.write("Начинаем генерацию мероприятий и площадок...")

        events_to_create = []
        areas_to_create = []
        batch_size = 1000

        for i in range(10000):
            region = random.choice(regions)
            cities = list(region.cities.all())
            if not cities:
                continue
            city = random.choice(cities)

            discipline = random.choice(disciplines)
            subs = subdiscipline_map.get(discipline.id)
            if not subs:
                continue
            subdiscipline = random.choice(subs)

            event = Event(
                title = 'Фестиваль уличного искусства и спортивных активностей',
                description = """
                        <p><s><u>Это направление представляет собой уникальное сочетание традиций и современных тенденций, отражающих дух уличной культуры. Оно объединяет в себе элементы самовыражения, творчества и социальной активности, позволяя каждому участнику раскрыть свои способности и найти своё место в сообществе. Направление характеризуется высокой энергией, динамикой и непрерывным развитием, что делает его привлекательным для людей всех возрастов и уровней подготовки. Здесь важна не только техника и мастерство, но и внутреннее состояние, свобода мысли и желание влиять на окружающий мир. Участники активно взаимодействуют друг с другом, обмениваются опытом и создают атмосферу поддержки и вдохновения, способствуя распространению культуры в самых разных уголках города и мира.</u></s></p>

<p><u>Это направление представляет собой уникальное сочетание традиций и современных тенденций, отражающих дух уличной культуры. Оно объединяет в себе элементы самовыражения, творчества и социальной активности, позволяя каждому участнику раскрыть свои способности и найти своё место в сообществе. Направление характеризуется высокой энергией, динамикой и непрерывным развитием, что делает его привлекательным для людей всех возрастов и уровней подготовки. Здесь важна не только техника и мастерство, но и внутреннее состояние, свобода мысли и желание влиять на окружающий мир. Участники активно взаимодействуют друг с другом, обмениваются опытом и создают атмосферу поддержки и вдохновения, способствуя распространению культуры в самых разных уголках города и мира.</u></p>

<p><strong>Это направление представляет собой уникальное сочетание традиций и современных тенденций, отражающих дух уличной культуры. Оно объединяет в себе элементы самовыражения, творчества и социальной активности, позволяя каждому участнику раскрыть свои способности и найти своё место в сообществе. Направление характеризуется высокой энергией, динамикой и непрерывным развитием, что делает его привлекательным для людей всех возрастов и уровней подготовки. Здесь важна не только техника и мастерство, но и внутреннее состояние, свобода мысли и желание влиять на окружающий мир. Участники активно взаимодействуют друг с другом, обмениваются опытом и создают атмосферу поддержки и вдохновения, способствуя распространению культуры в самых разных уголках города и мира.</strong></p>""",
                address = 'проспект Мира, дом 56, корпус 2, этаж 3, г. Санкт-Петербург',
                yandex_address = '<iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A2bbf3c784c191deebd0e5643f11b3cdd8c454a2ca4af210b29bbbcfde3a887d6&amp;source=constructor" width="500" height="400" frameborder="0"></iframe>',
                region = region,
                city = city,
                discipline = discipline,
                sub_discipline = subdiscipline,
                type = random.choice(event_type_objs),
                starting_date = timezone.now(),
                ending_date = timezone.now() + timedelta(days=30)
            )
            self.prepare_media_field(event)
            events_to_create.append(event)

            area = Area(
                title = 'Фестиваль уличного искусства и спортивных активностей',
                description = """
                        <p><s><u>Это направление представляет собой уникальное сочетание традиций и современных тенденций, отражающих дух уличной культуры. Оно объединяет в себе элементы самовыражения, творчества и социальной активности, позволяя каждому участнику раскрыть свои способности и найти своё место в сообществе. Направление характеризуется высокой энергией, динамикой и непрерывным развитием, что делает его привлекательным для людей всех возрастов и уровней подготовки. Здесь важна не только техника и мастерство, но и внутреннее состояние, свобода мысли и желание влиять на окружающий мир. Участники активно взаимодействуют друг с другом, обмениваются опытом и создают атмосферу поддержки и вдохновения, способствуя распространению культуры в самых разных уголках города и мира.</u></s></p>

<p><u>Это направление представляет собой уникальное сочетание традиций и современных тенденций, отражающих дух уличной культуры. Оно объединяет в себе элементы самовыражения, творчества и социальной активности, позволяя каждому участнику раскрыть свои способности и найти своё место в сообществе. Направление характеризуется высокой энергией, динамикой и непрерывным развитием, что делает его привлекательным для людей всех возрастов и уровней подготовки. Здесь важна не только техника и мастерство, но и внутреннее состояние, свобода мысли и желание влиять на окружающий мир. Участники активно взаимодействуют друг с другом, обмениваются опытом и создают атмосферу поддержки и вдохновения, способствуя распространению культуры в самых разных уголках города и мира.</u></p>

<p><strong>Это направление представляет собой уникальное сочетание традиций и современных тенденций, отражающих дух уличной культуры. Оно объединяет в себе элементы самовыражения, творчества и социальной активности, позволяя каждому участнику раскрыть свои способности и найти своё место в сообществе. Направление характеризуется высокой энергией, динамикой и непрерывным развитием, что делает его привлекательным для людей всех возрастов и уровней подготовки. Здесь важна не только техника и мастерство, но и внутреннее состояние, свобода мысли и желание влиять на окружающий мир. Участники активно взаимодействуют друг с другом, обмениваются опытом и создают атмосферу поддержки и вдохновения, способствуя распространению культуры в самых разных уголках города и мира.</strong></p>""",
                address = 'проспект Мира, дом 56, корпус 2, этаж 3, г. Санкт-Петербург',
                yandex_address = '<iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A2bbf3c784c191deebd0e5643f11b3cdd8c454a2ca4af210b29bbbcfde3a887d6&amp;source=constructor" width="500" height="400" frameborder="0"></iframe>',
                region = region,
                city = city,
                discipline = discipline,
                sub_discipline = subdiscipline,
                type = random.choice(area_type_objs),
            )
            self.prepare_media_field(area)
            areas_to_create.append(area)

            if len(events_to_create) >= batch_size:
                Event.objects.bulk_create(events_to_create)
                self.stdout.write(f"Создано мероприятий: {len(events_to_create)}")
                events_to_create.clear()

            if len(areas_to_create) >= batch_size:
                Area.objects.bulk_create(areas_to_create)
                self.stdout.write(f"Создано площадок: {len(areas_to_create)}")
                areas_to_create.clear()

        if events_to_create:
            Event.objects.bulk_create(events_to_create)
            self.stdout.write(f"Создано мероприятий: {len(events_to_create)}")

        if areas_to_create:
            Area.objects.bulk_create(areas_to_create)
            self.stdout.write(f"Создано площадок: {len(areas_to_create)}")

        self.stdout.write(self.style.SUCCESS("Генерация завершена."))
