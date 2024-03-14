import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null // Initial state should match the structure of your user object
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLogin: (state, action) => {
            const { user, token } = action.payload; // Destructuring payload for user and token
            state.user = user;
            state.token = token;
        },
        userLogout: (state) => {
            state.user = null; // Reset user to null when logging out
            state.token = null; // Also reset token when logging out
        }
    }
});

export const { userLogin, userLogout } = userSlice.actions;
export default userSlice.reducer;
