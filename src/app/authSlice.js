import { createSlice } from '@reduxjs/toolkit';
import { signup, login } from '~/actions/authAction';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        user: {},
        error: '',
        message: '',
    },
    reducers: {},
    extraReducers: {
        [signup.fulfilled]: (state, { payload }) => {
            state.message = payload.message;
        },
        [signup.rejected]: (state, { payload }) => {
            state.error = payload;
        },
        [login.fulfilled]: (state, { payload }) => {
            state.isLoggedIn = true;
            state.user = payload;
        },
        [login.rejected]: (state, { payload }) => {
            state.isLoggedIn = false;
            state.error = payload;
        },
    },
});

export default authSlice.reducer;
