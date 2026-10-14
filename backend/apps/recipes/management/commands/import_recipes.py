import json
from pathlib import Path

from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from django.core.files import File

from apps.recipes.models import Recipe, Ingredient, RecipeIngredient, Category


class Command(BaseCommand):
    help = "Importa recetas desde un archivo JSON"

    def add_arguments(self, parser):
        parser.add_argument(
            "archivo",
            type=str,
            help="Ruta del archivo JSON con las recetas",
        )
        parser.add_argument(
            "--imagenes",
            type=str,
            default=None,
            help="Carpeta que contiene las fotografías",
        )

    def handle(self, *args, **options):
        archivo = Path(options["archivo"])
        carpeta_imagenes = (
            Path(options["imagenes"])
            if options["imagenes"]
            else None
        )

        if not archivo.is_file():
            raise CommandError(
                f"No se encuentra el archivo: {archivo}"
            )

        try:
            with archivo.open("r", encoding="utf-8") as f:
                recetas = json.load(f)
        except json.JSONDecodeError as exc:
            raise CommandError(
                f"El JSON no es válido: {exc}"
            )

        if not isinstance(recetas, list):
            raise CommandError(
                "El archivo JSON debe contener una lista de recetas."
            )

        importadas = 0
        omitidas = 0

        for datos in recetas:
            titulo = datos.get("title", "").strip()

            if not titulo:
                self.stderr.write(
                    self.style.ERROR(
                        "Receta omitida: falta el título."
                    )
                )
                omitidas += 1
                continue

            if Recipe.objects.filter(title__iexact=titulo).exists():
                self.stdout.write(
                    f"Ya existe «{titulo}». Se omite."
                )
                omitidas += 1
                continue

            try:
                with transaction.atomic():
                    categorias = []
                    for nombre in datos.get("categories", []):
                        categoria = Category.objects.filter(
                            name__iexact=nombre.strip()
                        ).first()

                        if not categoria:
                            raise ValueError(
                                f"No existe la categoría «{nombre}»."
                            )

                        categorias.append(categoria)

                    receta = Recipe.objects.create(
                        title=titulo,
                        description=datos.get("description", ""),
                        instructions=datos.get("instructions", ""),
                        time_minutes=datos["time_minutes"],
                        difficulty=datos["difficulty"],
                        calories=datos.get("calories"),
                    )

                    receta.categories.set(categorias)

                    nombre_imagen = datos.get("image")
                    if nombre_imagen and carpeta_imagenes:
                        ruta_imagen = carpeta_imagenes / nombre_imagen

                        if ruta_imagen.is_file():
                            with ruta_imagen.open("rb") as imagen:
                                receta.image.save(
                                    ruta_imagen.name,
                                    File(imagen),
                                    save=True,
                                )
                        else:
                            self.stderr.write(
                                self.style.WARNING(
                                    f"No se encuentra la imagen "
                                    f"«{nombre_imagen}» para «{titulo}»."
                                )
                            )

                    for item in datos.get("ingredients", []):
                        nombre = item["name"].strip()
                        unidad = item["unit"]
                        cantidad = float(item["quantity"])

                        ingrediente = Ingredient.objects.filter(
                            name__iexact=nombre
                        ).first()

                        if ingrediente:
                            if ingrediente.unit != unidad:
                                raise ValueError(
                                    f"El ingrediente «{nombre}» ya existe "
                                    f"con unidad «{ingrediente.unit}», "
                                    f"pero la receta necesita «{unidad}»."
                                )
                        else:
                            ingrediente = Ingredient.objects.create(
                                name=nombre,
                                unit=unidad,
                                to_taste=item.get("to_taste", False),
                                is_pantry_item=item.get(
                                    "is_pantry_item", False
                                ),
                            )

                        RecipeIngredient.objects.create(
                            recipe=receta,
                            ingredient=ingrediente,
                            quantity=cantidad,
                        )

                importadas += 1
                self.stdout.write(
                    self.style.SUCCESS(f"Importada: {titulo}")
                )

            except (KeyError, TypeError, ValueError) as exc:
                omitidas += 1
                self.stderr.write(
                    self.style.ERROR(
                        f"Error en «{titulo}»: {exc}"
                    )
                )

        self.stdout.write("")
        self.stdout.write(
            self.style.SUCCESS(
                f"Proceso terminado. Importadas: {importadas}. "
                f"Omitidas: {omitidas}."
            )
        )