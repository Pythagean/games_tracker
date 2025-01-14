CREATE TABLE games (
    game_id SERIAL PRIMARY KEY,
    title VARCHAR(250) NOT NULL,
	platform VARCHAR(250) NOT NULL,
	genre VARCHAR(250) NOT NULL,
	theme VARCHAR(250) NOT NULL,
	franchise VARCHAR(250) NOT NULL,
	developer VARCHAR(250) NOT NULL,
	publisher VARCHAR(250) NOT NULL,
	release_date DATE NOT NULL,
	metacritic_score INTEGER NOT NULL,
	multiplayer_style VARCHAR(50) NOT NULL
);

CREATE TABLE players (
    player_id SERIAL PRIMARY KEY,
    name VARCHAR(250) NOT NULL
);

CREATE TABLE genres (
    genre_id SERIAL PRIMARY KEY,
    genre VARCHAR(250) NOT NULL
);

CREATE TABLE themes (
    theme_id SERIAL PRIMARY KEY,
    genre VARCHAR(250) NOT NULL
);

CREATE TABLE sessions (
    session_id SERIAL PRIMARY KEY,
	game_id INTEGER NOT NULL,
	platform VARCHAR(250) NOT NULL,
    start_date DATE NOT NULL,
    start_time VARCHAR(50),
	duration INTEGER NOT NULL,
    location VARCHAR(250),
    switch_mode VARCHAR(50),
    game_mode VARCHAR(50),
    FOREIGN KEY (game_id) REFERENCES games(game_id) ON DELETE CASCADE
);

CREATE TABLE session_players (
	played_with_id SERIAL PRIMARY KEY,
	session_id INTEGER NOT NULL,
	player_id INTEGER NOT NULL,
	FOREIGN KEY (session_id) REFERENCES sessions(session_id) ON DELETE CASCADE,
	FOREIGN KEY (player_id) REFERENCES players(player_id) ON DELETE CASCADE
);

CREATE TABLE game_genres (
	game_genres_id SERIAL PRIMARY KEY,
	game_id INTEGER NOT NULL,
	genre_id INTEGER NOT NULL,
	FOREIGN KEY (game_id) REFERENCES games(game_id) ON DELETE CASCADE,
	FOREIGN KEY (genre_id) REFERENCES genres(genre_id) ON DELETE CASCADE
);

CREATE TABLE game_themes (
	game_themes_id SERIAL PRIMARY KEY,
	game_id INTEGER NOT NULL,
	theme_id INTEGER NOT NULL,
	FOREIGN KEY (game_id) REFERENCES games(game_id) ON DELETE CASCADE,
	FOREIGN KEY (theme_id) REFERENCES themes(theme_id) ON DELETE CASCADE
);



