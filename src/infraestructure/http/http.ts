import { isAxiosError } from 'axios';
import { apiInstance } from './fetch';


const get = async <T>(url: string): Promise<T> => {
    try {
        const { data } = await apiInstance.get(url);
        return data as T;
    } catch (error) {
        if (isAxiosError(error)) throw error.response?.data;

        throw new Error("Parece que hubo un error -  Intenta mas tarde");
    }
}

const post = async <T>(url: string, body: any): Promise<T> => {
    try {
        const { data } = await apiInstance.post(url, body);
        return data as T;
    } catch (error) {
        if (isAxiosError(error)) throw error.response?.data?.message;
        throw new Error("Parece que hubo un error -  Intenta mas tarde");
    }
}



export const http = {
    get,
    post
}