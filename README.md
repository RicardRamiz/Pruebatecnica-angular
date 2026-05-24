# Pruebatecnica-angular

Dashboard de cursos construido con **Angular**, **TypeScript** y **SCSS**.  
Consume el API de inscripciones para mostrar el progreso de cursos, filtros por sector, búsqueda en tiempo real y ordenamiento.

La aplicación muestra un dashboard de cursos con:

Buscador por nombre de curso.
Tabs por estado:
Todos los cursos
En curso
Finalizados
Favoritos
Filtro por sector.
Ordenamiento.
Cards de cursos.
Progreso del curso.
Acciones para cursos finalizados.
Estados de carga, error y vacío.

---

## Tecnologías

- [Angular]
- [TypeScript]
- [SCSS]
- [RxJS]

---

## Requisitos previos

- **Node.js** 18.x o superior
- **Angular CLI** instalado globalmente:


## Instalación

Clonar el repositorio e instalar dependencias:

npm install

Levantar el servidor de desarrollo:

ng serve

Levantar el servidor de produccion:

ng build

## Estructura 

src/
├── app/
│   └── cursos/
│       ├── cursos.component.ts      # Lógica, estado y signals
│       ├── cursos.component.html    # Template con @if / @for
│       ├── cursos.component.scss    # Estilos del dashboard
│       ├── cursos.service.ts        # Consumo de API (HttpClient)
│       ├── cursos.types.ts          # Interfaces TypeScript
│       └── cursos.utils.ts          # Helpers y mapeo de datos
│
├── styles/
│   ├── _variables.scss                 # Tokens de color, sombras, etc.
│   ├── _mixins.scss                    # Mixins reutilizables
│   └── styles.scss                     # Estilos globales
│
├── app.component.ts                    # Componente raíz
├── app.config.ts                       # Configuración global (HttpClient)
└── main.ts                             # Bootstrap de la aplicación

## API consumida
GET https://besvc.capacitateparaelempleo.org/api/inscriptions/TestReport

## Tipado
Se definieron interfaces para representar la respuesta del endpoint:

TestReportResponse Person Inscription Curso Sector También se creó un tipo adaptado para la UI:

CursoCardItem

Esto evita acoplar directamente los componentes visuales a la estructura del API.

## Decisiones Tecnicas

Arquitectura por feature
Se decidió organizar el proyecto usando una arquitectura basada en features. La pantalla principal vive dentro de:

src/app/cursos

Esto permite agrupar componentes, servicios, tipos y utilidades relacionadas con la misma funcionalidad.

## Area de  Mejora

Agregar paginación o virtualización si el listado crece mucho.
Agregar el logo de Fundación Slim
Agregar un spiner loader en lugar de mensaje simple de carga.
Manejar  visual para imágenes rotas.
Mejorar accesibilidad con navegación completa por teclado.
Mejorar el mensaje en caso de no tener Favoritos 
Agregar variables de entorno para la URL base del API.
