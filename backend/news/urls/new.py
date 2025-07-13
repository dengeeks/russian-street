from django.urls import path

from news.views.new import NewsListAPI, NewsDetailAPI

urlpatterns = [
    # список новостей
    path('list/new/', NewsListAPI.as_view()),
    # детали новостей
    path('detail/new/<uuid:id>/', NewsDetailAPI.as_view()),

]
