from django.test import TestCase
from .models import Recipe, Ingredient, RecipeIngredient #importamos las 3 clases que tenemos

class RecipeIngredientTest(TestCase):

    def setUp(self):
        self.recipe = Recipe.objects.create (
            title="test recipe",
            time_minutes=10,
            difficulty="easy"
        )

    def test_scaling_continuous_unit(self):
        rice = Ingredient.objects.create(name="Arroz", unit="g")
        ri = RecipeIngredient.objects.create(
            recipe=self.recipe,
            ingredient=rice,
            quantity=80
        )

        self.assertEqual(ri.quantity_for(3), "240")

    def test_discrete_unit_fraction(self):
        egg = Ingredient.objects.create(name="huevo", unit="unidad")
        ri = RecipeIngredient.objects.create(
            recipe=self.recipe,
            ingredient= egg,
            quantity=0.5
        )

        self.assertEqual(ri.quantity_for(4), "2")

    def test_minimum_discrete_unit(self):
        garlic = Ingredient.objects.create(name="Ajo", unit="diente")
        ri = RecipeIngredient.objects.create(
            recipe=self.recipe,
            ingredient=garlic,
            quantity=0.2
        )

        self.assertEqual(ri.quantity_for(1), "1")

    def test_to_taste_ingredient(self):
        salt = Ingredient.objects.create(
            name="sal",
            unit="g",
            to_taste=True
        )
        ri = RecipeIngredient.objects.create(
            recipe=self.recipe,
            ingredient=salt,
            quantity=1
        )

        self.assertEqual(ri.quantity_for(4), "al gusto")
