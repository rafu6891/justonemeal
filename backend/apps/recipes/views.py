from django.shortcuts import render, get_object_or_404
from .models import Recipe


def recipe_detail(request, recipe_id):
    servings = int(request.GET.get("servings", 1))
    recipe = get_object_or_404(Recipe, id=recipe_id)

    ingredients = []
    for ri in recipe.ingredients.all():
        ingredients.append({
            "name": ri.ingredient.name,
            "unit": ri.ingredient.unit,
            "quantity": ri.quantity_for(servings),
        })

    context = {
        "recipe": recipe,
        "servings": servings,
        "ingredients": ingredients,
    }

    return render(request, "recipes/recipe_detail.html", context)
