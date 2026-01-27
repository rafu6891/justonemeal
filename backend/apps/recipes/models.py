from django.db import models

#models de recetas, lo basico
class Recipe(models.Model):
    title = models.CharField(max_length=200) #nombre de la receta
    description = models.TextField(blank=True) #descripcion de la receta
    time_minutes = models.PositiveBigIntegerField() #tiempo en minutos
    difficulty = models.CharField(max_length=20) #dificultad de preparacion
    created_at = models.DateTimeField(auto_now_add=True) #creacion de la receta

    def __str__(self):
        return self.title


class Ingredient(models.Model):
    name = models.CharField(max_length=100)
    unit = models.CharField(max_length=20) #para las unidades de medida

    def __str__(self):
        return self.name
    

class RecipeIngredient(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='ingredients')
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    quantity = models.FloatField() #cantidad para 1 persona

    def quantity_for(self, servings): # para multiplicar cantidades para mas personas
        return self.quantity * servings
    
    def __str__(self):
        return f"{self.quantity} {self.Ingredient.unit} {self.Ingredient.name}"