const API_URL = (process.env.REACT_APP_API_URL || "http://localhost:8080").replace(/\/+$/, "");

async function request(path, options = {}) {
    try {
        const res = await fetch(`${API_URL}${path}`, {
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            ...options
        });
        const text = await res.text();
        let data = null;

        if (text) {
            try {
                data = JSON.parse(text);
            } catch {
                data = { message: text };
            }
        }

        if (!res.ok) {
            const message = data?.message || res.statusText || `Request failed (${res.status})`;
            const err = new Error(message);
            err.status = res.status;
            err.details = data;
            throw err;
        }

        return data;
    } catch (error) {
        if (error?.name === "TypeError" || error?.message?.includes("fetch")) {
            const err = new Error(
                `Unable to reach the backend at ${API_URL}. Check that it is running and that CORS allows your frontend origin.`
            );
            err.status = 0;
            err.cause = error;
            throw err;
        }

        throw error;
    }
}

export async function loginApi({ Email, Password }) {
    return request(`/api/auth/login`, {
        method: "POST",
        body: JSON.stringify({ email: Email, password: Password })
    });
}

export async function signupApi({ Email, Password, username }) {
    return request(`/api/auth/signup`, {
        method: "POST",
        body: JSON.stringify({ email: Email, password: Password, username })
    });
}

export async function logoutApi() {
    return request(`/api/auth/logout`, { method: "POST" });
}

export async function updateUserApi(userId, updates) {
    return request(`/api/users/${userId}`, {
        method: "PUT",
        body: JSON.stringify(updates)
    });
}

export async function deleteUserApi(userId) {
    return request(`/api/users/${userId}`, { method: "DELETE" });
}

export async function fetchFavoritesApi(userId) {
    return request(`/api/favorites/${userId}`, { method: "GET" });
}

export async function addFavoriteApi({ userId, movieId }) {
    return request(`/api/favorites`, {
        method: "POST",
        body: JSON.stringify({ user_id: userId, movie_id: movieId })
    });
}

export async function removeFavoriteApi({ userId, movieId }) {
    return request(`/api/favorites`, {
        method: "DELETE",
        body: JSON.stringify({ user_id: userId, movie_id: movieId })
    });
}

export default {
    loginApi,
    signupApi,
    logoutApi,
    updateUserApi,
    deleteUserApi,
    fetchFavoritesApi,
    addFavoriteApi,
    removeFavoriteApi
};
