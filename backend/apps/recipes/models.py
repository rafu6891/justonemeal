from django.db import models
from django.contrib.auth.models import User

DISCRETE_UNITS = {
    "unit",
    "slice",
    "clove",
    "piece",
    "leaf",
    "fillet",
    "egg",
}

FRACTIONS = {
    0.25: "1/4",
    0.5: "1/2",
    0.75: "3/4",
}


UNIT_CHOICES = [
    ("g", "g"),
    ("kg", "kg"),
    ("ml", "ml"),
    ("l", "l"),

    ("tbsp", "cda"),
    ("tsp", "cdta"),

    ("unit", "ud"),
    ("slice", "rebanada"),
    ("clove", "diente"),
    ("piece", "pieza"),
    ("leaf", "hoja"),
    ("fillet", "filete"),
    ("egg", "huevo"),
]


DIFFICULTY_CHOICES = [
    ("easy", "Fácil"),
    ("medium", "Media"),
    ("hard", "Difícil"),
]

class Category(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


#models de recetas, lo basico
class Recipe(models.Model):
    title = models.CharField(max_length=200) #nombre de la receta
    description = models.TextField(blank=True) #descripcion de la receta
    instructions = models.TextField(blank=True)
    categories = models.ManyToManyField(Category, blank=True,)
    time_minutes = models.PositiveBigIntegerField() #tiempo en minutos
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES,) #dificultad de preparacion
    created_at = models.DateTimeField(auto_now_add=True) #creacion de la receta
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True,)
    likes = models.IntegerField(default=0)
    image = models.ImageField(upload_to="recipes/", blank=True, null=True,)

    def __str__(self):
        return self.title


class Ingredient(models.Model):
    name = models.CharField(max_length=100)

    unit = models.CharField(
        max_length=20,
        choices=UNIT_CHOICES,
    )

    to_taste = models.BooleanField(default=False)

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
        if self.ingredient.to_taste:
            return "al gusto"
        
        value = self.quantity * servings
        unit = self.ingredient.unit.lower()

        if unit in DISCRETE_UNITS:
            
            if 0 < value < 1:
                return "1"
            
            integer = int(value)
            decimal = round(value - integer, 2)

            if decimal in FRACTIONS:
                fraction = FRACTIONS[decimal]
                return f"{integer}{fraction}" if integer > 0 else fraction
            
            return str(round(value,2)).rstrip("0").rstrip(".")
        
        return str(round(value, 1))
    
    def __str__(self):
        return f"{self.quantity} {self.ingredient.unit} {self.ingredient.name}"
    
    
class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'recipe')