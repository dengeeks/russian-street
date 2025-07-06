import json
import os

from django.core.files import File
from django.core.management.base import BaseCommand

from regions.models.region import Region, City


class Command(BaseCommand):
    help = "Импортирует регионы и города из JSON-файла (regions.json)"

    DEFAULT_IMAGE_PATH = 'back_media/default_region/Yakutia-3.jpg'

    def add_arguments(self, parser):
        parser.add_argument(
            '--json',
            type = str,
            default = 'regions.json',
            help = 'Путь до JSON-файла со списком регионов и городов',
        )

    def handle(self, *args, **options):
        json_path = options['json']

        if not os.path.exists(json_path):
            self.stderr.write(f"❌ Файл {json_path} не найден.")
            return

        if not os.path.exists(self.DEFAULT_IMAGE_PATH):
            self.stderr.write(f"❌ Файл изображения {self.DEFAULT_IMAGE_PATH} не найден.")
            return

        with open(json_path, encoding = 'utf-8') as f:
            regions = json.load(f)

        created_regions = 0
        created_cities = 0
        skipped_regions = 0

        for region_data in regions:
            code = str(region_data["code"]).strip()
            name = region_data["name"].strip()
            cities = region_data.get("cities", [])

            if Region.objects.filter(code = code).exists():
                skipped_regions += 1
                continue

            try:
                with open(self.DEFAULT_IMAGE_PATH, 'rb') as image_file:
                    region = Region(
                        name = name,
                        code = code,
                        info = f"Республика Коми — край несметных природных богатств и территория самобытной культуры северных народов. В недрах региона хранятся все элементы таблицы Менделеева. Отсюда берет начало российская нефтяная промышленность. Здесь огромные лесные просторы пересечены сетью полноводных хрустальных рек. \nРеспублику по праву называют родиной лыж. Фрагмент древнейшей лыжи с головой лося можно увидеть в отделе этнографии Национального музея Республики Коми, ее возраст — более 8 тысяч лет.",
                    )
                    region.image.save(f"{code}.jpg", File(image_file), save = True)
                    created_regions += 1
                    self.stdout.write(f"✅ Добавлен регион: {name}")

                for city_name in cities:
                    city_name = city_name.strip()
                    if not City.objects.filter(name = city_name, region = region).exists():
                        City.objects.create(name = city_name, region = region)
                        created_cities += 1
                        self.stdout.write(f"  🏙️  Добавлен город: {city_name}")
                    else:
                        self.stdout.write(f"  ⚠️  Город уже существует: {city_name}")

            except Exception as e:
                self.stderr.write(f"⚠️ Ошибка при создании региона {name}: {e}")

        self.stdout.write(
            self.style.SUCCESS(
                f"\nГотово. Добавлено регионов: {created_regions}, городов: {created_cities}, пропущено регионов: {skipped_regions}"
            )
        )
