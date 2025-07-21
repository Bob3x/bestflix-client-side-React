import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllGenres } from "../../services/movieService";

export const fetchGenresThunk = createAsyncThunk(
    "genres/fetchGenres",
    async (_, { rejectWithValue }) => {
        try {
            const genres = await fetchAllGenres(); // <- service call
            return genres;
        } catch (err) {
            console.error("❌ Thunk error:", err.message);
            return rejectWithValue(err.message);
        }
    }
);

const genreSlice = createSlice({
    name: "genres",
    initialState: {
        genres: [],
        status: "idle", // idle | loading | succeeded | failed
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGenresThunk.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchGenresThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.genres = action.payload;
            })
            .addCase(fetchGenresThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    }
});

export default genreSlice.reducer;
