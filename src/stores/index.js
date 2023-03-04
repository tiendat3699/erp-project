import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import pageReducer from '~/stores/page';
import authReducer from './auth';

const persistConfig = {
    key: 'auth',
    version: 1,
    storage,
};

const authPersistReducer = persistReducer(persistConfig, authReducer);

const rootReducer = {
    page: pageReducer,
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
