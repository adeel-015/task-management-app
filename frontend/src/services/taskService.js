import { taskAPI } from "./api.js";

export const taskService = {
  getTasks: async (filters = {}) => {
    try {
      const response = await taskAPI.getTasks(filters);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getTask: async (id) => {
    try {
      const response = await taskAPI.getTask(id);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  createTask: async (title, description, status) => {
    try {
      const response = await taskAPI.createTask(title, description, status);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateTask: async (id, data) => {
    try {
      const response = await taskAPI.updateTask(id, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  deleteTask: async (id) => {
    try {
      const response = await taskAPI.deleteTask(id);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default taskService;
