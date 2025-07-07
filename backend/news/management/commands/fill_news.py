import random
from pathlib import Path

from django.core.files import File
from django.core.management.base import BaseCommand
from django.utils.text import slugify

from events.models.discipline import SubDiscipline
from news.models.new import New, GalleryNew
from regions.models.region import Region, City

FAKE_IMAGE_PATH = 'back_media/default_region/Yakutia-3.jpg'
VIDEO_URL = "https://youtu.be/xbqVWZD-sfI?si=zVm3cugRcWjb3Nan"

GALLERY_ITEMS = [
    {"type": "image", "path": FAKE_IMAGE_PATH},
    {"type": "image", "path": FAKE_IMAGE_PATH},
    {"type": "image", "path": FAKE_IMAGE_PATH},
    {"type": "image", "path": FAKE_IMAGE_PATH},
    {"type": "video", "url": VIDEO_URL},
]

class Command(BaseCommand):
    help = "Генерация новостей для каждой поддисциплины с изображениями и видео"

    def handle(self, *args, **options):
        if not SubDiscipline.objects.exists():
            self.stdout.write(self.style.ERROR('Нет поддисциплин в базе. Сначала создайте их.'))
            return

        if not Region.objects.exists() or not City.objects.exists():
            self.stdout.write(self.style.ERROR('Нет регионов или городов в базе.'))
            return

        region = Region.objects.first()
        city = City.objects.filter(region=region).order_by('?').first()

        if not city:
            self.stdout.write(self.style.ERROR('В регионе нет города.'))
            return

        for sub in SubDiscipline.objects.all():
            title = f"Новость {sub.name} #{random.randint(1000, 9999)}"
            description = f"<p><strong>Актуальные события из мира {sub.name}!</strong></p>"

            # Создание объекта новости
            new = New.objects.create(
                title=title,
                description=description,
                subdiscipline=sub,
                region=region,
                city=city,
                count_views=random.randint(0, 1000),
            )

            # Загрузка изображения для карточки
            if Path(FAKE_IMAGE_PATH).exists():
                with open(FAKE_IMAGE_PATH, 'rb') as f:
                    new.card_image.save(f"{slugify(title)}.jpg", File(f), save=True)
                self.stdout.write(f"Создана новость: {new.title}")
            else:
                self.stdout.write(self.style.WARNING(f"Не найдено изображение {FAKE_IMAGE_PATH}"))
                continue

            # Генерация галереи
            random.shuffle(GALLERY_ITEMS)
            for i, item in enumerate(GALLERY_ITEMS[:random.randint(3, 6)]):
                gallery = GalleryNew(new=new, is_main=(i == 0))

                if item["type"] == "image":
                    if Path(item["path"]).exists():
                        with open(item["path"], 'rb') as img_file:
                            gallery.format_type = "image"
                            gallery.image.save(f"{slugify(title)}_{i}.jpg", File(img_file), save=False)
                    else:
                        self.stdout.write(self.style.WARNING(f"Галерея: не найден файл {item['path']}"))
                        continue
                else:
                    gallery.format_type = "video_url"
                    gallery.video_url = item["url"]

                gallery.save()

            self.stdout.write(f"  Галерея добавлена к новости: {new.title}")

        self.stdout.write(self.style.SUCCESS("Генерация новостей завершена."))
