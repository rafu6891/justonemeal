from django.urls  import path
from .views import recipe_detail

urlpatterns = [
    path("<int:recipe_id>/", recipe_detail, name="recipe_detail"),
]