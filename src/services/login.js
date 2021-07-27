import {axiosInstanceNotToken} from './api'
const api = '/api/v1/login';

export const loginApi = {
    signin:data=>{
        return axiosInstanceNotToken.post(`${api}`,data);
    }
}