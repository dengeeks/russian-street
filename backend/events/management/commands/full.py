# management/commands/generate_test_data.py
import random
import uuid
from datetime import timedelta
from django.core.files import File
from django.core.management.base import BaseCommand
from django.utils import timezone
from faker import Faker
from events.models.base import EventActivityType, AreaType
from events.models.discipline import Discipline, SubDiscipline, GallerySubDiscipline
from events.models.event import Event
from regions.models.region import Region, City
from users.models.user import UserAccount

fake = Faker('ru_RU')


class Command(BaseCommand):
    help = 'Generates test data with all uniqueness constraints'

    def handle(self, *args, **options):
        self.stdout.write("Starting data generation...")

        # 1. Create required manager user first
        manager, _ = UserAccount.objects.get_or_create(
            email = 'test_manager@example.com',
            defaults = {
                'first_name': 'Test',
                'last_name': 'Manager',
                'is_active': True
            }
        )

        # 2. Create sample image
        image_path = self._create_sample_image()

        # 3. Create regions and cities (unique name and code for regions)
        regions = self._create_regions_and_cities(image_path, manager)

        # 4. Create event types (unique name)
        event_types = self._create_event_types()
        area_types = self._create_area_types()

        # 5. Create disciplines (unique name) with subdisciplines (unique per discipline)
        disciplines = self._create_disciplines(image_path)

        # 6. Create events (service_id is unique)
        self._create_events(disciplines, regions, event_types, image_path)

        self.stdout.write(self.style.SUCCESS("Data generation completed successfully!"))

    def _create_sample_image(self):
        """Create a simple placeholder image that will be reused"""
        from PIL import Image
        import tempfile

        img = Image.new('RGB', (100, 100), color = 'gray')
        temp_file = tempfile.NamedTemporaryFile(suffix = '.jpg', delete = False)
        img.save(temp_file, 'JPEG')
        temp_file.close()
        return temp_file.name

    def _create_regions_and_cities(self, image_path, manager):
        """Create regions with unique names and codes"""
        regions = []
        used_codes = set()

        for i in range(10):
            # Generate unique region code
            while True:
                code = str(random.randint(10, 99))
                if code not in used_codes:
                    used_codes.add(code)
                    break

            # Generate unique region name
            while True:
                name = fake.region()
                if not Region.objects.filter(name = name).exists():
                    break

            with open(image_path, 'rb') as img:
                region = Region.objects.create(
                    name = name,
                    code = code,
                    info = fake.text(),
                    manager = manager
                )
                region.image.save(f'region_{i}.jpg', File(img), save = True)
                regions.append(region)

                # Create 3 unique cities per region
                for j in range(3):
                    while True:
                        city_name = fake.city()
                        if not City.objects.filter(name = city_name).exists():
                            break

                    City.objects.create(
                        name = city_name,
                        region = region
                    )
        return regions

    def _create_event_types(self):
        """Create event types with unique names"""
        types = ["Соревнование", "Фестиваль", "Мастер-класс"]
        return [EventActivityType.objects.get_or_create(name = t)[0] for t in types]

    def _create_area_types(self):
        """Create area types with unique names"""
        types = ["Скейт-парк", "Воркаут", "БМХ трасса"]
        return [AreaType.objects.get_or_create(name = t)[0] for t in types]

    def _create_disciplines(self, image_path):
        """Create disciplines with unique names and subdisciplines with unique names per discipline"""
        disciplines = []

        for i in range(10):
            # Generate unique discipline name
            while True:
                name = fake.word().capitalize()
                if not Discipline.objects.filter(name = name).exists():
                    break

            with open(image_path, 'rb') as img:
                disc = Discipline.objects.create(
                    name = name,
                    description = fake.text()
                )
                disc.first_image.save(f'disc_{i}_1.jpg', File(img), save = True)
                disc.second_image.save(f'disc_{i}_2.jpg', File(img), save = True)
                disciplines.append(disc)

                # Create 30 unique subdisciplines per discipline
                for j in range(30):
                    while True:
                        sub_name = f"{disc.name} {fake.word()}"
                        if not SubDiscipline.objects.filter(name = sub_name, discipline = disc).exists():
                            break

                    with open(image_path, 'rb') as sub_img:
                        sub = SubDiscipline.objects.create(
                            name = sub_name,
                            description = fake.text(),
                            main_page_info = fake.sentence(),
                            discipline = disc
                        )
                        sub.image.save(f'sub_{i}_{j}.jpg', File(sub_img), save = True)

                        # Add gallery images
                        for k in range(3):
                            with open(image_path, 'rb') as gal_img:
                                gal = GallerySubDiscipline.objects.create(
                                    subdiscipline = sub,
                                    is_main = (k == 0),
                                    format_type = 'image'
                                )
                                gal.image.save(f'gal_{i}_{j}_{k}.jpg', File(gal_img), save = True)
        return disciplines

    def _create_events(self, disciplines, regions, event_types, image_path):
        """Create events with unique service_id"""
        cities = City.objects.all()
        short_iframe = '<iframe src="https://yandex.ru/maps" width="600" height="450"></iframe>'
        used_service_ids = set()

        for i in range(10000):
            # Generate unique service_id
            while True:
                service_id = str(uuid.uuid4())
                if service_id not in used_service_ids:
                    used_service_ids.add(service_id)
                    break

            region = random.choice(regions)
            city = random.choice(cities.filter(region = region))
            disc = random.choice(disciplines)
            sub = random.choice(disc.sub_disciplines.all())
            etype = random.choice(event_types)

            start = timezone.now() + timedelta(days = random.randint(1, 365))
            end = start + timedelta(days = random.randint(1, 3))

            with open(image_path, 'rb') as img:
                event = Event.objects.create(
                    title = f"Event {i}",
                    description = fake.text(),
                    address = fake.street_address(),
                    yandex_address = short_iframe,
                    region = region,
                    city = city,
                    discipline = disc,
                    sub_discipline = sub,
                    type = etype,
                    is_our_project = random.choice([True, False]),
                    is_priority = random.choice([True, False]),
                    service_id = service_id,
                    starting_date = start,
                    ending_date = end
                )
                event.image.save(f'event_{i}.jpg', File(img), save = True)