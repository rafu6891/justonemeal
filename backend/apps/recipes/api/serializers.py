from rest_framework import serializers
from apps.recipes.models import Recipe

class IngredientOutputSerializer(serializers.Serializer):
    name = serializers.CharField()
    quantity = serializers.CharField()
    unit = serializers.CharField()

class RecipeDetailSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    title = serializers.CharField()
    time_minutes = serializers.IntegerField()
    difficulty = serializers.CharField()
    servings = serializers.IntegerField()
    ingredients = IngredientOutputSerializer(many=True)