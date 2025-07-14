from django.urls import path

from favorites.views.favorite import FavoriteToggleAPI, FavoriteListAPI

urlpatterns = [
    # добавление удаление избранных площадок и мероприятий
    path('add-delete/events/', FavoriteToggleAPI.as_view()),
    # список избранных
    path('list/favorite/', FavoriteListAPI.as_view()),
]
