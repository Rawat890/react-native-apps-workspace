import axios from "axios";
import { tmdbAccessToken, tmdbBaseURL } from "./config";

export const apiClient = axios.create({
    baseURL: tmdbBaseURL,
    timeout: 10000,
    headers: {
        Authorization: 'Bearer ' + tmdbAccessToken,
        accept: 'application/json',
    },
});



apiClient.interceptors.response.use(
    response => response,
    error => {
        console.error("API call error:", error);
        return Promise.reject(error);
    }
)
