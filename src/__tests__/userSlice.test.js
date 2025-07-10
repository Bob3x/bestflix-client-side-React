import userReducer, { login, logout } from "../features/user/userSlice";

describe("userSlice", () => {
    const initialState = {
        user: null,
        token: null,
        status: "idle",
        error: null
    };

    test("should handle login.fulfilled", () => {
        const mockPayload = {
            user: { username: "testUser" },
            token: "123abc"
        };

        const newState = userReducer(initialState, {
            type: login.fulfilled.type,
            payload: mockPayload
        });

        expect(newState.status).toBe("succeeded");
        expect(newState.user).toEqual(mockPayload.user);
        expect(newState.token).toBe(mockPayload.token);
        expect(newState.error).toBeNull();
    });

    test("should handle login.rejected", () => {
        const newState = userReducer(initialState, {
            type: login.rejected.type,
            payload: "Login failed"
        });

        expect(newState.status).toBe("failed");
        expect(newState.error).toBe("Login failed");
        expect(newState.user).toBeNull();
    });

    test("should handle logout", () => {
        const loggedInState = {
            ...initialState,
            user: { username: "testUser" },
            token: "123abc"
        };

        const newState = userReducer(loggedInState, logout());

        expect(newState.user).toBeNull();
        expect(newState.token).toBeNull();
    });
});
