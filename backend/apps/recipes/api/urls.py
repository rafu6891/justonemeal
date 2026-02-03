from django.urls import path
from.views import RecipeDetailAPIView

urlpatterns = [
    path("recipes/<int:recipe_id>/", RecipeDetailAPIView.as_view()),
]
