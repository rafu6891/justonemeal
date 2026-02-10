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
        ingredient_param = request.GET.get("ingredient")
        exclude_param = request.GET.get("exclude")
        ingredient_all_param = request.GET.get("ingredient_all")

        if difficulty:
            recipes = recipes.filter(difficulty = difficulty)

        if max_time:
            try:
                recipes = recipes.filter(time_minutes__lte = int(max_time))
            except ValueError:
                pass

        if ingredient_param:
            ingredients = [i.strip() for i in ingredient_param.split(",") if i.strip()]

            query = Q()
            for ing in ingredients:
                query |= Q(ingredients__ingredient__name__icontains=ing)
            
            recipes = recipes.filter(query).distinct()

        if ingredient_all_param:
            ingredients_all = [
                i.strip() for i in ingredient_all_param.split(",") if i.strip()
            ]

            for ing in ingredients_all:
                recipes = recipes.filter(
                    ingredients__ingredient__name__icontains=ing
                )

        if exclude_param:
            excludes = [e.strip() for e in exclude_param.split(",") if e.strip()]

            for ex in excludes:
                recipes = recipes.exclude(
                    ingredients__ingredient__name__icontains=ex
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