DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS minicasts CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255),
  handle VARCHAR(255) NOT NULL,
  about_me TEXT,
  avatar_link VARCHAR(2803) NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  created_at timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE minicasts (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  audio_link VARCHAR(2083) NOT NULL,
  banner_link VARCHAR(2083) NOT NULL,
  title VARCHAR(255),
  description TEXT,
  num_of_views INTEGER,
  length_in_seconds INTEGER,
  transcription TEXT,
  active BOOLEAN DEFAULT TRUE,
  created_at timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE tags (
  id SERIAL PRIMARY KEY NOT NULL,
  minicast_id INTEGER REFERENCES minicasts(id) ON DELETE CASCADE,
  tag VARCHAR(255),
  created_at timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE minicast_tags (
  id SERIAL PRIMARY KEY NOT NULL,
  minicast_id INTEGER REFERENCES minicasts(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE plays (
   id SERIAL PRIMARY KEY NOT NULL,
   minicast_id INTEGER REFERENCES minicasts(id) ON DELETE CASCADE,
   user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
   num_of_plays INTEGER,
   updated_at timestamp NOT NULL DEFAULT NOW(),
   created_at timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE minicast_likes (
   id SERIAL PRIMARY KEY NOT NULL,
   minicast_id INTEGER REFERENCES minicasts(id) ON DELETE CASCADE,
   user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
   liked BOOLEAN DEFAULT TRUE,
   created_at timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE followers (
  id SERIAL PRIMARY KEY NOT NULL,
  follower_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  followed_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamp NOT NULL DEFAULT NOW()
);