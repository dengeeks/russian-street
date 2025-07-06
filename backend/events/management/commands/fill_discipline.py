from django.core.files import File
from django.core.management.base import BaseCommand

from events.models.discipline import Discipline, SubDiscipline, GallerySubDiscipline

# Путь к папке с медиа для импорта

# Данные дисциплин и поддисциплин
DISCIPLINE_DATA = {
    "Спорт": [
        "Воркаут", "Скейтбординг", "Паркур", "Баскетбол", "Футбол",
        "Велоспорт", "Бокс", "Тяжёлая атлетика", "Плавание", "Йога"
    ],
    "Музыка": [
        "Рэп", "Хип-хоп", "Рок", "Поп", "Джаз",
        "Блюз", "Классика", "Электронная музыка", "Регги", "Фолк"
    ],
    "Танцы": [
        "Хип-хоп танцы", "Брейкданс", "Балет", "Сальса", "Танго",
        "Вальс", "Фламенко", "Крамп", "Джаз-фанк", "Контемпорари"
    ],
    "Искусство": [
        "Граффити", "Живопись", "Скульптура", "Фотография", "Дизайн",
        "Кинематограф", "Театр", "Литература", "Комиксы", "Архитектура"
    ],
    "Лайфстайл": [
        "Мода", "Путешествия", "Гастрономия", "Здоровье", "Технологии",
        "Экология", "Фитнес", "Саморазвитие", "Косметология", "Мотивация"
    ]
}

# Общая галерея для всех поддисциплин
GALLERY_DATA = [
    {"path": "back_media/default_region/Yakutia-3.jpg", "is_main": False},
    {"path": "back_media/default_region/Yakutia-3.jpg", "is_main": False},
    {"path": "back_media/default_region/Yakutia-3.jpg", "is_main": False},
    {"path": "back_media/default_region/Yakutia-3.jpg", "is_main": False},
    {"path": "back_media/default_region/Yakutia-3.jpg", "is_main": False},
    {"path": "back_media/default_region/Yakutia-3.jpg", "is_main": False},
    {"path": "back_media/default_region/Yakutia-3.jpg", "is_main": False},
    {"path": "back_media/default_region/Yakutia-3.jpg", "is_main": False},
    {"path": "back_media/default_region/Yakutia-3.jpg", "is_main": False},
    {"path": "back_media/default_region/Yakutia-3.jpg", "is_main": False},
    {"path": "back_media/default_region/Yakutia-3.jpg", "is_main": False},
    {"path": "https://youtu.be/xbqVWZD-sfI?si=zVm3cugRcWjb3Nan", "is_main": True},
]


class Command(BaseCommand):
    help = 'Создаёт дисциплины, поддисциплины и галерею с изображениями и видео'

    def handle(self, *args, **options):
        self.stdout.write(self.style.MIGRATE_HEADING('Начинаю создание дисциплин и поддисциплин'))

        for discipline_name, subdisciplines in DISCIPLINE_DATA.items():
            # Создаём дисциплину или получаем существующую
            discipline, created = Discipline.objects.get_or_create(name = discipline_name)
            if created:
                self.stdout.write(self.style.SUCCESS(f'Создана дисциплина: {discipline_name}'))
            else:
                self.stdout.write(f'Дисциплина уже существует: {discipline_name}')

            # Загружаем для Discipline одинаковые изображения first_image и second_image
            first_img_path = 'back_media/default_region/Yakutia-3.jpg'
            second_img_path = 'back_media/default_region/Yakutia-3.jpg'

            if first_img_path:
                with open(first_img_path, 'rb') as f:
                    discipline.first_image.save('Yakutia-3.jpg', File(f), save = True)
                self.stdout.write(f'  Загружено first_image для {discipline_name}')
            else:
                self.stdout.write(self.style.WARNING(f'  Не найден файл {first_img_path}'))

            if second_img_path:
                with open(second_img_path, 'rb') as f:
                    discipline.second_image.save('Yakutia-3.jpg', File(f), save = True)
                self.stdout.write(f'  Загружено second_image для {discipline_name}')
            else:
                self.stdout.write(self.style.WARNING(f'  Не найден файл {second_img_path}'))

            # Обновим описание дисциплины (если надо)
            discipline.description = """Это направление представляет собой уникальное сочетание традиций и современных тенденций, отражающих дух уличной культуры. Оно объединяет в себе элементы самовыражения, творчества и социальной активности, позволяя каждому участнику раскрыть свои способности и найти своё место в сообществе. Направление характеризуется высокой энергией, динамикой и непрерывным развитием, что делает его привлекательным для людей всех возрастов и уровней подготовки. Здесь важна не только техника и мастерство, но и внутреннее состояние, свобода мысли и желание влиять на окружающий мир. Участники активно взаимодействуют друг с другом, обмениваются опытом и создают атмосферу поддержки и вдохновения, способствуя распространению культуры в самых разных уголках города и мира."""
            discipline.save()

            # Создаём поддисциплины
            for sub_name in subdisciplines:
                sub, sub_created = SubDiscipline.objects.get_or_create(
                    name = sub_name,
                    discipline = discipline,
                    defaults = {
                        'description': """
                        <p><s><u>Это направление представляет собой уникальное сочетание традиций и современных тенденций, отражающих дух уличной культуры. Оно объединяет в себе элементы самовыражения, творчества и социальной активности, позволяя каждому участнику раскрыть свои способности и найти своё место в сообществе. Направление характеризуется высокой энергией, динамикой и непрерывным развитием, что делает его привлекательным для людей всех возрастов и уровней подготовки. Здесь важна не только техника и мастерство, но и внутреннее состояние, свобода мысли и желание влиять на окружающий мир. Участники активно взаимодействуют друг с другом, обмениваются опытом и создают атмосферу поддержки и вдохновения, способствуя распространению культуры в самых разных уголках города и мира.</u></s></p>

<p><u>Это направление представляет собой уникальное сочетание традиций и современных тенденций, отражающих дух уличной культуры. Оно объединяет в себе элементы самовыражения, творчества и социальной активности, позволяя каждому участнику раскрыть свои способности и найти своё место в сообществе. Направление характеризуется высокой энергией, динамикой и непрерывным развитием, что делает его привлекательным для людей всех возрастов и уровней подготовки. Здесь важна не только техника и мастерство, но и внутреннее состояние, свобода мысли и желание влиять на окружающий мир. Участники активно взаимодействуют друг с другом, обмениваются опытом и создают атмосферу поддержки и вдохновения, способствуя распространению культуры в самых разных уголках города и мира.</u></p>

<p><strong>Это направление представляет собой уникальное сочетание традиций и современных тенденций, отражающих дух уличной культуры. Оно объединяет в себе элементы самовыражения, творчества и социальной активности, позволяя каждому участнику раскрыть свои способности и найти своё место в сообществе. Направление характеризуется высокой энергией, динамикой и непрерывным развитием, что делает его привлекательным для людей всех возрастов и уровней подготовки. Здесь важна не только техника и мастерство, но и внутреннее состояние, свобода мысли и желание влиять на окружающий мир. Участники активно взаимодействуют друг с другом, обмениваются опытом и создают атмосферу поддержки и вдохновения, способствуя распространению культуры в самых разных уголках города и мира.</strong></p>""",
                        'main_page_info': """
                        Это направление представляет собой уникальное сочетание традиций и современных тенденций, отражающих дух уличной культуры. Оно объединяет в себе элементы самовыражения, творчества и социальной активности, позволяя каждому участнику раскрыть свои способности и найти своё место в сообществе. Направление характеризуется высокой энергией, динамикой и непрерывным развитием, что делает его привлекательным для людей всех возрастов и уровней подготовки. Здесь важна не только техника и мастерство, но и внутреннее состояние, свобода мысли и желание влиять на окружающий мир. Участники активно взаимодействуют друг с другом, обмениваются опытом и создают атмосферу поддержки и вдохновения, способствуя распространению культуры в самых разных уголках города и мира.""",
                    }
                )
                if sub_created:
                    self.stdout.write(f'  Создана поддисциплина: {sub_name}')
                else:
                    self.stdout.write(f'  Поддисциплина уже существует: {sub_name}')

                # Загружаем одинаковое изображение для SubDiscipline
                sub_image_path = 'back_media/default_region/Yakutia-3.jpg'
                if sub_image_path:
                    with open(sub_image_path, 'rb') as f:
                        sub.image.save('Yakutia-3.jpg', File(f), save = True)
                    self.stdout.write(f'    Загружено изображение для {sub_name}')
                else:
                    self.stdout.write(self.style.WARNING(f'    Не найден файл {sub_image_path}'))

                # Создаём галерею для поддисциплины из GALLERY_DATA
                for item in GALLERY_DATA:
                    path = item.get('path')
                    is_main = item.get('is_main', False)
                    if not path:
                        continue

                    gallery_obj = GallerySubDiscipline(subdiscipline = sub, is_main = is_main)

                    if path.startswith('http'):
                        gallery_obj.format_type = 'video_url'
                        gallery_obj.video_url = path
                    else:
                        gallery_obj.format_type = 'image'
                        img_path = 'back_media/default_region/Yakutia-3.jpg'
                        if img_path:
                            with open(img_path, 'rb') as img_file:
                                gallery_obj.image.save('Yakutia-3.jpg', File(img_file), save = False)
                        else:
                            self.stdout.write(self.style.WARNING(f'    Не найден файл галереи {img_path}'))
                            continue

                    gallery_obj.save()

                self.stdout.write(f'Создана галерея для поддисциплины {sub_name}')

        self.stdout.write(self.style.SUCCESS('Все дисциплины, поддисциплины и галереи созданы!'))
