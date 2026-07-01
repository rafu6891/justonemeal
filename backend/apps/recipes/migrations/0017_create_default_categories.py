from django.db import migrations


def create_categories(apps, schema_editor):
    Category = apps.get_model("recipes", "Category")

    categories = [
        "Desayuno",
        "Comida",
        "Cena",
        "Postre",
        "Snack",
    ]

    for name in categories:
        Category.objects.get_or_create(name=name)


def delete_categories(apps, schema_editor):
    Category = apps.get_model("recipes", "Category")

    Category.objects.filter(
        name__in=[
            "Desayuno",
            "Comida",
            "Cena",
            "Postre",
            "Snack",
        ]
    ).delete()


class Migration(migrations.Migration):

    dependencies = [
        ("recipes", "0016_alter_ingredient_unit"),
    ]

    operations = [
        migrations.RunPython(
            create_categories,
            delete_categories,
        ),
    ]