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
function addGame() {
    var gameTitle = document.getElementById('game-title').value;
    var gamePlatform = document.getElementById('game-platform').value;
    var gameGenre = document.getElementById('game-genre').value;
    var gameTheme = document.getElementById('game-theme').value;
    var gameFranchise = document.getElementById('game-franchise').value;
    var gameDeveloper = document.getElementById('game-developer').value;
    var gamePublisher = document.getElementById('game-publisher').value;
    var gameReleaseDate = document.getElementById('game-release-date').value;
    var gameMetacriticScore = document.getElementById('game-metacritic-score').value;
    var gameMultiplayerStyle = document.getElementById('game-multiplayer-style').value;

    var responseMessage = document.getElementById('game-response-message');

    if (gameTitle.trim() === '') {
        responseMessage.innerHTML = 'Game Title is required!';
        responseMessage.style.color = 'red';
        return;
    }

    var data = JSON.stringify({ 
        "title": gameTitle,
        "platform": gamePlatform,
        "genre": gameGenre,
        "theme": gameTheme,
        "franchise": gameFranchise,
        "developer": gameDeveloper,
        "publisher": gamePublisher,
        "release_date": gameReleaseDate,
        "metacritic_score": gameMetacriticScore,
        "multiplayer_style": gameMultiplayerStyle,
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
            $('#game-genre').val(null);
            $('#game-theme').val(null);
            $('#game-franchise').val(null);
            $('#game-developer').val(null);
            $('#game-publisher').val(null);
            $('#game-release-date').val(null);
            $('#game-metacritic-score').val(null);
            $('#game-multiplayer-style').val("N/A");
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
    var sessionSwitchMode = document.getElementById('session-switch-mode').value;
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
        "switchMode": sessionSwitchMode,
        "players": sessionPlayers                
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
            $('#session-players').val(null);
            $('#session-switch-mode').val(null);
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