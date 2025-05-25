import os
from datetime import timedelta
from pathlib import Path

from decouple import config
from django.core.management.utils import get_random_secret_key

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = config('SECRET_KEY', cast = str, default = get_random_secret_key())
DEBUG = config('DEBUG', cast = bool, default = False)
ALLOWED_HOSTS = config('ALLOWED_HOSTS', cast = list, default = ['*'])
DB_ENGINE = config('DB_ENGINE', cast = str, default = 'postgresql')

INSTALLED_APPS = [
    'unfold',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # мои приложения
    'events',
    'news',
    'users',
    'partners',
    'feedbacks',
]

# сторонние приложения
EXTERNAL_APPS = [
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    'django_filters',
    'drf_spectacular',
    'django_cleanup.apps.CleanupConfig',
]

INSTALLED_APPS += EXTERNAL_APPS

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

AUTH_USER_MODEL = "users.UserAccount"

LANGUAGE_CODE = 'ru-RU'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

STATIC_URL = 'static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

MEDIA_URL = 'media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ),
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.UserRateThrottle',
        'rest_framework.throttling.ScopedRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {
        'user': '10000/day',  # Лимит для UserRateThrottle
        'feedback_request': '10/hour'  # Лимит на POST запрос в feedback
    }
}

# JWT
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes = 15),
    "REFRESH_TOKEN_LIFETIME": timedelta(days = 30),
    "SIGNING_KEY": SECRET_KEY,
    "AUTH_HEADER_TYPES": ("JWT",)
}

# SPECTACULAR
SPECTACULAR_SETTINGS = {
    'TITLE': 'Документация к Street Russia API',
    'DESCRIPTION': 'Документация к Street Russia API',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,
}

# SMTP YANDEX
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = config('EMAIL_HOST', default = 'host@yandex.ru')
EMAIL_PORT = config('EMAIL_PORT', default = '555')
EMAIL_USE_SSL = config('EMAIL_USE_SSL', default = 'True')
EMAIL_HOST_USER = config('EMAIL_HOST_USER', default = 'email@yandex.ru')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD', default = 'your_yandex_smtp_password')
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER
SERVER_EMAIL = EMAIL_HOST_USER
EMAIL_ADMIN = EMAIL_HOST_USER

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# настройки redis
REDIS_PORT = config('REDIS_PORT', cast = int, default = 6379)
REDIS_HOST = config('REDIS_HOST', cast = str, default = 'redis')
REDIS_PASSWORD = config('REDIS_PASSWORD', cast = str, default = 'redis_password')

# настройки celery
CELERY_BROKER_URL = f'redis://default:{REDIS_PASSWORD}@{REDIS_HOST}:{REDIS_PORT}/0'
CELERY_RESULT_BACKEND = f'redis://default:{REDIS_PASSWORD}@{REDIS_HOST}:{REDIS_PORT}/0'
CELERY_TIMEZONE = 'Europe/Moscow'

CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TASK_TRACK_STARTED = True
CELERY_TASK_TIME_LIMIT = 30 * 60

CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': f'redis://default:{REDIS_PASSWORD}@{REDIS_HOST}:{REDIS_PORT}/0',
    }
}

if DB_ENGINE == 'sqlite3':
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }

if DB_ENGINE == 'postgresql':
    DATABASES = {
        'default': {
            'ENGINE': config('POSTGRES_ENGINE', cast = str, default = 'django.db.backends.postgresql'),
            'NAME': config('POSTGRES_DB', cast = str, default = 'django'),
            'USER': config('POSTGRES_USER', cast = str, default = 'django_user'),
            'PASSWORD': config('POSTGRES_PASSWORD', cast = str, default = 'django'),
            'HOST': config('POSTGRES_HOST', cast = str, default = 'db'),
            'PORT': config('POSTGRES_PORT', cast = int, default = 5432)
        }
    }

# Logging

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'django': {
            'format': '[%(asctime)s] %(levelname)s %(message)s',
            'datefmt': '%d/%b/%Y %H:%M:%S',
        },
    },
    'handlers': {
        'console': {
            'level': 'INFO',
            'class': 'logging.StreamHandler',
            'formatter': 'django',
        },
    },
    'loggers': {
        '': {
            'handlers': ['console'],
            'level': 'INFO',
        },
    },
}
