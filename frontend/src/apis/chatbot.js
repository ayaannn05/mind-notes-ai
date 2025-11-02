import { API_BASE_URL, API_URL } from "../config";
import axios from "axios";
import { handleErrors } from "../utils/apiErrorHandler";

export const generateChatbotResponse = async (chat_request) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/chatbot/chat`,
      chat_request,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(response.data.detail || "An error occurred");
    }

    return await response.data;
  } catch (error) {
    handleErrors(error, "generateChatbotResponse");
  }
};

export const generateChatbotHints = async (session_id) => {
  console.log("session_id", session_id);
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/chatbot/generate-hints/${session_id}`
    );
    return response.data;
  } catch (error) {
    handleErrors(error, "generateChatbotHints");
  }
};

export const chatWithAI = async (requestBody) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/v1/chat`,
      requestBody,
      {withCredentials: true}
    );
    return response.data;
  } catch (error) {
    if(error.response){
      throw error.response.data.message;
    }
    throw error.message;
  }
};

export const getAllMessages = async (noteId) => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/chat/${noteId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
    throw error.message;
  }
};
export const deleteChat = async () => {
  try {
    const response = await axios.delete(`${API_URL}/api/v1/chat`,{withCredentials: true});
    return response.data;
  } catch (error) {
    if(error.response){
      throw error.response.data.message;
    }
    throw error.message;
  }
};