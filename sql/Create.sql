CREATE TABLE developers (
	developer_id SERIAL PRIMARY KEY,
	name VARCHAR(250) NOT NULL
);

CREATE TABLE genres (
	genre_id SERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL
);

CREATE TABLE themes (
	theme_id SERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL
);

CREATE TABLE games (
	game_id SERIAL PRIMARY KEY,
	title VARCHAR(250) NOT NULL,
	platform VARCHAR(250) NOT NULL,
	franchise VARCHAR(50),
	publisher VARCHAR(100),
	release_date DATE NOT NULL,
	first_played DATE,
	last_played DATE,
	metacritic_score INTEGER,
	multiplayer_style VARCHAR(50),
	controller_style VARCHAR(50),
	store VARCHAR(50),
	giantbomb_id INTEGER,
	giantbomb_img_url
);

CREATE TABLE game_developer (
	game_developer_id SERIAL PRIMARY KEY,
	game_id INTEGER NOT NULL,
	developer_id INTEGER NOT NULL,
	FOREIGN KEY (game_id) REFERENCES games(game_id) ON DELETE CASCADE,
	FOREIGN KEY (developer_id) REFERENCES developers(developer_id) ON DELETE CASCADE
);

CREATE TABLE game_genre (
	game_genre_id SERIAL PRIMARY KEY,
	game_id INTEGER NOT NULL,
	genre_id INTEGER NOT NULL,
	FOREIGN KEY (game_id) REFERENCES games(game_id) ON DELETE CASCADE,
	FOREIGN KEY (genre_id) REFERENCES genres(genre_id) ON DELETE CASCADE
);

CREATE TABLE game_theme (
	game_theme_id SERIAL PRIMARY KEY,
	game_id INTEGER NOT NULL,
	theme_id INTEGER NOT NULL,
	FOREIGN KEY (game_id) REFERENCES games(game_id) ON DELETE CASCADE,
	FOREIGN KEY (theme_id) REFERENCES themes(theme_id) ON DELETE CASCADE
);

CREATE TABLE players (
	player_id SERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL
);

CREATE TABLE sessions (
	session_id SERIAL PRIMARY KEY,
	game_id INTEGER NOT NULL,
	platform VARCHAR(50) NOT NULL,
	start_date DATE NOT NULL,
	start_time VARCHAR(50),
	duration INTEGER NOT NULL,
	location VARCHAR(100),
	game_mode VARCHAR(50),
	controller_style VARCHAR(50) NOT NULL,
	FOREIGN KEY (game_id) REFERENCES games(game_id) ON DELETE CASCADE
);

CREATE TABLE session_player (
	session_player_id SERIAL PRIMARY KEY,
	session_id INTEGER NOT NULL,
	player_id INTEGER NOT NULL,
	FOREIGN KEY (session_id) REFERENCES sessions(session_id) ON DELETE CASCADE,
	FOREIGN KEY (player_id) REFERENCES players(player_id) ON DELETE CASCADE
);




