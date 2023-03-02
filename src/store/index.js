import { configureStore } from '@reduxjs/toolkit';

import pageReducer from '~/app/pageSlice';
import authReducer from '~/app/authSlice';

const rootReducer = {
    page: pageReducer,
    auth: authReducer,
};

const store = configureStore({ reducer: rootReducer });

export default store;
