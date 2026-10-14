from django.core.management.base import BaseCommand
from apps.recipes.models import Recipe


class Command(BaseCommand):
    help = "Separa los pasos de preparación de las recetas importadas"

    RECIPES = {
        "Tostada con tomate y aceite de oliva": [
            "Tuesta el pan hasta que esté dorado.",
            "Ralla el tomate.",
            "Extiende el tomate sobre el pan.",
            "Añade el aceite de oliva y una pizca de sal.",
        ],
        "Tortilla francesa": [
            "Bate los huevos con una pizca de sal.",
            "Calienta el aceite en una sartén.",
            "Añade el huevo batido.",
            "Cocina a fuego medio y dobla la tortilla cuando esté cuajada a tu gusto.",
        ],
        "Lentejas estofadas": [
            "Pela y corta la zanahoria, la patata y la cebolla.",
            "Pon las lentejas en una olla con las verduras, el ajo, el pimentón y el aceite.",
            "Cubre con agua.",
            "Cuece a fuego suave hasta que las lentejas estén tiernas, añadiendo agua si hace falta.",
            "Ajusta de sal.",
        ],
        "Pollo al ajillo": [
            "Corta el pollo en trozos.",
            "Pela y lamina los ajos.",
            "Dora el pollo con el aceite.",
            "Añade el ajo y cocina unos minutos sin quemarlo.",
            "Incorpora el vino blanco y deja reducir hasta que el pollo esté bien cocinado.",
            "Ajusta de sal y añade el perejil.",
        ],
        "Tortilla de patatas individual": [
            "Pela y corta la patata en láminas finas.",
            "Cocina la patata a fuego suave con parte del aceite hasta que esté tierna.",
            "Bate los huevos con sal.",
            "Escurre la patata y mézclala con el huevo.",
            "Cuaja la tortilla en una sartén con un poco de aceite, dándole la vuelta con cuidado.",
        ],
        "Merluza a la plancha": [
            "Seca la merluza con papel de cocina.",
            "Calienta una sartén con el aceite.",
            "Cocina el pescado por ambos lados hasta que esté hecho.",
            "Añade el ajo picado al final para que no se queme.",
            "Sirve con perejil y zumo de limón.",
        ],
        "Arroz con leche": [
            "Calienta la leche con la piel de limón y la canela.",
            "Añade el arroz y cocina a fuego muy suave, removiendo con frecuencia.",
            "Cuando el arroz esté tierno, incorpora el azúcar.",
            "Retira el limón y la canela.",
            "Deja templar y refrigera si lo prefieres frío.",
        ],
        "Flan de huevo": [
            "Precalienta el horno a 160 °C.",
            "Calienta el azúcar con un poco de agua hasta obtener caramelo y repártelo en un molde pequeño resistente al horno.",
            "Bate el huevo con la leche y el azúcar restante.",
            "Vierte la mezcla en el molde.",
            "Hornea al baño maría hasta que cuaje.",
            "Enfría antes de desmoldar.",
        ],
        "Pan con tomate y jamón serrano": [
            "Tuesta ligeramente el pan.",
            "Ralla el tomate y extiéndelo sobre el pan.",
            "Añade el aceite de oliva.",
            "Coloca encima el jamón serrano y sirve.",
        ],
        "Almendras tostadas": [
            "Precalienta el horno a 170 °C.",
            "Extiende las almendras en una bandeja.",
            "Tuéstalas durante unos 8-10 minutos, vigilando que no se quemen.",
            "Deja enfriar y añade una pizca de sal si lo deseas.",
        ],
    }

    def add_arguments(self, parser):
        parser.add_argument(
            "--dry-run",
            action="store_true",
            help="Muestra los cambios sin guardar nada",
        )

    def handle(self, *args, **options):
        dry_run = options["dry_run"]
        updated = 0
        missing = 0

        for title, steps in self.RECIPES.items():
            recipe = Recipe.objects.filter(title=title).first()

            if recipe is None:
                self.stdout.write(
                    self.style.WARNING(f"No encontrada: {title}")
                )
                missing += 1
                continue

            instructions = "\n".join(steps)

            if recipe.instructions == instructions:
                self.stdout.write(f"Sin cambios: {title}")
                continue

            if not dry_run:
                recipe.instructions = instructions
                recipe.save(update_fields=["instructions"])

            updated += 1
            action = "Se actualizaría" if dry_run else "Actualizada"
            self.stdout.write(f"{action}: {title}")

        self.stdout.write("")
        self.stdout.write(
            f"Recetas {'que se actualizarían' if dry_run else 'actualizadas'}: "
            f"{updated}. No encontradas: {missing}."
        )