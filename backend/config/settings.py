import os
from datetime import timedelta
from pathlib import Path

from decouple import config
from django.core.management.utils import get_random_secret_key
from django.templatetags.static import static
from django.urls import reverse_lazy

BASE_DIR = Path(__file__).resolve().parent.parent

# секретные ключи, настройки
SECRET_KEY = config('SECRET_KEY', cast = str, default = get_random_secret_key())
DEBUG = config('DEBUG', cast = bool, default = False)
ALLOWED_HOSTS = config('ALLOWED_HOSTS', cast = list, default = ['*'])
DB_ENGINE = config('DB_ENGINE', cast = str, default = 'postgresql')

# настройки сайта
RESET_PASSWORD_PATH = config('RESET_PASSWORD_PATH', cast = str, default = 'auth/reset-password')
PROTOCOL = config('PROTOCOL', cast = str, default = 'https')
DOMAIN = config('DOMAIN', cast = str, default = 'street-russia')

# ключи кеширования
CACHE_HOMEPAGE_KEY = config('CACHE_HOMEPAGE_KEY', cast = str, default = 'CACHE_HOMEPAGE_KEY')
CACHE_HOMEPAGE_TIMEOUT = config('CACHE_HOMEPAGE_TIMEOUT', cast = int, default = 60 * 60 * 24)

CACHE_ABOUTUS_KEY = config('CACHE_ABOUTUS_KEY', cast = str, default = 'CACHE_ABOUTUS_KEY')
CACHE_ABOUTUS_TIMEOUT = config('CACHE_ABOUTUS_TIMEOUT', cast = int, default = 60 * 60 * 24)

CACHE_CONTACT_KEY = config('CACHE_CONTACT_KEY', cast = str, default = 'CACHE_CONTACT_KEY')
CACHE_CONTACT_TIMEOUT = config('CACHE_CONTACT_TIMEOUT', cast = int, default = 60 * 60 * 24)

CACHE_COOPERATION_KEY = config('CACHE_COOPERATION_KEY', cast = str, default = 'CACHE_COOPERATION_KEY')
CACHE_COOPERATION_TIMEOUT = config('CACHE_COOPERATION_TIMEOUT', cast = int, default = 60 * 60 * 24)

CACHE_EVERYONELIKES_KEY = config('CACHE_EVERYONELIKES_KEY', cast = str, default = 'CACHE_EVERYONELIKES_KEY')
CACHE_EVERYONELIKES_TIMEOUT = config('CACHE_EVERYONELIKES_TIMEOUT', cast = int, default = 60 * 60 * 24)

CACHE_PARTNERS_KEY = config('CACHE_PARTNERS_KEY', cast = str, default = 'CACHE_PARTNERS_KEY')
CACHE_PARTNERS_TIMEOUT = config('CACHE_PARTNERS_TIMEOUT', cast = int, default = 60 * 60 * 24)

CACHE_TEAM_KEY = config('CACHE_TEAM_KEY', cast = str, default = 'CACHE_TEAM_KEY')
CACHE_TEAM_TIMEOUT = config('CACHE_TEAM_TIMEOUT', cast = int, default = 60 * 60 * 24)

CACHE_SUBDISCIPLINE_KEY = config('CACHE_SUBDISCIPLINE_KEY', cast = str, default = 'CACHE_SUBDISCIPLINE_KEY')
CACHE_SUBDISCIPLINE_TIMEOUT = config('CACHE_SUBDISCIPLINE_TIMEOUT', cast = int, default = 60 * 60 * 24)

INSTALLED_APPS = [
    'unfold',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # мои приложения
    'events.apps.EventsConfig',
    # 'news',
    'users',
    'feedbacks',
    'oauth2',
    'regions',
    'teams.apps.TeamsConfig',
    'partners.apps.PartnersConfig',
    'contents.apps.ContentsConfig'
]

# сторонние приложения
EXTERNAL_APPS = [
    'oauth2_provider',
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    'django_filters',
    'drf_spectacular',
    'ckeditor',
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
    'oauth2_provider.middleware.OAuth2TokenMiddleware',
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

TIME_ZONE = 'Europe/Moscow'

USE_I18N = True

USE_TZ = True

STATIC_URL = 'back_static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'back_static')
STATICFILES_DIRS = [
    BASE_DIR / 'static'
]

MEDIA_URL = 'back_media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'back_media')

REST_FRAMEWORK = {
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework.parsers.JSONParser',
        'rest_framework.parsers.MultiPartParser',  # Для обработки файлов
        'rest_framework.parsers.FormParser',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'oauth2_provider.contrib.rest_framework.OAuth2Authentication'
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

OIDC_RSA_PRIVATE_KEY_PATH = config('OIDC_RSA_PRIVATE_KEY_PATH')
OIDC_RSA_PRIVATE_KEY = Path(OIDC_RSA_PRIVATE_KEY_PATH).read_text()

# OAUTH2
OAUTH2_PROVIDER = {
    'SCOPES': {
        'openid': 'OpenID Connect scope'
    },
    'OIDC_ENABLED': True,
    'OIDC_RP_INITIATED_LOGOUT_ENABLED': True,
    'OIDC_RP_INITIATED_LOGOUT_ALWAYS_PROMPT': False,
    'OIDC_RSA_PRIVATE_KEY': OIDC_RSA_PRIVATE_KEY,
    "OAUTH2_VALIDATOR_CLASS": "oauth2.oauth2_validators.CustomOAuth2Validator",
    'ACCESS_TOKEN_EXPIRE_SECONDS': 14400,
    "REFRESH_TOKEN_EXPIRE_SECONDS": 2592000,
    'AUTHORIZATION_CODE_EXPIRE_SECONDS': 600,

}

LOGIN_URL = config('LOGIN_URL', cast = str, default = '/login/')

AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
    'oauth2_provider.backends.OAuth2Backend',
]

# JWT
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(hours = 4),
    "REFRESH_TOKEN_LIFETIME": timedelta(days = 30),
    "SIGNING_KEY": SECRET_KEY,
    "AUTH_HEADER_TYPES": ("JWT",),
    'UPDATE_LAST_LOGIN': True
}

# CORS
CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_ALL_ORIGINS = True
CSRF_TRUSTED_ORIGINS = [
    'http://localhost:3000',
    'https://street-russia.tati-b-n.ru'
]


# SPECTACULAR
SPECTACULAR_SETTINGS = {
    'TITLE': 'Документация к Street Russia API',
    'DESCRIPTION': 'Документация к Street Russia API',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,
}

# SMTP
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = config('EMAIL_HOST', default = 'host@yandex.ru')
EMAIL_PORT = config('EMAIL_PORT', default = '555')
EMAIL_USE_SSL = config('EMAIL_USE_SSL', cast = bool, default = False)
EMAIL_USE_TLS = config('EMAIL_USE_TLS', cast = bool, default = True)
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

# Настройки админ панели
UNFOLD = {
    "SITE_TITLE": "Добро пожаловать!",
    "SITE_HEADER": "Административная панель",
    "SITE_SYMBOL": "speed",
    "show_all_applications": False,
    "SCRIPTS": [
        lambda request: static("js/join_street_form.js"),
    ],
    "SIDEBAR": {
        "show_search": True,
        "show_all_applications": True,
        "navigation": [
            {
                "title": "OAuth2 приложения",
                "collapsible": True,
                "separator": True,
                "items": [
                    {
                        "title": "OAuth2",
                        "icon": "app_registration",
                        "permission": lambda request: request.user.is_superuser,
                        "link": reverse_lazy("admin:oauth2_provider_application_changelist"),
                    },
                ],
            },
            {
                "title": "Пользователи",
                "collapsible": True,
                "separator": True,
                "items": [
                    {
                        "title": "Пользователи",
                        "icon": "person",
                        "permission": lambda request: request.user.is_superuser,
                        "link": reverse_lazy("admin:users_useraccount_changelist"),
                    },
                    {
                        "title": "Соцсети руководителей",
                        "icon": "communities",
                        "permission": lambda request: request.user.is_superuser,
                        "link": reverse_lazy("admin:users_socialmediamanager_changelist"),
                    }
                ],
            },
            {
                "title": "Мероприятия и Площадки",
                "collapsible": True,
                "separator": True,
                "items": [
                    {
                        "title": "Мероприятия",
                        "icon": "person",
                        "permission": lambda request: (
                                request.user.is_superuser or
                                request.user.role in ['regional_director', 'federal_director']
                        ),
                        "link": reverse_lazy("admin:events_event_changelist"),
                    },
                    {
                        "title": "Дисциплина",
                        "icon": "category",
                        "permission": lambda request: request.user.is_superuser,
                        "link": reverse_lazy("admin:events_discipline_changelist"),
                    },
                    {
                        "title": "Направления",
                        "icon": "extension",
                        "permission": lambda request: request.user.is_superuser,
                        "link": reverse_lazy("admin:events_subdiscipline_changelist"),
                    }
                ],
            },
            {
                "title": "Регионы",
                "collapsible": True,
                "separator": True,
                "items": [
                    {
                        "title": "Регион",
                        "icon": "globe_asia",
                        "permission": lambda request: request.user.is_superuser,
                        "link": reverse_lazy("admin:regions_region_changelist"),
                    },
                    {
                        "title": "Город",
                        "icon": "location_city",
                        "permission": lambda request: request.user.is_superuser,
                        "link": reverse_lazy("admin:regions_city_changelist"),
                    },
                ],
            },
            {
                "title": "Команда",
                "collapsible": True,
                "separator": True,
                "items": [
                    {
                        "title": "Члены команды",
                        "icon": "partner_exchange",
                        "permission": lambda request: request.user.is_superuser,
                        "link": reverse_lazy("admin:teams_teammember_changelist"),
                    },
                    {
                        "title": "Тип команды",
                        "icon": "format_ink_highlighter",
                        "permission": lambda request: request.user.is_superuser,
                        "link": reverse_lazy("admin:teams_teamtype_changelist"),
                    },
                ],
            },
            {
                "title": "Партнеры",
                "collapsible": True,
                "separator": True,
                "items": [
                    {
                        "title": "Партнеры",
                        "icon": "partner_exchange",
                        "permission": lambda request: request.user.is_superuser,
                        "link": reverse_lazy("admin:partners_partner_changelist"),
                    },
                    {
                        "title": "Тип партнера",
                        "icon": "format_ink_highlighter",
                        "permission": lambda request: request.user.is_superuser,
                        "link": reverse_lazy("admin:partners_partnertype_changelist"),
                    },
                ],
            },
            {
                "title": "Главная страница",
                "collapsible": True,
                "separator": True,
                "items": [
                    {
                        "title": "Промо-видео",
                        "icon": "iframe",
                        "permission": lambda request: request.user.is_superuser,
                        "link": reverse_lazy("admin:contents_promotionalvideo_changelist"),
                    },
                    {
                        "title": "Улица это мы",
                        "icon": "streetview",
                        "permission": lambda request: request.user.is_superuser,
                        "link": reverse_lazy("admin:contents_streetisusimage_changelist"),
                    },
                    {
                        "title": "О нас",
                        "icon": "info",
                        "permission": lambda request: request.user.is_superuser,
                        "link": reverse_lazy("admin:contents_aboutus_changelist"),
                    },
                    {
                        "title": "Миссия и цель (текст)",
                        "icon": "description",
                        "permission": lambda request: request.user.is_superuser,
                        "link": reverse_lazy("admin:contents_missionandgoalstext_changelist"),
                    },
                    {
                        "title": "Миссия и цель (изображения)",
                        "icon": "image",
                        "permission": lambda request: request.user.is_superuser,
                        "link": reverse_lazy("admin:contents_missionandgoalsimage_changelist"),
                    },
                    {
                        "title": "Об организации",
                        "icon": "business",
                        "permission": lambda request: request.user.is_superuser,
                        "link": reverse_lazy("admin:contents_organizationinfo_changelist"),
                    },
                ],

            },
            {
                "title": "О нас",
                "collapsible": True,
                "separator": True,
                "items": [
                    {
                        "title": "Стань частью улиц",
                        "icon": "people",
                        "permission": lambda request: request.user.is_superuser,
                        "link": reverse_lazy("admin:contents_joinstreet_changelist"),
                    },
                    {
                        "title": "Миссия",
                        "icon": "flag",
                        "permission": lambda request: request.user.is_superuser,
                        "link": reverse_lazy("admin:contents_mission_changelist"),
                    },
                    {
                        "title": "Информация",
                        "icon": "info",
                        "permission": lambda request: request.user.is_superuser,
                        "link": reverse_lazy("admin:contents_information_changelist"),
                    },
                ]
            },
            {
                "title": "Контакты",
                "collapsible": True,
                "separator": True,
                "items": [
                    {
                        "title": "Соцсети (Header)",
                        "icon": "share",
                        "permission": lambda request: request.user.is_superuser,
                        "link": reverse_lazy("admin:contents_contactheader_changelist"),
                    },
                    {
                        "title": "Соцсети (Footer)",
                        "icon": "public",
                        "permission": lambda request: request.user.is_superuser,
                        "link": reverse_lazy("admin:contents_contactfooter_changelist"),
                    },
                    {
                        "title": "Почта (Footer)",
                        "icon": "email",
                        "permission": lambda request: request.user.is_superuser,
                        "link": reverse_lazy("admin:contents_emailfooter_changelist"),
                    },
                ]
            },
            {
                "title": "Страница сотрудничество",
                "collapsible": True,
                "separator": True,
                "items": [
                    {
                        "title": "Блок сотрудничество",
                        "icon": "handshake",
                        "permission": lambda request: request.user.is_superuser,
                        "link": reverse_lazy("admin:contents_cooperation_changelist"),
                    }
                ]
            },
            {
                "title": "У нас понравится всем",
                "collapsible": True,
                "separator": True,
                "items": [
                    {
                        "title": "Блок 'У нас понравится всем'",
                        "icon": "favorite",
                        "permission": lambda request: request.user.is_superuser,
                        "link": reverse_lazy("admin:contents_everyonelikes_changelist"),
                    }
                ]
            }

        ],
    },
}

# Ckeditor
CKEDITOR_UPLOAD_PATH = 'uploads/'
CKEDITOR_IMAGE_BACKEND = "pillow"
CKEDITOR_JQUERY_URL = '//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js'

CKEDITOR_CONFIGS = {
    'default':
        {
            'toolbar': 'full',
            'width': 'auto',
            'extraPlugins': ','.join(
                [
                    'codesnippet', 'colorbutton', 'font', 'justify',
                ]
            ),
        },
}

if DEBUG:
    INTERNAL_IPS = ('127.0.0.1',)
    MIDDLEWARE += ['debug_toolbar.middleware.DebugToolbarMiddleware']
    INSTALLED_APPS += ['debug_toolbar']
    DEBUG_TOOLBAR_CONFIG = {
        'SHOW_TOOLBAR_CALLBACK': lambda request: True
    }
