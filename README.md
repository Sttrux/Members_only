# Members Only

Aplicación web de un club privado desarrollada con **Node.js, Express y PostgreSQL**.

Los usuarios pueden registrarse, autenticarse y crear publicaciones. Las publicaciones son visibles para todos los visitantes, pero la identidad del autor solo está disponible para usuarios que forman parte del club.

## Requisitos

* Node.js 18+
* npm
* PostgreSQL 14+

## Instalación

Clona el repositorio e instala las dependencias:

```bash
git clone <URL_DEL_REPOSITORIO>
cd Members-Only
npm install
```

Crea un archivo `.env` en la raíz del proyecto:

```env
LISTEN_PORT=8080
DATABASE_URL=postgresql://usuario:password@localhost:5432/members_only
SECRET=tu_secreto
```

Crea la base de datos PostgreSQL:

```sql
CREATE DATABASE members_only;
```

Configura la estructura de la base de datos y ejecuta la aplicación:

```bash
node app.js
```

La aplicación estará disponible en:

```text
http://localhost:8080
```

Para desarrollo también puedes utilizar:

```bash
node --watch app.js
```

## Funcionalidades

### Autenticación

* Registro de usuarios.
* Inicio y cierre de sesión.
* Autenticación mediante **Passport Local**.
* Persistencia de sesión mediante **express-session**.
* Hashing de contraseñas con **bcryptjs**.
* Serialización y deserialización de usuarios.

### Publicaciones

* Creación de publicaciones.
* Título y contenido.
* Registro automático de fecha y hora.
* Asociación de cada publicación con su autor.
* Visualización de publicaciones para usuarios autenticados y no autenticados.
* Visualización del autor únicamente para miembros.

### Membresía

Los usuarios cuentan con un estado de membresía que determina el nivel de información que pueden visualizar dentro del club.

```text
Visitante
   │
   └── Puede visualizar publicaciones

Usuario autenticado
   │
   └── Puede crear publicaciones

Miembro
   │
   └── Puede visualizar el autor de las publicaciones
```

## Tecnologías

### Backend

* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [Passport.js](https://www.passportjs.org/)
* [bcryptjs](https://www.npmjs.com/package/bcryptjs)
* [express-session](https://www.npmjs.com/package/express-session)
* [express-validator](https://express-validator.github.io/)

### Frontend

* HTML5
* CSS3
* EJS
* JavaScript

### Base de datos

* PostgreSQL

### Herramientas

* Git
* GitHub
* npm
* dotenv

## Estructura de datos

La aplicación utiliza PostgreSQL para gestionar usuarios y publicaciones.

```text
users
│
│ 1
│
│ N
▼
posts
```

### `users`

| Campo       | Descripción               |
| ----------- | ------------------------- |
| `id`        | Identificador del usuario |
| `username`  | Nombre de usuario         |
| `email`     | Correo electrónico        |
| `password`  | Contraseña protegida      |
| `is_member` | Estado de membresía       |

### `posts`

| Campo        | Descripción                     |
| ------------ | ------------------------------- |
| `id`         | Identificador de la publicación |
| `title`      | Título                          |
| `text`       | Contenido                       |
| `created_at` | Fecha y hora de creación        |
| `user_id`    | Usuario que creó la publicación |

`posts.user_id` es una clave foránea que referencia a `users.id`.

La fecha de creación se genera automáticamente mediante un valor `DEFAULT` en PostgreSQL.

## Arquitectura

El proyecto sigue una separación básica de responsabilidades entre rutas, controladores, modelos y acceso a base de datos.

```text
                    ┌──────────────┐
                    │    Browser   │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │    Routes    │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │ Controllers  │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │    Models    │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │  PostgreSQL  │
                    └──────────────┘
```

Passport.js y `express-session` se integran en el flujo de autenticación para mantener la identidad del usuario durante su sesión.

## Seguridad

El proyecto incorpora mecanismos básicos de seguridad para la gestión de usuarios:

* Contraseñas almacenadas mediante hashing.
* Autenticación basada en sesiones.
* Variables sensibles almacenadas mediante variables de entorno.
* Validación y sanitización de datos de entrada.
* Restricción de acciones según el estado de autenticación y membresía.

El archivo `.env` no debe incluirse en el repositorio.

## Objetivo del proyecto

**Members Only** forma parte del proceso de aprendizaje de desarrollo backend con Node.js.

El proyecto está orientado a practicar conceptos fundamentales como:

* Desarrollo de aplicaciones con Express.
* Arquitectura basada en rutas, controladores y modelos.
* Consultas SQL y PostgreSQL.
* Relaciones entre entidades mediante claves foráneas.
* Autenticación y autorización.
* Gestión de sesiones.
* Hashing de contraseñas.
* Middleware.
* Validación y sanitización.
* Operaciones CRUD.

## Estado

🚧 **En desarrollo**

Se continuarán incorporando funcionalidades y mejoras conforme avance el desarrollo del proyecto.
