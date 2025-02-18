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

        const sortedData = data.sort((a, b) => new Date(b.last_played) - new Date(a.last_played));

        // Populate select with game options
        sortedData.forEach(game => {
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
    $(document).on('select2:open', function(e) {
        // Ensure stable focus on search input after dropdown opens
        setTimeout(() => {
            let searchField = document.querySelector('.select2-container--open .select2-search__field');
            
            if (searchField) {
                searchField.focus();
                
                // Prevent immediate loss of focus by re-focusing on blur event
                searchField.addEventListener('blur', function() {
                    setTimeout(() => searchField.focus(), 0);
                }, { once: true }); // Only trigger once to avoid redundant handlers
            }
        }, 100); // Ensure dropdown rendering is complete
    });

    // $(document).on('select2:open', function(e) {
    //     setTimeout(() => {
    //         document.querySelector(`[aria-controls="select2-${e.target.id}-results"]`).focus();
    //     }, 0); // Delay to ensure element is fully rendered
    // });
}

//-----------------------------
//         LOAD GAME DETAILS
//-----------------------------
function loadGameDetails(gameId) {
    if (!gameId) return;

    fetch(`http://localhost:5000/games/${gameId}`, { method: 'GET' })
        .then(response => response.json())
        .then(gameDetails => {
            // Update other fields with game details
            $('#session-platform').text(gameDetails.platform || '');
            $('#session-platform').val(gameDetails.platform || '');

            // if (gameDetails.giantbomb_id > 0) getGameThumbnailFromGB(gameDetails.giantbomb_id);

            if (gameDetails.giantbomb_img_url != "") {
                const imageContainer = document.getElementById("session-thumbnail");
                imageContainer.src = gameDetails.giantbomb_img_url;
                imageContainer.style.display = "block";
            }
            

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