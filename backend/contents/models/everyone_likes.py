from django.db import models

from common.mixins import DateTimeMixin, MaxCountLimitedMixin


class EveryoneLikes(DateTimeMixin, MaxCountLimitedMixin):
    """
    Модель для блока у нас понравится всем".

    Наследует:
        - DateTimeMixin: автоматические поля создания и обновления.

    Поля:
        - title (CharField): Заголовок (студент, школьник).
        - description (TextField): Описание.

    Meta:
        verbose_name: 'у нас понравится всем'
        verbose_name_plural: 'у нас понравится всем'
    """

    MAX_COUNT = 7

    title = models.CharField(
        max_length = 55,
        verbose_name = 'Название',
        help_text = 'Укажите здесь: Студент, Школьник, Бизнесмен'
    )
    description = models.CharField(
        verbose_name = 'Описание',
        max_length = 165
    )

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'у нас понравится всем'
        verbose_name_plural = 'у нас понравится всем'
