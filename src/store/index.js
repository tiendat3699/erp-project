import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import pageTitleReducer from '~/reducers/pageTitleReducer';

const reducer = combineReducers({ pageTitle: pageTitleReducer });

const store = configureStore({ reducer });

export default store;
