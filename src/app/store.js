import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import moviesReducer from "../features/movies/moviesSlice";
import favoritesReducer from "../features/favorites/favoritesSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import { combineReducers } from "redux";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user"] // only persist the user slice
};

const rootReducer = combineReducers({
    user: userReducer,
    movies: moviesReducer,
    favorites: favoritesReducer
    // other features slices here (e.g. movies, favorites)
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer
});

export const persistor = persistStore(store);
export default store;
