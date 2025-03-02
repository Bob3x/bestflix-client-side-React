import { useState } from "react";

export const useFavoriteMovie = (user, token, setUser) => {
    const [isLoading, setIsLoading] = useState(false);
    const [toastState, setToastState] = useState({
        show: false,
        message: "",
        variant: "success"
    });

    const toggleFavorite = async (movieId, isFavorite) => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `https://my-movies-flix-app-56f9661dc035.herokuapp.com/users/${user.Username}/movies/${movieId}`,
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

            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setToastState({
                show: true,
                message: `Movie ${isFavorite ? "removed from" : "added to"} fovorites`,
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

    return { isLoading, toastState, setToastState, toggleFavorite };
};
