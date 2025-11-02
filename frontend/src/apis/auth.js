import axios from 'axios';
import {API_URL} from '../config';

export const getUser = async () => {
    try{
        const {data} = await axios.get(`${API_URL}/api/v1/user/me`,{
            withCredentials: true,
        });
        return data;
    }catch(error){
        if(error.response){
            throw error.response.data.message;
        }
        throw error.message;
    }
}

export const loginUser = async (email,password) => {
    try{
        const {data} = await axios.post(`${API_URL}/api/v1/auth/login`,{email,password},{withCredentials:true});
        return data;
    }catch(error){
        if(error.response){
            throw error.response.data.message;
        }
        throw error.message;
    }
}

export const googleLogin = async () => {
    try{
        const {data} = await axios.get(`${API_URL}/api/v1/auth/google`,{withCredentials:true});
        return data;
    }catch(error){
        if(error.response){
            throw error.response.data.message;
        }
        throw error.message;
    }
}

export const logoutUser = async () => {
    try{
        const {data} = await axios.get(`${API_URL}/api/v1/auth/logout`,{withCredentials:true});
        return data;
    }catch(error){
        if(error.response){
            throw error.response.data.message;
        }
        throw error.message;
    }
}

export const signupUser = async (body) => {
    try{
        const {data} = await axios.post(`${API_URL}/api/v1/auth/signup`,body,{withCredentials:true});
        return data;
    }catch(error){
        if(error.response){
            throw error.response.data.message;
        }
        throw error.message;
    }
}