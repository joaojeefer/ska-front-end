import axios from "axios";
import { parseCookies } from 'nookies';

const USER_TOKEN_KEY = 'ska-app-token';

export const api = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(async (config) => {
    const { [USER_TOKEN_KEY]: token } = parseCookies();

    if (token) {
        config.headers['Authorization'] = `Bearer ${JSON.parse(token)}`;
    }

    return config;
});