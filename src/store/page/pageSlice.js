import { createSlice } from '@reduxjs/toolkit';

const pageSilde = createSlice({
    name: 'page',
    initialState: {
        title: 'ERP',
    },
    reducers: {
        setTitle: (state, action) => ({ ...state, title: action.payload }),
    },
});

export const { setTitle } = pageSilde.actions;
export default pageSilde.reducer;
