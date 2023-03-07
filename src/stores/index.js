import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import pageReducer from '~/stores/page';
import authReducer from './auth';

const authPersistConfig = {
    key: 'auth',
    version: 1,
    storage,
};

const pagePersistConfig = {
    key: 'page',
    version: 1,
    storage,
};

const authPersistReducer = persistReducer(authPersistConfig, authReducer);
const pagePersistReducer = persistReducer(pagePersistConfig, pageReducer);

const rootReducer = {
    page: pagePersistReducer,
    auth: authPersistReducer,
};

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export default store;
