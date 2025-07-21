// src/services/movieService.js

/**
 * Fetch movies from the API.
 * @param {string} token - The user's auth token.
 * @returns {Promise<{movies: Array}>}
 * @throws {Error} If fetching movies fails
 */

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export async function fetchMovies() {
    const response = await fetch(
        `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch movies");
    }

    const data = await response.json();

    return data.results;
}

export async function fetchAllGenres() {
    const response = await fetch(
        `${TMDB_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}&language=en-US`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch movie genres");
    }

    const data = await response.json();

    return data.genres;
}
