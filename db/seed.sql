CREATE DATABASE "social-demo" WITH OWNER strux;

-- Después de crear la BD, conéctate a social-demo
-- \c "social-demo"

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    is_member BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(255) NOT NULL,
    text VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

-- =========================================================
-- DEMO DATA
-- =========================================================
-- IMPORTANTE:
-- Las contraseñas deben ser hashes generados con bcrypt.
-- Estos valores son solamente ejemplos de hashes.
-- Genera los tuyos con bcrypt.hash() desde Node.

INSERT INTO users (username, password, email, is_member)
VALUES
    (
        'strux',
        '$2b$10$REEMPLAZAR_CON_HASH_REAL',
        'strux@example.com',
        TRUE
    ),
    (
        'juan',
        '$2b$10$REEMPLAZAR_CON_HASH_REAL',
        'juan@example.com',
        FALSE
    ),
    (
        'maria',
        '$2b$10$REEMPLAZAR_CON_HASH_REAL',
        'maria@example.com',
        TRUE
    );

INSERT INTO posts (title, text, user_id)
VALUES
    (
        'Mi primer post',
        'Hola mundo desde mi aplicación.',
        1
    ),
    (
        'Aprendiendo Node',
        'Estoy aprendiendo Express y PostgreSQL.',
        1
    ),
    (
        'Un post de Juan',
        'Este es mi primer mensaje.',
        2
    );