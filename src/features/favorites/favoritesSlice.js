import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../supabaseClient";

// Fetch favorites by user ID
export const fetchFavoritesThunk = createAsyncThunk(
    "favorites/fetchFavorites",
    async (_, { rejectWithValue }) => {
        const { data, error } = await supabase.from("movies").select("*");
        if (error) return rejectWithValue(error.message);
        return data;
    }
);

export const addFavoriteThunk = createAsyncThunk(
    "favorites/addFavorite",
    async ({ userId, movieId }, { rejectWithValue }) => {
        const { data, error } = await supabase
            .from("favorites")
            .insert({ user_id: userId, movies_id: movieId })
            .select();

        if (error) {
            console.error("Failed to add favorite:", error.message);
            return rejectWithValue(error.message);
        }

        return data[0];
    }
);

const favoritesSlice = createSlice({
    name: "favorites",
    initialState: {
        items: [],
        status: "idle",
        error: null
    },
    reducers: {
        clearFavorites: (state) => {
            state.items = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavoritesThunk.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchFavoritesThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchFavoritesThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(addFavoriteThunk.fulfilled, (state, action) => {
                state.items.push(action.payload);
            });
    }
});

export const selectFavorites = (state) => state.favorites.items;
export const selectFavoritesStatus = (state) => state.favorites.status;
export const selectFavoritesError = (state) => state.favorites.error;

export const { clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
