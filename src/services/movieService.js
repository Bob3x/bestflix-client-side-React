// src/services/movieService.js
import { supabase } from "../supabaseClient";
/**
 * Fetch movies from the API.
 * @param {string} token - The user's auth token.
 * @returns {Promise<{movies: Array}>}
 * @throws {Error} If fetching movies fails
 */

export const fetchMovies = async () => {
    console.log("🔍 Inside fetchMovies()");

    const { data, error } = await supabase.from("movies").select("*");

    console.log("🎯 Supabase result:", data);
    console.error("⚠️ Supabase error:", error);

    return data;
};
