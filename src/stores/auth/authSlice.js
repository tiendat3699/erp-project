import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        user: {},
        tokens: {},
        error: '',
        message: '',
    },
    reducers: {
        login: (state, { payload }) => {
            state.isLoggedIn = true;
            state.tokens = payload.tokens;
        },
        logOut: (state) => {
            state.isLoggedIn = false;
            state.user = {};
            state.tokens = {};
        },
        setUserInfo: (state, { payload }) => {
            state.user = payload.user;
        },
    },
});

export const { login, logOut, setUserInfo } = authSlice.actions;
export default authSlice.reducer;
