import { createSlice } from '@reduxjs/toolkit';

const pageSilde = createSlice({
    name: 'page',
    initialState: {
        title: 'ERP',
        sideBarCollapse: false,
    },
    reducers: {
        setTitle: (state, { payload }) => ({ ...state, title: payload }),
        setSibarCollapse: (state, { payload }) => ({ ...state, sideBarCollapse: payload }),
    },
});

export const { setTitle, setSibarCollapse } = pageSilde.actions;
export default pageSilde.reducer;
