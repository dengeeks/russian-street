from django.db import models

from common.mixins import DateTimeMixin


class EveryoneLikes(DateTimeMixin):
    title = models.CharField(
        max_length = 125,
        verbose_name = 'Название',
        help_text = 'Укажите здесь: Студент, Школьник, Бизнесмен'
    )
    description = models.TextField(
        verbose_name = 'Описание',
    )
