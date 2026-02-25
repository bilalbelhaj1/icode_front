import axios from "axios"
const api = axios.create({
    baseURL: "https://express-js-on-vercel-kappa-roan-92.vercel.app",
    withCredentials:true
})

export default api;