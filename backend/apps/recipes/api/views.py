from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import Q
from drf_spectacular.utils import extend_schema, OpenApiParameter
from drf_spectacular.types import OpenApiTypes
from rest_framework.pagination import PageNumberPagination

from apps.recipes.models import Recipe
from .serializers import RecipeDetailSerializer, RecipeListSerializer
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator

from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework import status
from django.shortcuts import get_object_or_404




class RecipePagination(PageNumberPagination):
    page_size = 10

    
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
   
@extend_schema(
    parameters=[
        OpenApiParameter(
            name="difficulty",
            type=OpenApiTypes.STR,
            location=OpenApiParameter.QUERY,
            description="Filter recipes by difficulty",
        ),
        OpenApiParameter(
            name="max_time",
            type=OpenApiTypes.INT,
            location=OpenApiParameter.QUERY,
            description="Maximum preparation time in minutes",
        ),
        OpenApiParameter(
            name="ingredient",
            type=OpenApiTypes.STR,
            location=OpenApiParameter.QUERY,
            description="Recipes containing any of these ingredients (comma separated)",
        ),
        OpenApiParameter(
            name="ingredient_all",
            type=OpenApiTypes.STR,
            location=OpenApiParameter.QUERY,
            description="Recipes containing all these ingredients (comma separated)",
        ),
        OpenApiParameter(
            name="exclude",
            type=OpenApiTypes.STR,
            location=OpenApiParameter.QUERY,
            description="Exclude recipes containing these ingredients",
        ),
        OpenApiParameter(
            name="order",
            type=OpenApiTypes.STR,
            location=OpenApiParameter.QUERY,
            description="Order recipes by title, time_minutes or difficulty. Use - for descending.",
        ),
    ]
)
@method_decorator(cache_page(60), name="get")   
class RecipeListAPIView(APIView):
    permission_classes = []
    def get(self, request):
        recipes = Recipe.objects.filter(approved=True)
        difficulty = request.GET.get("difficulty")
        max_time = request.GET.get("max_time")
        ingredient_param = request.GET.get("ingredient")
        exclude_param = request.GET.get("exclude")
        ingredient_all_param = request.GET.get("ingredient_all")
        search = request.GET.get("search")
        order = request.GET.get("order")

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
        if search:
            recipes = recipes.filter(title__icontains=search)

        allowed_order_fields = [
            "title",
            "time_minutes",
            "difficulty",
            "likes",
        ]

        if order:
            order_field = order.lstrip("-")

            if order_field in allowed_order_fields:
                recipes = recipes.order_by(order)
            else:
                recipes = recipes.order_by("title")
        else:
            recipes = recipes.order_by("title")


        paginator = RecipePagination()
        page = paginator.paginate_queryset(recipes, request)


        data = [
            {
                "id": recipe.id,
                "title": recipe.title,
                "description": recipe.description,
                "time_minutes": recipe.time_minutes,
                "difficulty": recipe.difficulty,
                "likes": recipe.likes,

                "ingredients": [
                    {
                        "name": ri.ingredient.name,
                        "quantity": ri.quantity,
                        "unit": ri.ingredient.unit,
                    }
                    for ri in recipe.ingredients.all()
                ],
            }
            for recipe in page
        ]

        return paginator.get_paginated_response(data)
    
    def post(self, request):
        recipe = Recipe.objects.create(
            title=request.data.get("title"),
            time_minutes=request.data.get("time_minutes"),
            difficulty=request.data.get("difficulty"),
            approved=True,
        )

        return Response({
            "id": recipe.id,
            "title": recipe.title,
        })
    

class RecipeLikeAPIView(APIView):

    def post(self, request, recipe_id):
        recipe = get_object_or_404(Recipe, id=recipe_id)

        recipe.likes += 1
        recipe.save()

        return Response({
            "likes": recipe.likes
        })
    

