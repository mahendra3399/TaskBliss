import { toast } from 'react-toastify';

export const notify = (message, type) => {
    toast[type](message);
}

export const API_URL = import.meta.env.MODE === "development" ? "http://localhost:3000/api" : '/api';