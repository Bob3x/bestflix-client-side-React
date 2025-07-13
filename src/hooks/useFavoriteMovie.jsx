import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFavoritesThunk } from "../features/favorites/favoritesSlice";
import { setUser } from "../features/user/userSlice";

export const useFavoriteMovie = (token) => {
    const [isLoading, setIsLoading] = useState(false);
    const [toastState, setToastState] = useState({
        show: false,
        message: "",
        variant: "success"
    });
    const user = useSelector((state) => state.user);
    const favoriteMovies = useSelector((state) => state.favorites.items);
    const dispatch = useDispatch();

    const toggleFavorite = async (movieId, isFavorite) => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `https://my-movies-flix-app-56f9661dc035.herokuapp.com/api/users/${user.Username}/movies/${movieId}`,
                {
                    method: isFavorite ? "DELETE" : "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            if (!response.ok) {
                throw new Error(`Failed to ${isFavorite ? "remove" : "add"} favorite movie`);
            }

            const updatedUser = isFavorite
                ? {
                      ...user,
                      FavoriteMovies: user.FavoriteMovies.filter((id) => id !== movieId)
                  }
                : await response.json();

            dispatch(setUser(updatedUser));
            dispatch(fetchFavoritesThunk(token));

            setToastState({
                show: true,
                message: `Movie ${isFavorite ? "removed from" : "added to"} favorites`,
                variant: "success"
            });
        } catch (error) {
            console.error("Error:", error);
            setToastState({
                show: true,
                message: error.message,
                variant: "danger"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, toastState, setToastState, toggleFavorite, favoriteMovies };
};
