import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMovies } from "../../services/movieService";

// Async thunk for fetch movies from the API
export const fetchMoviesThunk = createAsyncThunk(
    "movies/fetchMovies",
    async (token, { rejectWithValue }) => {
        try {
            const movies = await fetchMovies(token);
            return movies;
        } catch (error) {
            // Handle errors and return a rejected value
            return rejectWithValue(error.message || "Failed to fetch movies");
        }
    }
);

const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        movies: [],
        status: "idle", // idle | loading | succeeded | failed
        error: null
    },
    reducers: {
        // More reducers if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMoviesThunk.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchMoviesThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.movies = action.payload;
            })
            .addCase(fetchMoviesThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    }
});

export default moviesSlice.reducer;
