from django.apps import AppConfig


class ManagersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'managers'
    verbose_name = 'Команда'

    def ready(self):
        import managers.signals  # noqa
