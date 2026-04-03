import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://mytaskboard-api.azurewebsites.net/api'
})

export default api;