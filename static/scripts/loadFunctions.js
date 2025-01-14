//-----------------------------
//         LOAD GAMES
//-----------------------------
function loadGames() {
    fetch('http://localhost:5000/games', { method: 'GET' })
    .then(response => response.json())
    .then(data => {
        const gameSelect = $('#session-game-title');

    // Clear existing options
    gameSelect.empty();
    gameSelect.append('<option value="">Select a game</option>');

    // Populate select with game options
    data.forEach(game => {
        gameSelect.append(new Option(game.title, game.game_id));
    });

    // Initialize Select2
    gameSelect.select2({
        placeholder: "Select or type a game",
        allowClear: true,
        closeOnSelect: true,
        dropdownAutoWidth: true,
        selectOnClose: true
    });
    })
    .catch(error => {
        console.error('Error fetching games:', error);
        alert('Failed to load games. Please try again.');
    });

    // Focus search box when dropdown opens
    // $('#session-game-title').on('select2:open', function () {
    //     setTimeout(() => {
    //         document.querySelector('.select2-search__field').focus();
    //     }, 0); // Delay to ensure element is fully rendered
    // });

    $(document).on('select2:open', function(e) {
        document.querySelector(`[aria-controls="select2-${e.target.id}-results"]`).focus();
    });
}

//-----------------------------
//         LOAD GAME DETAILS
//-----------------------------
function loadGameDetails(gameId) {
    if (!gameId) return;

    fetch(`http://localhost:5000/games/${gameId}`, { method: 'GET' }) // Assuming your API can return details of a specific game
        .then(response => response.json())
        .then(gameDetails => {
            // Update other fields with game details
            $('#session-platform').text(gameDetails.platform || 'N/A');
            $('#session-platform').val(gameDetails.platform || 'N/A');
            toggleSwitchMode(gameDetails.platform);
        })
        .catch(error => {
            console.error('Error fetching game details:', error);
            alert('Failed to load game details. Please try again.');
        });
}

//-----------------------------
//         LOAD PLAYERS
//-----------------------------
function loadPlayers() {
    fetch('http://localhost:5000/players', { method: 'GET' })
    .then(response => response.json())
    .then(data => {
        const playerSelect = $('#session-players');

    // Clear existing options
    playerSelect.empty();
    playerSelect.append('<option></option>');

    // Populate select with game options
    data.forEach(player => {
        playerSelect.append(new Option(player.name, player.player_id));
    });

    // Initialize Select2
    playerSelect.select2({
        placeholder: "Select or type a player",
        allowClear: true,
        closeOnSelect: false,
        dropdownAutoWidth: true,
        selectOnClose: false,
        multiple: true,
        disabled: true
    });
    })
    .catch(error => {
        console.error('Error fetching players:', error);
        alert('Failed to load players. Please try again.');
    });
}