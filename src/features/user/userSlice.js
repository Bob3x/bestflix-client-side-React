import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "../../services/userService";

// Async thunk for logging in the user
export const login = createAsyncThunk("user/login", async (credentials, thunkAPI) => {
    try {
        const response = await loginUser(credentials);
        return response; // Expecting user + token in response
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        token: null,
        status: "idle",
        error: null
    },
    reducers: {
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
            });
    }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
