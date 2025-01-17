async function searchForDeveloperInDb(developerName) {
    try {
        const response = await fetch('http://localhost:5000/developers/search/' + developerName, {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        return data.developer_id; // Return the developer ID
    } catch (error) {
        console.error("Error:", error);
        return null; // Return null or handle the error in a custom way
    }
}