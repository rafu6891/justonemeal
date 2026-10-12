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
    calories = serializers.IntegerField(allow_null=True, required=False)
    servings = serializers.IntegerField()
    ingredients = IngredientOutputSerializer(many=True)

class RecipeListSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    title = serializers.CharField()
    time_minutes = serializers.IntegerField()
    difficulty = serializers.CharField()
    calories = serializers.IntegerField(allow_null=True, required=False)
