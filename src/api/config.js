import axios from "axios";

// Localhost-e thakle 3500 port use korbe, ar deploy korle Vercel link use korbe
export const BASE_URL = window.location.hostname === "localhost" 
    ? "http://localhost:3500" 
    : "https://cleancity-project.vercel.app";

export const axiosPublic = axios.create({
    baseURL: BASE_URL,
    withCredentials: true 
});