/**
 * Fetches podcasts data from the Podcast API.
 *
 * @async
 * @function fetchPodcasts
 * @returns {Promise<Object>} Resolves to the JSON response containing podcasts data
 * @throws Will log an error message to the console if the response is not OK
 */
async function fetchPodcasts() {
    // Send a GET request to the Podcast API endpoint and wait for the response
    const response = await fetch("https://podcast-api.netlify.app/");

    // Check if the response status is not OK (status code outside 200–299)
    if (!response.ok) {
        // Log an error message if the response failed
        console.log("There was an error");
    }
    const data = await response.json();
    data.forEach((podcast) => {
        //if podcast does not have genre we return,we exit the loop.
        if (!podcast.genres) return;
        //fetch the genre titles using the genre ids.
        const genres = fetchGenreTitles(podcast.genres);
        //add the genres to the podcast object.
        podcast.genres = genres;
    });
    // Parse and return the JSON data from the response
    return data;
}
/**
 *
 * @param {*} genreIds
 * @returns
 */

function fetchGenreTitles(genreIds) {
    // Initialize an empty array to hold the genre titles
    let genreTitles = [];

    // Iterate over each genre ID provided in the podcast array
    genreIds.forEach(async (id) => {
        // Fetch the genre details by  ID.
        const response = await fetch(
            "https://podcast-api.netlify.app/genre/" + id
        );

        // Check if the response status is not OK (status code outside 200–299)
        if (!response.ok) {
            // Log an error message if the response failed
            console.dir("There was an error");
        }
        const genre = await response.json();
        if (genre) {
            // If a genre is found, add its title to the genreTitles array
            genreTitles.push(genre.title);
        }
    });

    return genreTitles;
}

/**
 * Formats a date string into a human-readable format.
 * @param {string} dateStr - ISO date string.
 * @returns {string} Formatted date string.
 */
// Formats a date string to 'Month Day, Year' (e.g., September 21, 2025)
function formatDate(dateString) {
    const date = new Date(dateString);

    // Format the valid Date to a human-friendly string in "Month day, Year" form usin US English locale
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}
async function fetchPodcastDetails(id) {
    if (!id) throw new Error("fetchPodcastDetails requires an id");

    const url = `https://podcast-api.netlify.app/id/${id}`;
    const response = await fetch(url);

    if (!response.ok) {
        console.error(
            "Error fetching podcast details for id:",
            id,
            response.status
        );
        return null;
    }

    const result = await response.json();
    return result;
}

export { fetchPodcasts, fetchGenreTitles, formatDate, fetchPodcastDetails };
