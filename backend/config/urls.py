from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView

import oauth2.urls

urlpatterns = [
    path('admin/', admin.site.urls),

    # API ENDPOINTS
    path('api/v1/', include('events.urls')),
    path('api/v1/', include('feedbacks.urls')),
    path('api/v1/', include('news.urls')),
    path('api/v1/', include('partners.urls')),
    path('api/v1/', include('users.urls')),
    path('api/v1/', include('contents.urls')),

    # API OAUTH2
    path('o/', include((oauth2.urls.urlpatterns, 'oauth2_provider'), namespace = 'oauth2_provider')),

    # DRF SPECTACULAR
    path('api/v1/schema/', SpectacularAPIView.as_view(), name = 'schema'),
    path('api/v1/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name = 'schema'), name = 'swagger-ui'),
    path('api/v1/schema/redoc/', SpectacularRedocView.as_view(url_name = 'schema'), name = 'redoc'),

    # EDITOR
    path('ckeditor/', include('ckeditor_uploader.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
    urlpatterns += path('__debug__/', include('debug_toolbar.urls')),
