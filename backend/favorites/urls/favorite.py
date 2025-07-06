from django.urls import path

from favorites.views.favorite import FavoriteToggleAPI, FavoriteListAPI

urlpatterns = [
    path('add-delete/events/', FavoriteToggleAPI.as_view()),
    path('list/favorite/', FavoriteListAPI.as_view()),
]
