from django.apps import AppConfig


class PartnersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'partners'
    verbose_name = 'Партнеры'


    def ready(self):
        # Явный импорт сигналов
        from partners import signals  # noqa
