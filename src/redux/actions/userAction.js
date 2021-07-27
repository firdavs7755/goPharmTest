import {
    GET_DATA,
    GET_PERSONAL_DATA, LOG_OUT,
    SET_DATA,
    SET_PERSONAL_DATA, SET_TOKEN,
} from "./action-types";

export const setData=data=>({
    type:SET_DATA,
    payload:data
})
export const setPersonalData=data=>({
    type:SET_PERSONAL_DATA,
    payload:data
})
export const setUserToken=token=>({
    type:SET_TOKEN,
    payload:token
})
export const getPersonalData=()=>({
    type:GET_PERSONAL_DATA
})
export const getData=()=>({
    type:GET_DATA
})
export const logOut = () => ({
    type: LOG_OUT
})