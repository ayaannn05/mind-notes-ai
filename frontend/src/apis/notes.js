import axios from 'axios';
import {API_URL} from '../config';

export const getAllNotes = async (page = 1, limit = 3) => {
  try {
    const { data } = await axios.get(
      `${API_URL}/api/v1/notes?page=${page}&limit=${limit}`,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw error.message;
  }
};

export const createNote = async (note) => {
    try{
        const {data} = await axios.post(`${API_URL}/api/v1/notes`,note,{withCredentials:true});
        return data;
    }catch(error){
        if(error.response){
            throw error.response.data.message;
        }
        throw error.message;
    }
}

export const deleteNote = async (id) => {
    try{
        const {data} = await axios.delete(`${API_URL}/api/v1/notes/${id}`,{withCredentials:true});
        return data;
    }catch(error){
        if(error.response){
            throw error.response.data.message;
        }
        throw error.message;
    }
}

export const getNote = async (id) => {
    try{
        const {data} = await axios.get(`${API_URL}/api/v1/notes/${id}`,{withCredentials:true});
        return data;
    }catch(error){
        if(error.response){
            throw error.response.data.message;
        }
        throw error.message;
    }
}
export const updateNote = async (id, updatedFields) => {
  try {
    const { data } = await axios.patch(
      `${API_URL}/api/v1/notes/${id}`,
      updatedFields,
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw error.message;
  }
};