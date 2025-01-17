function searchForGameInDb(gameTitle) {
  fetch('http://localhost:5000/games/search/' + gameTitle + '', {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Parse the response as JSON
    })
    .then((data) => {
        const alreadyContainsText = document.getElementById('already-exists-text');
        const addGameButton = document.getElementById('add-game-button');
      if (data && data.game_id) {
        alreadyContainsText.style.display = 'block';
        addGameButton.disabled = true;
      } else {
        alreadyContainsText.style.display = 'none';
        addGameButton.disabled = false;
      }
    })
    .catch((error) => console.error("Error:", error));
}
