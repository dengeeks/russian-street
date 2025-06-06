from django.urls import path

from contents.views.contact import ContactAPI

urlpatterns = [
    # получение статики контактов
    path('static/contact/', ContactAPI.as_view())
]
