# JustOneMeal 🍽️

```{=html}
<p align="center">
```
`<img src="frontend/public/images/logo-jom.png" alt="JustOneMeal" width="220">`{=html}
```{=html}
</p>
```
```{=html}
<p align="center">
```
`<strong>`{=html}Recetas pensadas para una sola
persona.`</strong>`{=html}`<br>`{=html} Cocina sin desperdiciar comida.
```{=html}
</p>
```

------------------------------------------------------------------------

## 📖 Descripción

**JustOneMeal** es una aplicación web desarrollada para personas que
cocinan para sí mismas.

La mayoría de las recetas de Internet están pensadas para varias
personas, lo que suele provocar desperdicio de comida o la necesidad de
recalcular cantidades.

JustOneMeal nace con un objetivo sencillo:

-   🍽️ Recetas para un único comensal.
-   🥗 Ingredientes ajustados a una sola ración.
-   ⏱️ Preparaciones sencillas y rápidas.
-   ❤️ Una experiencia limpia, intuitiva y agradable.

------------------------------------------------------------------------

# ✨ Funcionalidades

-   ✅ Listado de recetas
-   ✅ Búsqueda por nombre
-   ✅ Filtrado por dificultad
-   ✅ Filtrado por categoría
-   ✅ Filtrado por tiempo de preparación
-   ✅ Categorías múltiples por receta
-   ✅ Sistema de "Likes"
-   ✅ Imágenes para cada receta
-   ✅ Imagen por defecto cuando la receta no tiene fotografía
-   ✅ Ingredientes con cantidades y unidades
-   ✅ Preparación paso a paso
-   ✅ Paginación
-   ✅ Panel de administración de Django

------------------------------------------------------------------------

# 🛠️ Tecnologías

## Backend

-   Python
-   Django
-   Django REST Framework
-   PostgreSQL

## Frontend

-   React
-   JavaScript
-   CSS

## Herramientas

-   Git
-   GitHub
-   Ubuntu
-   Visual Studio Code

------------------------------------------------------------------------

# 📸 Capturas

### Página principal

> Añadir una captura de la página principal.

### Panel de administración

> Añadir una captura del panel de administración.

------------------------------------------------------------------------

# 🚀 Instalación

## Clonar el repositorio

``` bash
git clone https://github.com/TU_USUARIO/JustOneMeal.git
```

## Backend

``` bash
cd backend
python -m venv venv
```

### Linux

``` bash
source venv/bin/activate
```

### Windows

``` bash
venv\Scripts\activate
```

Instalar dependencias:

``` bash
pip install -r requirements.txt
```

Aplicar migraciones:

``` bash
python manage.py migrate
```

Crear un administrador:

``` bash
python manage.py createsuperuser
```

Ejecutar el servidor:

``` bash
python manage.py runserver
```

## Frontend

``` bash
cd frontend
npm install
npm start
```

------------------------------------------------------------------------

# ⚙️ Variables de entorno

Crear un archivo `.env` en la carpeta `backend`.

``` env
SECRET_KEY=your-secret-key

DB_NAME=your_database
DB_USER=your_database_user
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
```

------------------------------------------------------------------------

# 📂 Estructura del proyecto

``` text
JustOneMeal
│
├── backend
│   ├── apps
│   ├── config
│   ├── media
│   ├── manage.py
│   └── requirements.txt
│
├── frontend
│   ├── public
│   ├── src
│   └── package.json
│
└── README.md
```

------------------------------------------------------------------------

# 🎯 Roadmap

## Completado

-   [x] Backend con Django REST Framework
-   [x] Frontend en React
-   [x] PostgreSQL
-   [x] Sistema de imágenes
-   [x] Categorías múltiples
-   [x] Paginación
-   [x] Diseño personalizado
-   [x] Branding propio

## Próximas mejoras

-   [ ] Información nutricional
-   [ ] Página individual de receta
-   [ ] Diseño responsive
-   [ ] Autenticación de usuarios
-   [ ] Favoritos por usuario
-   [ ] Comentarios
-   [ ] Valoraciones
-   [ ] Compartir recetas
-   [ ] Modo oscuro

------------------------------------------------------------------------

# 💡 Objetivo del proyecto

JustOneMeal forma parte de mi portfolio como desarrollador Full Stack y
representa un proyecto real desarrollado desde cero utilizando Django,
React y PostgreSQL.

El objetivo es construir una aplicación útil, escalable y preparada para
producción aplicando buenas prácticas tanto en backend como en frontend.

------------------------------------------------------------------------

# 👨‍💻 Autor

**Rafael Arrabal**

Desarrollador Full Stack \| Python \| Django \| React

GitHub: https://github.com/TU_USUARIO

LinkedIn: https://www.linkedin.com/in/TU_PERFIL
