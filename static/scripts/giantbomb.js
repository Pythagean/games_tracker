function searchForGame(){
    const gameTitle = $('#game-title').val();
    fetch('http://localhost:5000/gb/search?format=json&query="'+gameTitle+'"&resources=game', { method: 'GET' })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();  // Parse the response as JSON
    })
    .then(data => {
        if (data && data.results && data.results.length > 0){
            const gameId = data.results[0].id;
            getGameInfoFromGB(gameId);
        }
    })
    .catch(error => console.error('Error:', error));
}

function getGameInfoFromGB(gameId){
    fetch('http://localhost:5000/gb/game/'+gameId+'?format=json', { method: 'GET' })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();  // Parse the response as JSON
    })
    .then(data => {
        if (data && data.results){

            $('#game-title').val(data.results.name);

            if (data && data.results.platforms && data.results.platforms.length > 0) {
                const platformList = data.results.platforms.map(dev => dev.name).join(", ");
                $('#game-platform').val(platformList);
            }

            if (data && data.results.developers && data.results.developers.length > 0) {
                const developerList = data.results.developers.map(dev => dev.name).join(", ");
                $('#game-developer').val(developerList);
            }

            if (data && data.results.publishers && data.results.publishers.length > 0) {
                const publisherList = data.results.publishers.map(dev => dev.name).join(", ");
                $('#game-publisher').val(publisherList);
            }

            if (data && data.results.themes && data.results.themes.length > 0) {
                const themeList = data.results.themes.map(dev => dev.name).join(", ");
                $('#game-theme').val(themeList);
            }

            if (data && data.results.genres && data.results.genres.length > 0) {
                const genreList = data.results.genres.map(dev => dev.name).join(", ");
                $('#game-genre').val(genreList);
            }

            if (data && data.results.franchises && data.results.franchises.length > 0) {
                const franchiseList = data.results.franchises.map(dev => dev.name).join(", ");
                $('#game-franchise').val(franchiseList);
            }

            $('#game-release-date').val(data.results.original_release_date);

            const imageContainer = document.getElementById('game-thumbnail');
            imageContainer.src = data.results.image.small_url;
            imageContainer.style.display = 'block';
            //$('#game-thumbnail').src(data.results.image.small_url);
            //$('#game-thumbnail').style.display('block');
            
        }
    })
    .catch(error => console.error('Error:', error));
}