import json

from oauth2_provider.exceptions import OAuthToolkitError, FatalClientError
from oauth2_provider.models import get_application_model
from oauth2_provider.scopes import get_scopes_backend
from oauth2_provider.views.mixins import OAuthLibMixin
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from oauth2.permissions import LoginAccessMixin


class BaseAuthorizationAPIView(LoginAccessMixin, OAuthLibMixin, APIView):
    """
    Базовый DRF View для обработки OAuth2 авторизации.
    Наследует функциональность:
    - LoginAccessMixin: контроль доступа для неавторизованных пользователей
    - OAuthLibMixin: базовые методы для работы с OAuth
    """

    def dispatch(self, request, *args, **kwargs):
        """Инициализация данных OAuth перед обработкой запроса"""
        self.oauth2_data = {}  # Хранилище данных OAuth для всего запроса
        return super().dispatch(request, *args, **kwargs)

    def error_response(self, error, **kwargs):
        """
        Обработка и возврат ошибок OAuth.

        Args:
            error: Экземпляр OAuthToolkitError с деталями ошибки
            **kwargs: Дополнительные данные для включения в ответ
        """
        oauthlib_error = error.oauthlib_error

        # Формируем URL для редиректа с параметрами ошибки
        redirect_uri = oauthlib_error.redirect_uri or ""
        separator = "&" if "?" in redirect_uri else "?"

        # Стандартная структура ответа с ошибкой
        error_response = {
            "error": {
                "error": oauthlib_error.error,
                "description": oauthlib_error.description,
                "status_code": oauthlib_error.status_code,
            },
            "url": redirect_uri + separator + oauthlib_error.urlencoded,  # URL с параметрами ошибки
        }
        error_response.update(kwargs)  # Добавляем дополнительные параметры

        # Определяем нужно ли делать редирект
        # Для фатальных ошибок клиента редирект не делаем
        redirect = not isinstance(error, FatalClientError)

        if redirect:
            return self.redirect(error_response["url"])

        # Если редирект не требуется, возвращаем JSON с описанием ошибки
        return Response(error_response, status = oauthlib_error.status_code)

    def redirect(self, redirect_to):
        """Упрощенный метод для возврата редиректа"""
        return Response(
            {'url': redirect_to}
        )


class OAuth2AuthorizationAPI(BaseAuthorizationAPIView):
    """
    View для обработки OAuth2 авторизации.
    Реализует endpoint /authorize для:
    - Валидации запроса авторизации
    - Генерации authorization code
    """

    skip_authorization_completely = False  # Флаг пропуска страницы согласия

    def get(self, request, *args, **kwargs):
        """Обработка GET запроса на авторизацию OAuth"""

        # Проверка аутентификации пользователя
        if not request.user.is_authenticated:
            return self.handle_no_permission()

        try:
            # Валидация запроса и извлечение данных
            scopes, credentials = self.validate_authorization_request(request)
        except OAuthToolkitError as error:
            return self.error_response(error)

        # Получаем описания запрашиваемых scope'ов
        all_scopes = get_scopes_backend().get_all_scopes()
        scopes_descriptions = [all_scopes[scope] for scope in scopes]

        # Получаем данные приложения из БД
        application = get_application_model().objects.get(client_id = credentials["client_id"])

        # Сохраняем данные для последующего использования
        self.oauth2_data = {
            "scopes_descriptions": scopes_descriptions,
            "scopes": scopes,
            "application": application,
            "client_id": credentials["client_id"],
            "redirect_uri": credentials["redirect_uri"],
            "response_type": credentials["response_type"],
            "state": credentials["state"],
        }

        # Дополнительные параметры для PKCE и OpenID Connect
        if "code_challenge" in credentials:
            self.oauth2_data["code_challenge"] = credentials["code_challenge"]
        if "code_challenge_method" in credentials:
            self.oauth2_data["code_challenge_method"] = credentials["code_challenge_method"]
        if "nonce" in credentials:
            self.oauth2_data["nonce"] = credentials["nonce"]
        if "claims" in credentials:
            self.oauth2_data["claims"] = json.dumps(credentials["claims"])

        try:
            # Создаем ответ авторизации (пропускаем этап согласия)
            uri, headers, body, status_code = self.create_authorization_response(
                request = self.request,
                scopes = " ".join(scopes),
                credentials = credentials,
                allow = True  # Автоматическое согласие
            )
            return self.redirect(uri)
        except OAuthToolkitError as error:
            return self.error_response(error)

    def post(self, request, *args, **kwargs):
        """Обработка POST запроса (форма согласия)"""

        if not request.user.is_authenticated:
            return self.handle_no_permission()

        # Формируем credentials из данных формы
        credentials = {
            "client_id": request.data.get("client_id"),
            "redirect_uri": request.data.get("redirect_uri"),
            "response_type": request.data.get("response_type", None),
            "state": request.data.get("state", None),
        }

        # Дополнительные параметры
        if request.data.get("code_challenge", False):
            credentials["code_challenge"] = request.data.get("code_challenge")
        if request.data.get("code_challenge_method", False):
            credentials["code_challenge_method"] = request.data.get("code_challenge_method")
        if request.data.get("nonce", False):
            credentials["nonce"] = request.data.get("nonce")
        if request.data.get("claims", False):
            credentials["claims"] = request.data.get("claims")

        scopes = request.data.get("scope")
        allow = True  # Пропускаем этап подтверждения согласия

        try:
            # Создаем ответ авторизации
            uri, headers, body, status_code = self.create_authorization_response(
                request = self.request,
                scopes = scopes,
                credentials = credentials,
                allow = allow
            )
        except OAuthToolkitError as error:
            return self.error_response(error)

        return self.redirect(uri)
