async function searchForGenreInDb(genreName) {
    try {
        const response = await fetch('http://localhost:5000/genres/search/' + genreName, {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        return data.genre_id; // Return the genre ID
    } catch (error) {
        console.error("Error:", error);
        return null; // Return null or handle the error in a custom way
    }
}