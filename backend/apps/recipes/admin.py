from django.contrib import admin
from .models import Recipe, Ingredient, RecipeIngredient


# Register your models here.
class RecipeIngredientInline(admin.TabularInline):
    model = RecipeIngredient
    extra = 1


@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "difficulty",
        "time_minutes",
        "likes",
    )

    list_filter = (
        "difficulty",
    )

    search_fields = (
        "title",
        "description",
    )

    readonly_fields = (
        "created_at",
        "likes",
    )

    inlines = [RecipeIngredientInline]


@admin.register(Ingredient)
class IngredientAdmin(admin.ModelAdmin):
    list_display = ("name", "unit")
    search_fields = ("name",)
