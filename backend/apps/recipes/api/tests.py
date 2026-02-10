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


class RecipeIngredientFilterAPITest(TestCase):

    def setUp(self):
        self.client = APIClient()

        #ingredientes
        self.arroz = Ingredient.objects.create(name="Arroz", unit="g")
        self.huevo = Ingredient.objects.create(name="Huevo", unit="unidad")
        self.ajo = Ingredient.objects.create(name="Ajo", unit="diente")

        #Receta 1: arroz y huevo
        self.recipe1 = Recipe.objects.create(
            title = "Arroz con huevo",
            time_minutes = 10,
            difficulty = "easy"
        )
        RecipeIngredient.objects.create(
            recipe = self.recipe1, ingredient=self.arroz, quantity=80
        )
        RecipeIngredient.objects.create(
            reipe = self.recipe1, ingredient=self.huevo, quantity=1
        )

        #Receta 2: arroz y ajo
        self.recipe2 = Recipe.objects.create(
            title = "Arroz con ajo",
            time_minutes = 15,
            difficulty = "easy"
        )
        RecipeIngredient.objects.create(
            recipe = self.recipe2, ingredient=self.arroz, quantity=80
        )
        RecipeIngredient.objects.create(
            reipe = self.recipe2, ingredient=self.ajo, quantity=1
        )

    def test_filter_multiple_ingredients_include(self):
        response = self.client.get("/api/recipes/?ingredient=arroz,huevo")

        self.assertEqual(response.status_code, 200)
        titles = [r["title"] for r in response.data]

        self.assertIn("Arroz con huevo", titles)
        self.assertIn("Arroz con ajo", titles)

    
    def test_filter_multiple_excludes(self):
        response = self.client.get("/api/recipes/?exclude=ajo")

        self.assertEqual(response.status_code, 200)
        titles = [r["title"] for r in response.data]

        self.assertIn("Arroz con huevo", titles)
        self.assertNotIn("Arroz con ajo", titles)

    
    def test_filter_include_and_exclude(self):
        response = self.client.get("/api/recipes/?ingredient=arroz&exclude=ajo")

        self.assertEqual(response.status_code, 200)
        titles = [r["title"] for r in response.data]

        self.assertEqual(titles, ["Arroz con huevo"])

