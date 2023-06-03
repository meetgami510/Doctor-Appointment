import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://13.126.220.18//api'
});

export default axiosInstance;