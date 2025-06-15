from oauth2_provider.oauth2_validators import OAuth2Validator


class CustomOAuth2Validator(OAuth2Validator):
    """
    Кастомный валидатор OAuth2 с расширенной функциональностью:
    - Добавление кастомных claims в ID токен
    - Настройка scope для claims
    """

    # Отключаем привязку claims к scope
    oidc_claim_scope = None

    def get_additional_claims(self, request):
        """
        Добавляем кастомные claims в ID токен на основе данных пользователя.
        """
        return {
            'family_name': request.user.last_name,
            'given_name': request.user.first_name,
            'middle_name': request.user.middle_name
        }
