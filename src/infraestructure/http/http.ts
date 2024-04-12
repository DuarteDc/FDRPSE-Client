import { isAxiosError } from 'axios';
import { apiInstance } from './fetch';


const DEFAULT_ERROR = 'Parece que hubo un error -  Intenta mas tarde';

const get = async <T>(url: string): Promise<T> => {
    try {
        const { data } = await apiInstance.get(url);
        return data as T;
    } catch (error) {
        if (isAxiosError(error)) throw error.response?.data?.message;

        throw new Error(DEFAULT_ERROR);
    }
}

const post = async <T>(url: string, body: object): Promise<T> => {
    try {
        const { data } = await apiInstance.post(url, body);
        return data as T;
    } catch (error) {
        if (isAxiosError(error)) throw error.response?.data?.message;
        throw new Error(DEFAULT_ERROR);
    }
}


const patch = async <T>(url: string, body: object): Promise<T> => {
    try {
        const { data } = await apiInstance.patch(url, body);
        return data as T;
    } catch (error) {
        if (isAxiosError(error)) throw error.response?.data?.message;
        throw new Error(DEFAULT_ERROR);
    }
}


const destroy = async <T>(url: string): Promise<T> => {
    try {
        const { data } = await apiInstance.delete(url);
        return data as T;
    } catch (error) {
        if (isAxiosError(error)) throw error.response?.data?.message;
        throw new Error(DEFAULT_ERROR);
    }
}


const download = async (url: string): Promise<void> => {
    try {
        const { data } = await apiInstance.get(url, {
            responseType: 'blob',
        })
        const downloadUrl = window.URL.createObjectURL(data);
        window.open(downloadUrl, '__blank');
    } catch (error) {
        if (isAxiosError(error)) throw error.response?.data?.message;
        throw new Error(DEFAULT_ERROR);
    }
}




export const http = {
    get,
    post,
    patch,
    destroy,
    download,
}