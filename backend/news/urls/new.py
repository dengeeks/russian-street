from django.urls import path

from news.views.new import NewsListAPI, NewsDetailAPI

urlpatterns = [
    # получение дисциплин и субдисциплин (С фильтрацией)
    path('list/new/', NewsListAPI.as_view()),
    path('detail/new/<uuid:id>/', NewsDetailAPI.as_view()),

]
