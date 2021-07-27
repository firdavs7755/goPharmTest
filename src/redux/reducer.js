import {combineReducers} from "redux";
import userReducer from "./userReducer";
import {createAction, createReducer} from "@reduxjs/toolkit";

export const reducer = combineReducers({
    users:userReducer,
    // isAdmin:true
})







// const addAction = createAction("ADD_TODO");
// const removeAction = createAction("REMOVE_TODO");
// export const todosReducer = createReducer([],builder => {
//     builder
//         .addCase(removeAction,(state,action)=>{
//             state.push(action.payload)
//         })
//         .addCase(removeAction,(state,action)=>{
//             return state.filter((todo,i)=>i!==action.payload.index)
//         })
// })