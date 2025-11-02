import { API_BASE_URL } from "../config";
import axios from "axios";
import { handleErrors } from "../utils/apiErrorHandler";

export const createProject = async (project_name) => {
  try {
    const formData = new FormData();
    formData.append("project_name", project_name);
    const response = await axios.post(
      `${API_BASE_URL}/api/project/create`,
      formData
    );

    if (response.status !== 200) {
      throw new Error(response.data.detail || "An error occurred");
    }

    return await response.data;
  } catch (error) {
    handleErrors(error, "createProject");
  }
};

export const getAllProjects = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/project`);
    return response.data;
  } catch (error) {
    handleErrors(error, "getAllProjects");
  }
};


export const deleteProject = async (project_id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/project/${project_id}`);
    return response.data;
  } catch (error) {
    handleErrors(error, "deleteProject");
  }
};
