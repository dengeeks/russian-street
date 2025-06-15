import os
from datetime import timedelta

from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

app = Celery('config')
app.config_from_object('django.conf:settings', namespace = 'CELERY')
app.autodiscover_tasks()
app.conf.timezone = 'Europe/Moscow'

app.conf.beat_schedule = {
    'clear-tokens-daily': {
        'task': 'oauth2.tasks.clear_tokens',
        'schedule': timedelta(seconds = 24 * 60 * 60),
    }
}
