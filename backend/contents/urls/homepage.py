from django.urls import path

from contents.views.homepage import HomePageAPI

urlpatterns = [
    # получение статики с главной страницы
    path('static/homepage/', HomePageAPI.as_view())
]
