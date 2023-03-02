import { createSlice } from '@reduxjs/toolkit';

const pageSilde = createSlice({
    name: 'page',
    initialState: {
        title: 'ERP',
    },
    reducers: {
        setTile: (state, action) => ({ ...state, title: action.payload }),
    },
});

export const { setTile } = pageSilde.actions;
export default pageSilde.reducer;
