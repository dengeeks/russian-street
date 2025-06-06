from django.urls import path

from contents.views.everyone_likes import EveryOneLikesAPI

urlpatterns = [
    # получение статики с блока у нас понравится всем
    path('static/everyone-likes/', EveryOneLikesAPI.as_view())
]
