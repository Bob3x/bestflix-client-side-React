import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchFavoritesApi, addFavoriteApi, removeFavoriteApi } from "../../apiClient";

// Fetch favorites by user ID
export const fetchFavoritesThunk = createAsyncThunk(
    "favorites/fetchFavorites",
    async (userId, { rejectWithValue }) => {
        try {
            const data = await fetchFavoritesApi(userId);
            const favorites = Array.isArray(data)
                ? data.map((fav) => ({ id: fav.id, movie_id: fav.movie_id, user_id: fav.user_id }))
                : [];
            return favorites;
        } catch (err) {
            return rejectWithValue(err.message || "Failed to fetch favorites");
        }
    }
);

export const addFavoriteThunk = createAsyncThunk(
    "favorites/addFavorite",
    async ({ userId, movieId }, { rejectWithValue }) => {
        try {
            const fav = await addFavoriteApi({ userId, movieId });
            return { id: fav?.id, movie_id: fav?.movie_id, user_id: fav?.user_id };
        } catch (err) {
            return rejectWithValue(err.message || "Failed to add favorite");
        }
    }
);

export const removeFavoriteThunk = createAsyncThunk(
    "favorites/removeFavorite",
    async ({ userId, movieId }, { rejectWithValue }) => {
        try {
            await removeFavoriteApi({ userId, movieId });
            return { movieId };
        } catch (err) {
            return rejectWithValue(err.message || "Failed to remove favorite");
        }
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
            })
            .addCase(removeFavoriteThunk.fulfilled, (state, action) => {
                // Remove the favorite from the items array
                state.items = state.items.filter(
                    (fav) => String(fav.movie_id) !== String(action.payload.movieId)
                );
            });
    }
});

export const selectFavorites = (state) => state.favorites.items;
export const selectFavoritesStatus = (state) => state.favorites.status;
export const selectFavoritesError = (state) => state.favorites.error;

export const { clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
