import axios from "axios";
import { apiRoutes } from "@utils/constants";
import { getAuthorizationTokenHeader } from "@utils";

const API_URL = process.env.REACT_APP_API_URL;

export const loginUser = async (payload) => {
  try {
    const response = await axios.post(`${API_URL}/${apiRoutes.login}`, payload);
    return { isError: false, data: response.data };
  } catch (error) {
    return { isError: true, message: error.message };
  }
};

export const registerUser = async (payload, token) => {
  try {
    const headers = getAuthorizationTokenHeader(token);

    const response = await axios.post(
      `${API_URL}/${apiRoutes.users}`,
      payload,
      {
        headers: { ...headers },
      }
    );
    return { isError: false, data: response.data };
  } catch (error) {
    return { isError: true, message: error.message };
  }
};

export const fetchAllTasks = async (token) => {
  try {
    const headers = getAuthorizationTokenHeader(token);
    const response = await axios.get(`${API_URL}/${apiRoutes.tasks}`, {
      headers: { ...headers },
    });
    return { isError: false, data: response.data };
  } catch (error) {
    return { isError: true, message: error.message };
  }
};

export const createATask = async (payload, token) => {
  try {
    const headers = getAuthorizationTokenHeader(token);

    const response = await axios.post(
      `${API_URL}/${apiRoutes.tasks}`,
      payload,
      { headers: { ...headers } }
    );
    return { isError: false, data: response.data };
  } catch (error) {
    return { isError: true, message: error.message };
  }
};

export const updateATask = async ({ payload, id, token }) => {
  try {
    const headers = getAuthorizationTokenHeader(token);
    const response = await axios.post(
      `${API_URL}/${apiRoutes.tasks}/${id}`,
      payload,
      {
        headers: { ...headers },
      }
    );

    console.log(response);
    return { isError: false, data: response.data };
  } catch (error) {
    console.log(error);
    return { isError: true, message: error.message };
  }
};

export const deleteATask = async (id, token) => {
  try {
    const headers = getAuthorizationTokenHeader(token);
    const response = await axios.delete(`${API_URL}/${apiRoutes.tasks}/${id}`, {
      headers: { ...headers },
    });
    return { isError: false, data: response.data };
  } catch (error) {
    return { isError: true, message: error.message };
  }
};

export const fetchAllUsers = async (token) => {
  try {
    const headers = getAuthorizationTokenHeader(token);
    const response = await axios.get(`${API_URL}/${apiRoutes.users}`, {
      headers: { ...headers },
    });
    return { isError: false, data: response.data };
  } catch (error) {
    return { isError: true, message: error.message };
  }
};

export const updateAUser = async (payload, token) => {
  try {
    const headers = getAuthorizationTokenHeader(token);
    const response = await axios.put(`${API_URL}/${apiRoutes.users}`, payload, {
      headers: { ...headers },
    });
    return { isError: false, data: response.data };
  } catch (error) {
    return { isError: true, message: error.message };
  }
};

export const deleteAUser = async (id, token) => {
  try {
    const headers = getAuthorizationTokenHeader(token);
    const response = await axios.delete(`${API_URL}/${apiRoutes.users}/${id}`, {
      headers: { ...headers },
    });
    return { isError: false, data: response.data };
  } catch (error) {
    return { isError: true, message: error.message };
  }
};
