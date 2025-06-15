import oauth2_provider.views as oauth2_views
from django.urls import path
from oauth2_provider.urls import oidc_urlpatterns

from oauth2.views.oauth2 import OAuth2AuthorizationAPI

app_name = 'oauth2_provider'

urlpatterns = [
    # авторизация через oauth2
    path('authorize/', OAuth2AuthorizationAPI.as_view(), name = "authorize"),
    # получение access, refresh токена и обновление его
    path('token/', oauth2_views.TokenView.as_view(), name = "token"),
    # удаление токена
    path('revoke-token/', oauth2_views.RevokeTokenView.as_view(), name = "revoke-token"),
] + oidc_urlpatterns
