import { configureStore } from '@reduxjs/toolkit';

import pageReducer from '~/app/pageSlice';
import auth from './auth';

const rootReducer = {
    page: pageReducer,
    auth: auth,
};

const store = configureStore({ reducer: rootReducer });

export default store;
