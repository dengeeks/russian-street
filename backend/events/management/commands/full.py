from random import choice

from django.core.management.base import BaseCommand
from faker import Faker

from events.models.discipline import Discipline, SubDiscipline
from events.models.event import Event
from regions.models.region import Region, City

fake = Faker('ru_RU')


class Command(BaseCommand):
    help = 'Генерирует случайные мероприятия (Event)'

    def add_arguments(self, parser):
        parser.add_argument('count', type = int, help = 'Количество мероприятий для генерации')

    def handle(self, *args, **options):
        count = options['count']

        regions = list(Region.objects.all())
        cities = list(City.objects.all())
        disciplines = list(Discipline.objects.all())
        sub_disciplines = list(SubDiscipline.objects.all())

        if not all([regions, cities, disciplines, sub_disciplines]):
            self.stdout.write(
                self.style.ERROR('Не хватает связанных данных: регионов, городов, дисциплин или поддисциплин.')
                )
            return

        events = []

        for _ in range(count):
            format_type = choice(['image', 'video_url'])

            event = Event(
                title = fake.sentence(nb_words = 4),
                description = fake.text(max_nb_chars = 800),
                format_type = format_type,
                video_url = fake.uri() if format_type == 'video_url' else None,
                image = None if format_type == 'video_url' else 'default.jpg',
                address = fake.address(),
                yandex_address = '<iframe src="https://yandex.ru/map-widget/v1/..." width="560" height="400"></iframe>',
                region = choice(regions),
                city = choice(cities),
                discipline = choice(disciplines),
                sub_discipline = choice(sub_disciplines),
                is_moderation = choice([True, False]),
                is_our_project = choice([True, False]),
                is_priority = choice([True, False]),
                service_id = fake.slug()
            )
            events.append(event)

        Event.objects.bulk_create(events, batch_size = 100)
        self.stdout.write(self.style.SUCCESS(f'Успешно создано {count} мероприятий.'))
