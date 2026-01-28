from django.db import models

DISCRETE_UNITS = {
    "unidad", "u", "pieza", "diente", "rodaja", "hoja", "filete"
}

FRACTIONS = {
    0.25: "1/4",
    0.5: "1/2",
    0.75: "3/4",
}

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
    recipe = models.ForeignKey(
        Recipe, 
        on_delete=models.CASCADE, 
        related_name='ingredients'
    )
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    quantity = models.FloatField() #cantidad para 1 persona

    def quantity_for(self, servings): # para multiplicar cantidades para mas personas y redondear las cantidades
        value = self.quantity * servings

        unit = self.ingredient.unit.lower()

        if unit in DISCRETE_UNITS:
            integer = int(value)
            decimal = round(value - integer, 2)

            if decimal in FRACTIONS:
                fraction = FRACTIONS[decimal]
                return f"{integer}{fraction}" if integer > 0 else fraction
            
            return str(round(value,2)).rstrip("0").rstrip(".")
        
        return str(round(value, 1))
    
    def __str__(self):
        return f"{self.quantity} {self.Ingredient.unit} {self.Ingredient.name}"