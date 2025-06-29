from ckeditor.fields import RichTextField
from django.core.validators import FileExtensionValidator
from django.db import models

from common.mixins import DateTimeMixin, UUIDMixin
from common.utils import setup_image_path
from common.validators import validate_iframe


class Discipline(UUIDMixin, DateTimeMixin):
    """
    Модель, представляющая дисциплину уличной культуры.

    Атрибуты:
        - name (CharField): Название дисциплины.

    Мета:
        verbose_name = 'Дисциплина уличной культуры'
        verbose_name_plural = 'Дисциплины уличных культур'

    Методы:
        __str__(): Возвращает строковое представление дисциплины.
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
    Модель, подкатегорию дисциплин.

    Атрибуты:
        - name (CharField): Название подкатегории.
        - discipline (ForeignKey): Дисциплины связанные с подкатегорией.

    Мета:
        verbose_name (str): Название модели в единственном числе.
        verbose_name_plural (str): Название модели во множественном числе.

    Методы:
        __str__(): Возвращает строковое представление субдицлиплины.
    """

    name = models.CharField(
        'Название подкатегории',
        max_length = 30
    )
    description = RichTextField(
        verbose_name = 'Описание'
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
        verbose_name = 'Описание карточки',
        help_text = 'Описание карточки для главной страницы'
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


class GallerySubDiscipline(UUIDMixin, DateTimeMixin):
    """
    Модель галереи для поддисциплин
    """
    FORMAT_TYPE = [
        ('video_url', 'Видео'),
        ('image', 'Изображение'),
    ]
    format_type = models.CharField(
        max_length = 25,
        choices = FORMAT_TYPE,
        verbose_name = 'Тип',
        help_text = 'Выберите тип (Изображение или видео)'
    )

    subdiscipline = models.ForeignKey(
        SubDiscipline,
        on_delete = models.CASCADE,
        related_name = 'gallery_items',
        verbose_name = 'Поддисциплина'
    )
    image = models.ImageField(
        upload_to = setup_image_path,
        verbose_name = 'Изображение',
        blank = True,
        null = True,
        validators = [
            FileExtensionValidator(
                allowed_extensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg']
            )
        ]
    )
    video_url = models.CharField(
        verbose_name = 'Ссылка на видео (iframe)',
        help_text = 'Введите URL видео в формате iframe для отображения на сайте.',
        validators = [validate_iframe],
        blank = True,
        null = True,
        max_length = 1000
    )
    is_main = models.BooleanField(
        verbose_name = 'Главное фото',
        default = False,
        help_text = 'Использовать как основное изображение для заставки'
    )

    class Meta:
        verbose_name = 'Элемент галереи'
        verbose_name_plural = 'Элементы галереи'
