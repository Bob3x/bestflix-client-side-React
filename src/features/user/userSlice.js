import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "../../services/userService";
import { supabase } from "../../supabaseClient";

// Async thunk for logging in the user
export const login = createAsyncThunk("user/login", async (credentials, thunkAPI) => {
    try {
        const response = await loginUser(credentials);
        return response; // Expecting user + token in response
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

// Update User info
export const updateUserThunk = createAsyncThunk(
    "user/updateUser",
    async ({ userId, updates }, { rejectWithValue }) => {
        const { data, error } = await supabase
            .from("users")
            .update(updates)
            .eq("id", userId)
            .select("*")
            .single();
        if (error) return rejectWithValue(error.message);
        return data;
    }
);

// Delete User Account
export const deleteUserThunk = createAsyncThunk(
    "user/deleteUser",
    async (userId, { rejectWithValue }) => {
        const { error } = await supabase.from("users").delete().eq("id", userId);
        if (error) return rejectWithValue(error.message);
        return { userId };
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

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
