from django.urls import path
from.views import RecipeDetailAPIView, RecipeListAPIView, FavoriteAPIView

urlpatterns = [
    path("recipes/", RecipeListAPIView.as_view()),
    path("recipes/<int:recipe_id>/", RecipeDetailAPIView.as_view()),
    path("favorites/", FavoriteAPIView.as_view()),
    path("favorites/<int:recipe_id>/", FavoriteAPIView.as_view()),
]
