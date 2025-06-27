from django.core.validators import FileExtensionValidator
from django.db import models
#
# from common.constants.news import ALLOWED_EXTENSIONS
# from common.mixins import DateTimeMixin
# from common.validators import validate_size_file
# from news.models.new import News
#
#
# class GalleryNews(DateTimeMixin):
#     """
#     Модель, представляющая галерею для новостей.
#
#     Атрибуты:
#         - file (FileField): Файл для новостей.
#         - news (ForeignKey): Связь с новостью
#     """
#     file = models.FileField(
#         'Файл',
#         upload_to='files_news/',
#         help_text='Загрузите файл.',
#         validators=[
#             FileExtensionValidator(
#                 ALLOWED_EXTENSIONS),
#             validate_size_file
#         ]
#     )
#     news = models.ForeignKey(
#         News,
#         related_name='news_images',
#         on_delete=models.CASCADE,
#         verbose_name='Новость',
#         help_text='Медиа-файлы, связанные с этой новостью'
#     )
#
#     class Meta:
#         verbose_name = 'Галерея новости'
