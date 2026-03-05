# JustOneMeal API

API REST para gestionar recetas pensadas para **una sola persona**, con cantidades escalables para evitar desperdicio de comida.

El objetivo del proyecto es resolver un problema común: la mayoría de recetas están pensadas para varias personas, lo que genera sobras innecesarias.
**JustOneMeal** permite calcular cantidades exactas para el número de comensales deseado.

---

# Características

* Recetas optimizadas para **1 persona**
* Escalado automático de ingredientes
* Fracciones legibles (½, ¼, ¾)
* Ingredientes opcionales **"al gusto"**
* Filtros avanzados en la API
* Tests automáticos
* API REST preparada para frontend o app móvil

---

# Tecnologías utilizadas

* Python
* Django
* Django REST Framework
* SQLite (desarrollo)
* Git / GitHub

---

# Instalación

Clonar el repositorio:

```
git clone https://github.com/tuusuario/justonemeal.git
cd justonemeal
```

Crear entorno virtual:

```
python -m venv venv
```

Activar entorno virtual

Windows:

```
venv\Scripts\activate
```

Mac / Linux:

```
source venv/bin/activate
```

Instalar dependencias:

```
pip install -r backend/requirements.txt
```

Aplicar migraciones:

```
python manage.py migrate
```

Ejecutar servidor:

```
python manage.py runserver
```

---

# Base URL de la API

```
http://127.0.0.1:8000/api/
```

---

# Endpoints

## Listar recetas

```
GET /api/recipes/
```

Devuelve todas las recetas disponibles.

### Parámetros opcionales

**difficulty**

Filtra por dificultad.

```
/api/recipes/?difficulty=easy
```

---

**max_time**

Filtra por tiempo máximo de preparación.

```
/api/recipes/?max_time=20
```

---

**ingredient**

Devuelve recetas que contienen **alguno** de los ingredientes indicados (OR).

```
/api/recipes/?ingredient=arroz,huevo
```

---

**ingredient_all**

Devuelve recetas que contienen **todos** los ingredientes indicados (AND).

```
/api/recipes/?ingredient_all=arroz,huevo
```

---

**exclude**

Excluye recetas que contienen ciertos ingredientes.

```
/api/recipes/?exclude=ajo,cebolla
```

---

## Detalle de receta

```
GET /api/recipes/{id}/
```

Devuelve la información completa de una receta.

### Parámetro opcional

**servings**

Número de personas para las que se quiere calcular la receta.

```
/api/recipes/1/?servings=3
```

---

# Ejemplo de respuesta

```json
{
  "id": 1,
  "title": "Pasta con verduras",
  "time_minutes": 20,
  "difficulty": "easy",
  "servings": 3,
  "ingredients": [
    {
      "name": "Pasta",
      "quantity": "240",
      "unit": "g"
    },
    {
      "name": "Huevo",
      "quantity": "1½",
      "unit": "unidad"
    },
    {
      "name": "Sal",
      "quantity": "al gusto",
      "unit": ""
    }
  ]
}
```

---

# Tests

Ejecutar todos los tests:

```
python manage.py test apps.recipes
```

---

# Decisiones de diseño

* Las cantidades base de los ingredientes siempre se almacenan para **1 persona**.
* El cálculo de cantidades se realiza en el backend.
* Las cantidades se devuelven como **texto** para permitir fracciones y valores como "al gusto".
* La API es **read-only** en esta primera versión.

---

# Futuras mejoras

* Autenticación de usuarios
* Guardar recetas favoritas
* Paginación
* Búsqueda avanzada de ingredientes
* Frontend web

---

# Licencia

Proyecto con fines educativos.
