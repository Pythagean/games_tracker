async function searchForThemeInDb(themeName) {
    try {
        const response = await fetch('http://localhost:5000/themes/search/' + themeName, {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        return data.theme_id; // Return the theme ID
    } catch (error) {
        console.error("Error:", error);
        return null; // Return null or handle the error in a custom way
    }
}