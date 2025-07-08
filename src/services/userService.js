// src/services/userService.js

/**
 * Logs in a user by sending credentials to the API.
 * @param {Object} credentials - { Username, Password }
 * @returns {Promise<{user: Object, token: string}>}
 * @throws {Error} If login fails
 */
export async function loginUser(credentials) {
    const response = await fetch(
        "https://my-movies-flix-app-56f9661dc035.herokuapp.com/api/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        }
    );

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();
    // Expecting { user: {...}, token: "..." }
    return data;
}

/**
 * Registers a new user by sending signup data to the API.
 * @param {Object} userData - { Username, Password, Email, ... }
 * @returns {Promise<Object>} The created user object (or API response)
 * @throws {Error} If signup fails
 */
export async function signupUser(userData) {
    const response = await fetch(
        "https://my-movies-flix-app-56f9661dc035.herokuapp.com/api/users",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        }
    );

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Signup failed");
    }

    return await response.json();
}
