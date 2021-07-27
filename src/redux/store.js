import {applyMiddleware, createStore} from "redux";
import {pReducer, rootReducer} from "./reducer";
import {configureStore} from "@reduxjs/toolkit";
import {persistStore} from "redux-persist";
import {logger} from "redux-logger";


const middleWares = [];

middleWares.push(logger);
// export const store = createStore(reducer)
export const store = createStore(pReducer, applyMiddleware(...middleWares));


export const persistor = persistStore(store);

export default { store, persistor };
