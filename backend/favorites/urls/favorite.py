from django.urls import path

from favorites.views.favorite import FavoriteToggleAPI

urlpatterns = [
    path('add-delete/events/', FavoriteToggleAPI.as_view()),
]
