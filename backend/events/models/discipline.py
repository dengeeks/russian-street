from ckeditor.fields import RichTextField
from django.core.validators import FileExtensionValidator
from django.db import models

from common.models import DateTimeMixin, UUIDMixin, MediaContentMixin
from common.utils import setup_image_path


class Discipline(UUIDMixin, DateTimeMixin):
    """
    Модель дисциплины уличной культуры.

    Наследует:
        - UUIDMixin: UUID в качестве первичного ключа.
        - DateTimeMixin: Автоматические поля created_at и updated_at.

    Поля:
        - name (CharField): Уникальное название дисциплины.
        - first_image (ImageField): Вертикальное изображение для первого блока.
        - second_image (ImageField): Квадратное изображение для второго блока.
        - first_description (TextField): Текст первого блока.
        - second_description (TextField): Текст второго блока.

    Методы:
        - setup_first_path: Генерирует путь для сохранения first_image.
        - setup_second_path: Генерирует путь для сохранения second_image.
        - __str__: Возвращает название дисциплины.
    """

    def setup_first_path(self, filename: str):
        filename = filename.replace(' ', '_')
        return f'uploads/{self.__class__.__name__.lower()}/first/{self.pk}/{filename}'

    def setup_second_path(self, filename: str):
        filename = filename.replace(' ', '_')
        return f'uploads/{self.__class__.__name__.lower()}/second/{self.pk}/{filename}'

    name = models.CharField(
        'Название дисциплины',
        max_length = 30,
    )
    first_image = models.ImageField(
        upload_to = setup_first_path,
        verbose_name = 'Изображение',
        max_length = 1000,
        help_text = 'Вытянутое изображение (страница направление - первый блок)',
        validators = [
            FileExtensionValidator(
                allowed_extensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg']
            )
        ],
    )
    second_image = models.ImageField(
        upload_to = setup_second_path,
        verbose_name = 'Изображение',
        max_length = 1000,
        help_text = 'Изображение для страницы направления (2 блок и так далее)',
        validators = [
            FileExtensionValidator(
                allowed_extensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg']
            )
        ],
    )
    first_description = models.TextField(
        verbose_name = 'Первое описание',
        help_text = 'Блок (страница направления)'
    )
    second_description = models.TextField(
        verbose_name = 'Второе описание',
        help_text = 'Блок (страница направления)'
    )

    class Meta:
        verbose_name = 'Дисциплина уличной культуры'
        verbose_name_plural = 'Дисциплины уличных культур'

    def __str__(self):
        return f'{self.name}'


class SubDiscipline(UUIDMixin, DateTimeMixin):
    """
    Модель подкатегории дисциплины.

    Наследует:
        - UUIDMixin: UUID в качестве первичного ключа.
        - DateTimeMixin: Автоматические поля created_at и updated_at.

    Поля:
        - name (CharField): Название подкатегории.
        - description (RichTextField): Полное описание с HTML-форматированием.
        - image (ImageField): Основное изображение для карточки.
        - main_page_info (TextField): Краткое описание для главной страницы.
        - discipline (ForeignKey): Связь с основной дисциплиной.

    Методы:
        - __str__: Возвращает строку в формате "Дисциплина - Подкатегория".
    """

    name = models.CharField(
        'Название подкатегории',
        max_length = 30
    )
    description = RichTextField(
        verbose_name = 'Полное описание',
        help_text = 'Подробное описание с возможностью форматирования'
    )
    image = models.ImageField(
        upload_to = setup_image_path,
        verbose_name = 'Изображение',
        max_length = 1000,
        help_text = 'Загрузите изображение для главной страницы (отображение направлений)',
        validators = [
            FileExtensionValidator(
                allowed_extensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg']
            )
        ],
    )

    main_page_info = models.TextField(
        verbose_name = 'Краткое описание',
        help_text = 'Текст для карточки на главной странице'
    )
    discipline = models.ForeignKey(
        Discipline,
        on_delete = models.CASCADE,
        related_name = 'sub_disciplines',
        verbose_name = 'Дисциплина'
    )

    def __str__(self):
        return f'{self.discipline.name} - {self.name}'

    class Meta:
        verbose_name = 'Подкатегория дисциплины'
        verbose_name_plural = 'Подкатегории дисциплин'
        constraints = [
            models.UniqueConstraint(
                fields = ['name', 'discipline'],
                name = 'unique_subdiscipline_name_per_discipline'
            )
        ]


class GallerySubDiscipline(UUIDMixin, DateTimeMixin, MediaContentMixin):
    """
       Модель элемента галереи для поддисциплин.

       Наследует:
           - UUIDMixin: UUID в качестве первичного ключа.
           - DateTimeMixin: Автоматические поля created_at и updated_at.
           - MediaContentMixin: Поля для медиа-контента.

       Поля:
           - subdiscipline (ForeignKey): Связь с поддисциплиной.
           - is_main (BooleanField): Флаг главного изображения.

       Методы:
           - clean: Дополнительная валидация главного изображения.
    """
    subdiscipline = models.ForeignKey(
        SubDiscipline,
        on_delete = models.CASCADE,
        related_name = 'gallery_items',
        verbose_name = 'Поддисциплина'
    )
    is_main = models.BooleanField(
        verbose_name = 'Главное фото',
        default = False,
        help_text = 'Использовать как основное изображение для заставки'
    )

    class Meta:
        verbose_name = 'Элемент галереи'
        verbose_name_plural = 'Элементы галереи'
