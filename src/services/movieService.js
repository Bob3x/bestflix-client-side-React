// src/services/movieService.js
import { supabase } from "../supabaseClient";
/**
 * Fetch movies from the API.
 * @param {string} token - The user's auth token.
 * @returns {Promise<{movies: Array}>}
 * @throws {Error} If fetching movies fails
 */

export const fetchMovies = async () => {
    const { data, error } = await supabase.from("movies").select("*");

    if (error) {
        throw new Error("Failed to fetch movies");
    }

    return data;
};
