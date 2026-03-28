import type { TaskStatus } from "../types";
import api from "./axiosConfig";

export const addTask = async (boardId: string, name: string, status: TaskStatus, description?: string, icon?: string) => {
    const response = await api.post(`/boards/${boardId}/tasks`, { name, description, status, icon })
    return response.data;
}

export const updateTask = async (taskId: string, name: string, description?: string, status?: TaskStatus, icon?: string) => {
    const response = await api.put(`/tasks/${taskId}`, { name, description, status, icon })
    return response.data;
}

export const deleteTask = async (taskId: string) => {
    const reponse = await api.delete(`/tasks/${taskId}`);
    return reponse.data;
}