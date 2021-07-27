import {combineReducers} from "redux";
import userReducer from "./userReducer";
import {createAction, createReducer} from "@reduxjs/toolkit";
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['users']
}

export const rootReducer = combineReducers({
    users:userReducer,
})
export const pReducer = persistReducer(persistConfig, rootReducer);

export default persistReducer(persistConfig, rootReducer);

