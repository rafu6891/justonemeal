from django.test import TestCase
from rest_framework.test import APIClient
from apps.recipes.models import Recipe, Ingredient, RecipeIngredient


class RecipeAPITest(TestCase):

    def setUp(self):
        self.client = APIClient()
        Recipe.objects.create(title='Receta A', time_minutes=10, difficulty='easy')
        Recipe.objects.create(title='Receta B', time_minutes=20, difficulty='medium')

    def test_recipe_list(self):
        response = self.client.get("/api/recipes/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)

        self.assertIn('title', response.data[0])
        self.assertIn('time_minutes', response.data[0])
        self.assertIn('difficulty', response.data[0])


class RecipeDetailAPITest(TestCase):

    def setUp(self):
        self.client = APIClient()

        self.recipe = Recipe.objects.create(
            title = "Receta Test",
            time_minutes = 10,
            difficulty = "easy"
        )

        rice = Ingredient.objects.create(name="arroz", unit="g")
        RecipeIngredient.objects.create(
            recipe = self.recipe,
            ingredient = rice,
            quantity = 80
        )

    def test_recipe_detail_with_servings(self):
        response = self.client.get(f"/api/recipes/{self.recipe.id}/?servings=2")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["servings"], 2)

        ingredient = response.data["ingredients"][0]
        self.assertEqual(ingredient["quantity"], "160")
        self.assertEqual(ingredient["unit"], "g")