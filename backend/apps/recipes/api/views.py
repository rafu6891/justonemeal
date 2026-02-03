from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from apps.recipes.models import Recipe
from .serializers import RecipeDetailSerializer

class RecipeDetailAPIView(APIView):
    def get(self, request, recipe_id):
        try:
            servings = int(request.GET.get("servings", 1))
        except ValueError:
            servings = 1
        
        servings = max(1, min(servings, 6))
        
        recipe = get_object_or_404(Recipe, id=recipe_id)

        ingredients = []
        for ri in recipe.ingredients.all():
            ingredients.append({
                "name": ri.ingredient.name,
                "quantity": ri.quantity_for(servings),
                "unit": "" if ri.ingredient.to_taste else ri.ingredient.unit,
            })
        
        data = {
            "id": recipe.id,
            "title": recipe.title,
            "time_minutes": recipe.time_minutes,
            "difficulty": recipe.difficulty,
            "servings": servings,
            "ingredients": ingredients,
        }

        serializer = RecipeDetailSerializer(data)
        return Response(serializer.data)