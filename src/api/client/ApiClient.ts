import axios from "axios";
import appConfig from "../../config/appConfig";
import {authEvents} from "../../context/events";

//인증이 필요하지 않을 때
export const apiClient = axios.create({
    baseURL: appConfig.baseUrl,
    timeout: 10_000, // 10초 타임아웃
    withCredentials: true
});

apiClient.interceptors.response.use(response => {
    return response;
}, async error => {
    if (error.response) {
        const { status } = error.response;
        if (status === 401 || status === 403) {
            authEvents.emit('authError', "Authentication Error");
        }
    }
    return Promise.reject(error);
});

