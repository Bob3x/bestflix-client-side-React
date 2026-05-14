import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, updateUserApi, deleteUserApi } from "../../apiClient";

// Async thunk for logging in the user
export const login = createAsyncThunk(
    "user/login",
    async ({ Email, Password }, { rejectWithValue }) => {
        try {
            const data = await loginApi({ Email, Password });
            return {
                user: data.user,
                token: data.token || data.access_token,
            };
        } catch (err) {
            return rejectWithValue(err.message || "Login failed");
        }
    }
);

// Update User info
export const updateUserThunk = createAsyncThunk(
    "user/updateUser",
    async ({ userId, updates }, { rejectWithValue }) => {
        try {
            const data = await updateUserApi(userId, updates);
            return data;
        } catch (err) {
            return rejectWithValue(err.message || "Update failed");
        }
    }
);

// Delete User Account
export const deleteUserThunk = createAsyncThunk(
    "user/deleteUser",
    async (userId, { rejectWithValue }) => {
        try {
            await deleteUserApi(userId);
            return { userId };
        } catch (err) {
            return rejectWithValue(err.message || "Delete failed");
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        token: null,
        status: "idle",
        error: null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.status = "idle";
            state.error = null;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // Add update user
            .addCase(updateUserThunk.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(updateUserThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload; // updated user object
            })
            .addCase(updateUserThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            // Add delete user
            .addCase(deleteUserThunk.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(deleteUserThunk.fulfilled, (state) => {
                state.status = "succeeded";
                state.user = null;
                state.token = null;
            })
            .addCase(deleteUserThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    }
});

export const { setUser, logout, clearError } = userSlice.actions;
export default userSlice.reducer;
