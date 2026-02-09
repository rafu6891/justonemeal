from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import Q

from apps.recipes.models import Recipe
from .serializers import RecipeDetailSerializer, RecipeListSerializer

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
    
class RecipeListAPIView(APIView):
    def get(self, request):
        recipes = Recipe.objects.all()

        difficulty = request.GET.get("difficulty")
        max_time = request.GET.get("max_time")
        ingredient = request.GET.get("ingredient")
        exclude = request.GET.get("exclude")

        if difficulty:
            recipes = recipes.filter(difficulty = difficulty)

        if max_time:
            try:
                recipes = recipes.filter(time_minutes__lte = int(max_time))
            except ValueError:
                pass

        if ingredient:
            recipes = recipes.filter(
                ingredients__ingredient__name__icontains=ingredient
            ).distinct()

        if exclude:
            recipes = recipes.exclude(
                ingredients__ingredient__name__icontains=exclude
            )
        
        recipes = recipes.order_by("title")

        data = [
            {
                "id": recipe.id,
                "title": recipe.title,
                "time_minutes": recipe.time_minutes,
                "difficulty": recipe.difficulty,
            }
            for recipe in recipes
        ]

        serializer = RecipeListSerializer(data, many=True)
        return Response(serializer.data)