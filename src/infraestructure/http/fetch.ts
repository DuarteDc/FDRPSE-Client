import axios from 'axios';
import { storage } from '../local-storage/localStorage';

export const apiInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    responseType: 'json'
})

apiInstance.interceptors.request.use(
    async config => {
        const session = storage.get('session');
        if (session) config.headers.session = session;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

