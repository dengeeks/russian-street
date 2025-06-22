from django.urls import path

from partners.views.partner import ListPartnerAPI

urlpatterns = [
    # получение партнеров
    path('list/partner/', ListPartnerAPI.as_view())
]
