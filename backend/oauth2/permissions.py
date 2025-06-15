from urllib.parse import urlsplit

from django.conf import settings
from django.contrib.auth.views import redirect_to_login
from django.core.exceptions import ImproperlyConfigured
from django.shortcuts import resolve_url
from rest_framework import status
from rest_framework.response import Response


class LoginAccessMixin:
    """
    Миксин для контроля доступа, перенаправляет неавторизованных пользователей на страницу входа.
    Сохраняет исходный URL в параметре 'next' для последующего редиректа после авторизации.
    """

    # URL для входа по умолчанию (можно переопределить в дочерних классах)
    login_url = None

    # Имя параметра для хранения пути редиректа
    redirect_field_name = 'next'

    def get_login_url(self):
        # Получаем URL для входа: сначала из атрибута класса, затем из настроек
        login_url = self.login_url or settings.LOGIN_URL
        if not login_url:
            raise ImproperlyConfigured(
                f"{self.__class__.__name__} требует login_url. Определите "
                f"{self.__class__.__name__}.login_url, settings.LOGIN_URL или "
                f"переопределите метод get_login_url()."
            )
        return str(login_url)

    def get_redirect_field_name(self):
        # Просто возвращаем имя параметра для редиректа
        return self.redirect_field_name

    def handle_no_permission(self):
        # Полный URL текущего запроса
        path = self.request.build_absolute_uri()

        # Нормализуем URL входа (работает с относительными и абсолютными путями)
        resolved_login_url = resolve_url(self.get_login_url())

        # Разбираем URL для сравнения домена и схемы
        login_scheme, login_netloc = urlsplit(resolved_login_url)[:2]
        current_scheme, current_netloc = urlsplit(path)[:2]

        # Добавляем параметр next только если домен и схема совпадают
        if ((not login_scheme or login_scheme == current_scheme) and
                (not login_netloc or login_netloc == current_netloc)):
            # Используем относительный путь для текущего домена
            path = self.request.get_full_path()

        # Генерируем полный URL для редиректа с параметром next
        redirect_url = redirect_to_login(
            path,
            resolved_login_url,
            self.get_redirect_field_name()
        ).url

        # Возвращаем ответ с кодом 401 и заголовком Location
        print(redirect_url)
        return Response(
            status = status.HTTP_401_UNAUTHORIZED,
            headers = {'Location': redirect_url}
        )
