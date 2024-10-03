import axios from "axios";
import { parseCookies } from 'nookies';

const USER_TOKEN_KEY = 'ska-app-token';

const { [USER_TOKEN_KEY]: token } = parseCookies();

export const api = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json',
    },
});

if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${JSON.parse(token).token}`;
}