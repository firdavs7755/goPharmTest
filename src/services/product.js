import {axiosInstance} from './api'
const api = '/api/v1/store-orders?lang=ru&page=1&per_page=100&status=&type=&payment_type=&store=&region=1';

export const productApi = {
    getData:()=>{
        return axiosInstance.get(`/api/v1/store-orders?lang=ru&page=1&per_page=100&status=&type=&payment_type=&store=&region=1`);
        // return axiosInstance.get(api);
    }
}