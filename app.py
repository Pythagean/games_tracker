from flask import Flask, request, jsonify, send_from_directory, render_template
import psycopg2
import logging
import requests
from psycopg2 import sql
import os

logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)

# PostgreSQL connection configuration
conn = psycopg2.connect(
    dbname="postgres",
    user="postgres",
    password="password",
    host="localhost",  # Use IP if hosting PostgreSQL remotely
    port="5432"
)

# Serve the HTML page
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/print_tables', methods=['GET'])
def print_tables():
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';")
            tables = cursor.fetchall()
            return jsonify({"tables": tables}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
		
@app.route('/players', methods=['GET'])
def players():
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM players;")
            rows = cursor.fetchall()
            # Get column names to create key-value pairs
            column_names = [desc[0] for desc in cursor.description]
            
            # Convert rows to a list of dictionaries
            players = [dict(zip(column_names, row)) for row in rows]
            
            return jsonify(players), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
		
@app.route('/games', methods=['GET'])
def games():
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM games;")
            rows = cursor.fetchall()

            # Get column names to create key-value pairs
            column_names = [desc[0] for desc in cursor.description]
            
            # Convert rows to a list of dictionaries
            games = [dict(zip(column_names, row)) for row in rows]
            
            return jsonify(games), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/games/<int:game_id>', methods=['GET'])
def get_game_details(game_id):
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT title, platform FROM games WHERE game_id = %s;", (game_id,))
            game = cursor.fetchone()

            if game:
                # If game found, return its details
                game_details = {
                    'game_id': game_id,
                    'title': game[0],
                    'platform': game[1]
                }
                return jsonify(game_details), 200
            else:
                return jsonify({"status": "error", "message": "Game not found"}), 404

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@app.route('/users', methods=['POST'])
def insert_user():
    try:
        # Ensure the request contains JSON
        data = request.get_json()
        logging.debug(f"Received data: {data}")  # Log the received data
		
		# Check if the keys 'name' existd in the data
        if 'name' not in data:
            return jsonify({"status": "error", "message": "Missing 'name' from json"}), 400
		
        name = data['name']

        with conn.cursor() as cursor:
            cursor.execute(
                "INSERT INTO players (name) VALUES (%s)",
                (name,)
            )
            conn.commit()

        return jsonify({"status": "success", "message": "User added"}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
		
@app.route('/games', methods=['POST'])
def insert_game():
    try:
        # Ensure the request contains JSON
        data = request.get_json()
        logging.debug(f"Received data: {data}")  # Log the received data

        title = data['title']
        platform = data['platform']
        genre = data['genre']
        theme = data['theme']
        franchise = data['franchise']
        developer = data['developer']
        publisher = data['publisher']
        release_date = data['release_date']
        metacritic_score = data['metacritic_score']
        multiplayer_style = data['multiplayer_style']

        with conn.cursor() as cursor:
            cursor.execute(
                "INSERT INTO games (title, platform, genre, theme, franchise, developer, publisher, release_date, metacritic_score, multiplayer_style) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",
                (title, platform, genre, theme, franchise, developer, publisher, release_date, metacritic_score, multiplayer_style,)
            )
            conn.commit()

        return jsonify({"status": "success", "message": "Game added"}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@app.route('/sessions', methods=['POST'])
def insert_session():
    try:
        # Ensure the request contains JSON
        data = request.get_json()
        logging.debug(f"Received data: {data}")  # Log the received data

        gameId = data['gameId']
        platform = data['platform']
        startDate = data['startDate']
        startTime = data['startTime']
        duration = data['duration']
        gameMode = data['gameMode']
        location = data['location']
        switchMode = data['switchMode']
        players = data['players']
        

        with conn.cursor() as cursor:
            cursor.execute(
                """
                INSERT INTO sessions 
                (game_id, platform, start_date, start_time, duration, location, switch_mode, game_mode, played_with) 
                VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s) 
                RETURNING session_id
                """,
                (gameId, platform, startDate, startTime, duration, location, switchMode, gameMode, players,)
            )

            # Get the inserted session ID
            # session_id = cursor.fetchone()[0]

            # # Prepare data for insertion
            # players = data['players']
            # insert_values = [(session_id, player_id) for player_id in players]
        
            # cursor.executemany(
            #     "INSERT INTO session_players (session_id, player_id) VALUES (%s, %s)",
            #     insert_values
            # )
            conn.commit()

        return jsonify({"status": "success", "message": "Session added"}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

API_KEY = '695fc51cfe9223919cc00f148f4301a0f2caf9bf'
SEARCH_BASE_URL = "https://www.giantbomb.com/api/search/"
GAME_BASE_URL = "https://www.giantbomb.com/api/game"

@app.route('/gb/search', methods=['GET'])
def gb_search():
    # Forward the GET request to the external API
    try:
        # Get query parameters from the request
        params = request.args.to_dict()
        params['api_key'] = API_KEY

        headers = {
            'User-Agent': 'Pythagean'
        }
        
        # Make the request to the external API
        response = requests.get(f"{SEARCH_BASE_URL}", params=params, headers=headers)  # Modify the path as needed

        # Check if the response is successful
        if response.status_code == 200:
            return jsonify(response.json())  # Return the response from the external API
        else:
            return jsonify({"error": "Failed to fetch data from external API"}), response.status_code
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/gb/game/<int:gb_game_id>', methods=['GET'])
def gb_details(gb_game_id):
    # Forward the GET request to the external API
    try:
        # Get query parameters from the request
        params = request.args.to_dict()
        params['api_key'] = API_KEY

        headers = {
            'User-Agent': 'Pythagean'
        }
        
        # Make the request to the external API
        response = requests.get(f"{GAME_BASE_URL}/{gb_game_id}", params=params, headers=headers)  # Modify the path as needed

        # Check if the response is successful
        if response.status_code == 200:
            return jsonify(response.json())  # Return the response from the external API
        else:
            return jsonify({"error": "Failed to fetch data from external API"}), response.status_code
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
