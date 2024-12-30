import axios from 'axios';
import { API_URL } from "./utils.jsx";

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true, // Ensure cookies are sent with requests
    headers: {
        'Content-Type': 'application/json'
    }
});

export const CreateTask = async (taskObj) => {
    try {
        const response = await api.post('/tasks', taskObj);
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { error: 'Network Error' };
    }
};

export const GetAllTasks = async () => {
    try {
        const response = await api.get('/tasks');
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { error: 'Network Error' };
    }
};

export const UpdateTask = async (id, taskObj) => {
    try {
        const response = await api.put(`/tasks/${id}`, taskObj);
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { error: 'Network Error' };
    }
};

export const DeleteTaskById = async (id) => {
    try {
        const response = await api.delete(`/tasks/${id}`);
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { error: 'Network Error' };
    }
};