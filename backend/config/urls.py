from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView

urlpatterns = [
    path('admin/', admin.site.urls),

    # API ENDPOINTS
    path('api/v1/', include('events.urls')),
    path('api/v1/', include('feedbacks.urls')),
    path('api/v1/', include('news.urls')),
    path('api/v1/', include('partners.urls')),
    path('api/v1/', include('users.urls')),

    # DRF SPECTACULAR
    path('api/v1/schema/', SpectacularAPIView.as_view(), name = 'schema'),
    path('api/v1/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name = 'schema'), name = 'swagger-ui'),
    path('api/v1/schema/redoc/', SpectacularRedocView.as_view(url_name = 'schema'), name = 'redoc'),

]
