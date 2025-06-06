from django.urls import path

from contents.views.aboutus import AboutUsAPI

urlpatterns = [
    # получение статики с страницы о нас
    path('static/aboutus/', AboutUsAPI.as_view())
]
