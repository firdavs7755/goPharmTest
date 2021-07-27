import {
    GET_DATA, GET_ONE_USER,
    GET_PERSONAL_DATA,
    SET_DATA, SET_PERSONAL_DATA, SET_TOKEN,
} from "./actions/action-types";

const INITIAL_STATE = {
    data:[],
    personalData:{},
    token:null
}

const userReducer = (state = INITIAL_STATE,action) => {
    switch (action.type) {
        case SET_TOKEN:
            return {...state,token:action.payload}
        case SET_PERSONAL_DATA:
            return {...state,personalData: action.payload}
        case SET_DATA:
            return {...state,data: action.payload}
        case GET_ONE_USER:
            let one = state.find(item=>item.id===action.payload);
                return one;
        default:
            return state
    }
}

export default userReducer;