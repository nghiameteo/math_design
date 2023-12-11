import axios from "axios";

//instance
export const api = axios.create({
    baseURL: 'https://node-express-conduit.appspot.com/api',
    // baseURL: 'https://node-express-conduit.appspot.com/api'
    // baseURL: 'https://conduit.productionready.io/api',
});

//interceptors
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.set('Authorization', 'Bearer ' + token);
    }
    return config;
});
