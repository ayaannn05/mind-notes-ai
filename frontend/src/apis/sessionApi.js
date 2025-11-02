import { API_BASE_URL } from "../config";
import axios from "axios";
import { handleErrors } from "../utils/apiErrorHandler";

export const createSession = async (
  project_id,
  sessionName,
  source,
  sourceType,
  url,
  text
) => {
  try {
    const formData = new FormData();
    formData.append("project_id", project_id);
    formData.append("session_name", sessionName);
    if (source) {
      formData.append("source", source);
    }
    formData.append("source_type", sourceType);
    if (url) {
      formData.append("url_source", url);
    }
    if (text) {
      formData.append("text_source", text);
    }

    const response = await axios.post(
      `${API_BASE_URL}/api/session/create`,
      formData
    );

    if (response.status !== 200) {
      throw new Error(response.data.detail || "An error occurred");
    }

    return await response.data;
  } catch (error) {
    handleErrors(error, "createSession");
  }
};

export const getAllSessions = async (project_id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/session/all/${project_id}`
    );
    return response.data;
  } catch (error) {
    handleErrors(error, "getAllSessions");
  }
};

export const getSessionData = async (session_id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/session/data/${session_id}`
    );
    return response.data;
  } catch (error) {
    handleErrors(error, "getSessionData");
  }
};

export const deleteSession = async (project_id, session_id) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/api/session/delete/${project_id}/${session_id}`
    );
    return response.data;
  } catch (error) {
    handleErrors(error, "deleteSession");
  }
};
