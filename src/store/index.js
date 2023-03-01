import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import pageTitleReducer from '~/reducers/pageTitleReducer';
import authReducer from '~/reducers/authReducer';

const reducer = combineReducers({ pageTitle: pageTitleReducer, auth: authReducer });

const store = configureStore({ reducer });

export default store;
