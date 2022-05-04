DROP TABLE IF EXISTS messaages CASCADE;

CREATE TABLE messages (
    id SERIAL PRIMARY KEY NOT NULL,
    body VARCHAR(140),
    created_at timestamp NOT NULL DEFAULT NOW()
);