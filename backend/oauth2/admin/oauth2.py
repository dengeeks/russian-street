import oauth2_provider.admin  # noqa
from django.contrib import admin
from oauth2_provider.models import (
    get_application_model,
    get_access_token_model,
    get_grant_model,
    get_id_token_model,
    get_refresh_token_model
)
from unfold.admin import ModelAdmin

from common.admin import LinkToDetailMixin


class ApplicationAdmin(LinkToDetailMixin, ModelAdmin):
    fieldsets = (
        ('Основная информация', {
            'fields': ('name', "user", 'client_type', 'authorization_grant_type'),
            'description': 'Настройка идентификации и типа клиента'
        }),
        ('Параметры авторизации', {
            'fields': ('redirect_uris', 'post_logout_redirect_uris', 'allowed_origins', 'skip_authorization'),
            'description': 'URI-адреса для редиректов и разрешённые источники'
        }),
        ('Ключи и безопасность', {
            'fields': ('client_id', 'client_secret', 'hash_client_secret', 'algorithm'),
            'description': 'Параметры безопасности клиента'
        }),
        ('Служебная информация', {
            'fields': ('created', 'updated'),
        }),
    )
    list_display = ['link_to_detail', 'name', 'created', 'updated']
    radio_fields = {
        'client_type': admin.HORIZONTAL,
        'authorization_grant_type': admin.VERTICAL,
    }
    search_fields = ['name', 'user__email']
    raw_id_fields = ['user']
    readonly_fields = ['link_to_detail', 'created', 'updated', 'client_id', 'client_secret']


# Получаем модели
application_model = get_application_model()
access_token_model = get_access_token_model()
grant_model = get_grant_model()
id_token_model = get_id_token_model()
refresh_token_model = get_refresh_token_model()

# Отменяем стандартную регистрацию
admin.site.unregister(application_model)
admin.site.unregister(access_token_model)
admin.site.unregister(grant_model)
admin.site.unregister(id_token_model)
admin.site.unregister(refresh_token_model)

# Регистрируем модели с Unfold
admin.site.register(application_model, ApplicationAdmin)
