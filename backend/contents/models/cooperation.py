from ckeditor.fields import RichTextField
from django.db import models

from common.mixins import DateTimeMixin, SingleInstanceMixin


class Cooperation(DateTimeMixin, SingleInstanceMixin):
    text = RichTextField(
        verbose_name = 'Текстовое описание'
    )
    partners_count = models.PositiveIntegerField(
        verbose_name = 'Количество партнеров'
    )
    projects_count = models.PositiveIntegerField(
        verbose_name = 'Количество реализованных проектов'
    )
