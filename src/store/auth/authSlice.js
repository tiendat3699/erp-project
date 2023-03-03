import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        user: null,
        error: '',
        message: '',
    },
    reducers: {
        login: (state, { payload }) => {
            state.isLoggedIn = true;
            state.user = payload.user;
        },
        logOut: (state) => {
            state.isLoggedIn = false;
            state.user = {};
        },
    },
});

export const { login, logOut } = authSlice.actions;
export default authSlice.reducer;
