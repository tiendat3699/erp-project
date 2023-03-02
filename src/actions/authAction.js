import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '~/services';

export const signup = createAsyncThunk('auth/signup', async (data, { rejectWithValue }) => {
    try {
        const result = await authService.signup(data);
        return result;
    } catch (err) {
        if (err.response && err.response.data.message) {
            return rejectWithValue(err.response.data.message);
        } else {
            return rejectWithValue(err.message);
        }
    }
});

export const login = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
    try {
        const result = await authService.login(data);
        return result;
    } catch (err) {
        if (err.response && err.response.data.message) {
            return rejectWithValue(err.response.data.message);
        } else {
            return rejectWithValue(err.message);
        }
    }
});
