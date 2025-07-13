// src/services/movieService.js

/**
 * Fetch movies from the API.
 * @param {string} token - The user's auth token.
 * @returns {Promise<{movies: Array}>}
 * @throws {Error} If fetching movies fails
 */

export async function fetchMovies(token) {
    const response = await fetch(
        "https://my-movies-flix-app-56f9661dc035.herokuapp.com/api/movies",
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {
        // Let the caller handle 401 or other errors
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched movies raw data:", data);
    // Expecting data to be an array of movie objects
    return data.map((movie) => ({
        _id: movie._id,
        title: movie.Title,
        description: movie.Description,
        genre: movie.Genre.Name,
        description: movie.Genre.Description,
        director: {
            name: movie.DirectorName,
            bio: movie.DirectorBio
        },
        image: movie.ImagePath,
        featured: movie.Featured
    }));
}
