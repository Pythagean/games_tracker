//-----------------------------
//         ADD USER
//-----------------------------
function addUser() {
    var userName = document.getElementById('user-name').value;
    var responseMessage = document.getElementById('user-response-message');

    if (userName.trim() === '') {
        responseMessage.innerHTML = 'Username is required!';
        responseMessage.style.color = 'red';
        return;
    }

    var data = JSON.stringify({ "name": userName });

    fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data,
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            $('#user-name').val(null);
            responseMessage.innerHTML = 'User added successfully!';
            responseMessage.style.color = 'green';
        } else {
            responseMessage.innerHTML = 'Error: ' + data.error;
            responseMessage.style.color = 'red';
        }
    })
    .catch(error => {
        responseMessage.innerHTML = 'Error: ' + error.message;
        responseMessage.style.color = 'red';
    });
}


//-----------------------------
//         ADD GAME
//-----------------------------
async function addGame() {
    var gameTitle = document.getElementById('game-title').value;
    var gamePlatform = document.getElementById('game-platform').value;

    const gameGenresArray = document.getElementById('game-genres-ids').value
      .split(',')
      .map(genre => genre.trim())
      .filter(genre => genre !== "");

    const gameThemesArray = document.getElementById('game-themes-ids').value
      .split(',')
      .map(genre => genre.trim())
      .filter(genre => genre !== "");

    var gameFranchise = document.getElementById('game-franchise').value;

    const gameDevelopersArray = document.getElementById('game-developers-ids').value
      .split(',')
      .map(genre => genre.trim())
      .filter(genre => genre !== "");

    const gameDevelopersNamesToInsertArray = document.getElementById('game-developers-names-to-insert').value
      .split(',')
      .map(genre => genre.trim())
      .filter(genre => genre !== "");

    if (gameDevelopersNamesToInsertArray.length > 0){

        for (let i = 0; i < gameDevelopersNamesToInsertArray.length; i++) {

            await fetch('http://localhost:5000/developers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    "name": gameDevelopersNamesToInsertArray[i]
                }),
            })
            .then(response => response.json())
            .then(data => {
                gameDevelopersArray.push(data.developer_id)
            })
            .catch(error => {
                responseMessage.innerHTML = 'Error: ' + error.message;
                responseMessage.style.color = 'red';
            });
        }
    }

    

    var gamePublisher = document.getElementById('game-publisher').value;
    var gameReleaseDate = document.getElementById('game-release-date').value;
    var gameMetacriticScore = document.getElementById('game-metacritic-score').value;
    var gameMultiplayerStyle = document.getElementById('game-multiplayer-style').value;
    var gameControllerStyle = document.getElementById('game-controller-style').value;
    var gameStore = document.getElementById('game-store').value;

    var responseMessage = document.getElementById('game-response-message');

    if (gameTitle.trim() === '') {
        responseMessage.innerHTML = 'Game Title is required!';
        responseMessage.style.color = 'red';
        return;
    }

    var data = JSON.stringify({ 
        "title": gameTitle,
        "platform": gamePlatform,
        "genre": gameGenresArray,
        "theme": gameThemesArray,
        "franchise": gameFranchise,
        "developer": gameDevelopersArray,
        "publisher": gamePublisher,
        "release_date": gameReleaseDate,
        "metacritic_score": gameMetacriticScore,
        "multiplayer_style": gameMultiplayerStyle,
        "controller_style": gameControllerStyle,
        "store": gameStore
    });

    fetch('http://localhost:5000/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data,
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            $('#game-title').val(null);
            $('#game-platform').val(null);
            $('#game-genres').val(null);
            $('#game-themes').val(null);
            $('#game-franchise').val(null);
            $('#game-developers').val(null);
            $('#game-publisher').val(null);
            $('#game-release-date').val(null);
            $('#game-metacritic-score').val(null);
            $('#game-multiplayer-style').val("N/A");
            $('#game-controller-style').val("Controller");
            $('#game-store').val("Steam");
            responseMessage.innerHTML = 'Game added successfully!';
            responseMessage.style.color = 'green';
        } else {
            responseMessage.innerHTML = 'Error: ' + data.error;
            responseMessage.style.color = 'red';
        }
    })
    .catch(error => {
        responseMessage.innerHTML = 'Error: ' + error.message;
        responseMessage.style.color = 'red';
    });
}

//-----------------------------
//         ADD SESSION
//-----------------------------
function addSession() {
    var sessionGameTitle = document.getElementById('session-game-title').value;
    var sessionPlatform = document.getElementById('session-platform').value;
    var sessionStartDate = document.getElementById('session-start-date').value;
    var sessionStartTime = document.getElementById('session-start-time').value;
    var sessionDuration = document.getElementById('session-duration').value;
    var sessionLocation = document.getElementById('session-location').value;
    var sessionGameMode = document.getElementById('session-game-mode').value;
    var sessionControllerStyle = document.getElementById('session-controller-style').value;

    var sessionPlayers = $('#session-players').val(); 

    var responseMessage = document.getElementById('session-response-message');

    if (sessionGameTitle.trim() === '' || sessionPlatform.trim() === '' || sessionStartDate.trim() === '' || sessionStartTime.trim() === '' || sessionDuration.trim() === ''
    || sessionGameMode.trim() === '') {
        responseMessage.innerHTML = 'All fields are required!';
        responseMessage.style.color = 'red';
        return;
    }

    var data = JSON.stringify({ 
        "gameId": sessionGameTitle, 
        "platform": sessionPlatform,
        "startDate": sessionStartDate,
        "startTime": sessionStartTime,
        "duration": sessionDuration,
        "gameMode": sessionGameMode,
        "location": sessionLocation,
        "controllerStyle": sessionControllerStyle,
        "players": sessionPlayers.length > 0 ? sessionPlayers.join(', ') : ''
    });

    fetch('http://localhost:5000/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data,
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            $('#session-game-title').val(null);
            $('#session-platform').val(null);
            $('#session-start-date').val(null);
            $('#session-start-time').val(null);
            $('#session-duration').val(null);
            $('#session-game-mode').val(null);
            $('#session-controller-style').val("Controller");
            $('#session-players').val(null);
            responseMessage.innerHTML = 'Session added successfully!';
            responseMessage.style.color = 'green';
        } else {
            responseMessage.innerHTML = 'Error: ' + data.error;
            responseMessage.style.color = 'red';
        }
    })
    .catch(error => {
        responseMessage.innerHTML = 'Error: ' + error.message;
        responseMessage.style.color = 'red';
    });
}