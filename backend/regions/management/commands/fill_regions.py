import json
import os
import random
import tempfile
import urllib.request

from django.core.files import File
from django.core.management.base import BaseCommand

from regions.models.region import Region
from users.models.user import UserAccount


class Command(BaseCommand):
    help = "Импортирует регионы из JSON-файла (regions.json)"

    DEFAULT_IMAGE_URLS = [
        "https://images.unsplash.com/photo-1749909902516-786d8d846193?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxODY2Nzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTE2MjIyNTd8&ixlib=rb-4.1.0&q=80&w=1080",
    ]

    def add_arguments(self, parser):
        parser.add_argument(
            '--json',
            type = str,
            default = 'regions.json',
            help = 'Путь до JSON-файла со списком регионов',
        )

    def handle(self, *args, **options):
        json_path = options['json']

        if not os.path.exists(json_path):
            self.stderr.write(f"❌ Файл {json_path} не найден.")
            return

        try:
            manager = UserAccount.objects.first()
        except UserAccount.DoesNotExist:
            self.stderr.write(f"❌ Менеджер с id={manager_id} не найден.")
            return

        with open(json_path, encoding = 'utf-8') as f:
            regions = json.load(f)

        created = 0
        skipped = 0

        for region_data in regions:
            code = str(region_data["code"]).strip()
            name = region_data["name"].strip()

            if Region.objects.filter(code = code).exists():
                skipped += 1
                continue

            image_url = random.choice(self.DEFAULT_IMAGE_URLS)
            tmp_file = tempfile.NamedTemporaryFile(delete = True)

            try:
                with urllib.request.urlopen(image_url) as response:
                    tmp_file.write(response.read())
                    tmp_file.flush()

                region = Region(
                    name = name,
                    code = code,
                    manager = manager,
                    info = f"Регион {name}"
                )
                region.image.save(f"{code}.png", File(tmp_file), save = True)
                created += 1
                self.stdout.write(f"✅ Добавлен регион: {name}")
            except Exception as e:
                self.stderr.write(f"⚠️ Ошибка при создании региона {name}: {e}")

        self.stdout.write(self.style.SUCCESS(f"\nГотово. Добавлено: {created}, пропущено: {skipped}"))
