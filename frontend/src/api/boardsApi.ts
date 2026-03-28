import api from "./axiosConfig";

export const getBoard = async (boardId: string) =>{
    const response = await api.get(`/boards/${boardId}`);
    return response.data; 
}

export const createBoard = async (name: string, description?: string ) => {
    const response = await api.post('/boards', {name, description});
    return response.data; 
}

export const updateBoard = async (boardId: string, name: string, description?:string) =>{
    const response = await api.put(`/boards/${boardId}`,{name, description});
    return response.data;
}    

export const deleteBoard = async (boardId: string) => {
    const response = await api.delete(`/boards/${boardId}`);
    return response.data; 
}