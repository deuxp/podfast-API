DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS minicasts CASCADE;
DROP TABLE IF EXISTS tags CASCADE;
DROP TABLE IF EXISTS minicast_tags CASCADE;
DROP TABLE IF EXISTS plays CASCADE;
DROP TABLE IF EXISTS minicast_likes CASCADE;
DROP TABLE IF EXISTS followers CASCADE;
DROP TABLE IF EXISTS favourites CASCADE;

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
  audio_link VARCHAR(2083),
  banner_link VARCHAR(2083),
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
  tag VARCHAR(255),
  created_at timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE minicast_tags (
  id SERIAL PRIMARY KEY NOT NULL,
  minicast_id INTEGER REFERENCES minicasts(id) ON DELETE CASCADE,
  tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
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

CREATE TABLE favourites (
   id SERIAL PRIMARY KEY NOT NULL,
   minicast_id INTEGER REFERENCES minicasts(id) ON DELETE CASCADE NOT NULL,
   user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
   fave BOOLEAN DEFAULT TRUE,
   created_at timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE followers (
  id SERIAL PRIMARY KEY NOT NULL,
  follower_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  followed_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamp NOT NULL DEFAULT NOW()
);