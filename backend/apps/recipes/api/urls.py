from django.urls import path
from.views import RecipeDetailAPIView, RecipeListAPIView, RecipeLikeAPIView

urlpatterns = [
    path("recipes/", RecipeListAPIView.as_view()),
    path("recipes/<int:recipe_id>/", RecipeDetailAPIView.as_view()),
    path("recipes/<int:recipe_id>/like/", RecipeLikeAPIView.as_view()),
]
