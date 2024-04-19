import axios from 'axios';
import { storage } from '../local-storage/localStorage';

export const apiInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    responseType: 'json',
})

apiInstance.interceptors.request.use(
    async config => {
        const session = storage.get('session');
        if (typeof session === 'string') config.headers.session = session;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

apiInstance.interceptors.response.use(
    async response => response,
    error => {
        if (window.location.pathname !== "/cuestionario/" && error.request.status === 401) {
            window.location.replace("/cuestionario/")
        }
        return Promise.reject(error);
    }
)

