import axios from 'axios';

const instance = axios.create({
    baseUrl: import.meta.env.VITE_API_URL
});

export default instance;