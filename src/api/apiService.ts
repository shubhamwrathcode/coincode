import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// Base URL for your API
const BASE_URL = 'https://backend.arabglobal.ae';

// Pre-configured axios instance
const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
});

/**
 * Handle API responses and errors consistently
 */
const handleResponse = (response: AxiosResponse) => {
    return response.data;
};

const handleError = (error: any) => {
    console.error('[API Error]:', error?.response?.data || error.message);
    throw error?.response?.data || error;
};

export const ApiService = {
    // ==========================================
    // GET METHODS
    // ==========================================
    get: async (url: string, params?: any) => {
        try {
            const response = await apiClient.get(url, { params });
            return handleResponse(response);
        } catch (error) {
            return handleError(error);
        }
    },

    getWithToken: async (url: string, token: string, params?: any) => {
        try {
            const response = await apiClient.get(url, {
                params,
                headers: { Authorization: `Bearer ${token}` }
            });
            return handleResponse(response);
        } catch (error) {
            return handleError(error);
        }
    },

    // ==========================================
    // POST METHODS
    // ==========================================
    post: async (url: string, data: any) => {
        try {
            const response = await apiClient.post(url, data);
            return handleResponse(response);
        } catch (error) {
            return handleError(error);
        }
    },

    postWithToken: async (url: string, data: any, token: string) => {
        try {
            const response = await apiClient.post(url, data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return handleResponse(response);
        } catch (error) {
            return handleError(error);
        }
    },

    postFormData: async (url: string, formData: FormData) => {
        try {
            const response = await apiClient.post(url, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return handleResponse(response);
        } catch (error) {
            return handleError(error);
        }
    },

    postFormDataWithToken: async (url: string, formData: FormData, token: string) => {
        try {
            const response = await apiClient.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });
            return handleResponse(response);
        } catch (error) {
            return handleError(error);
        }
    },

    // ==========================================
    // PUT METHODS
    // ==========================================
    put: async (url: string, data: any) => {
        try {
            const response = await apiClient.put(url, data);
            return handleResponse(response);
        } catch (error) {
            return handleError(error);
        }
    },

    putWithToken: async (url: string, data: any, token: string) => {
        try {
            const response = await apiClient.put(url, data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return handleResponse(response);
        } catch (error) {
            return handleError(error);
        }
    },

    putFormDataWithToken: async (url: string, formData: FormData, token: string) => {
        try {
            const response = await apiClient.put(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });
            return handleResponse(response);
        } catch (error) {
            return handleError(error);
        }
    },

    // ==========================================
    // DELETE METHODS
    // ==========================================
    delete: async (url: string) => {
        try {
            const response = await apiClient.delete(url);
            return handleResponse(response);
        } catch (error) {
            return handleError(error);
        }
    },

    deleteWithToken: async (url: string, token: string, data?: any) => {
        try {
            const config: AxiosRequestConfig = {
                headers: { Authorization: `Bearer ${token}` },
                data
            };
            const response = await apiClient.delete(url, config);
            return handleResponse(response);
        } catch (error) {
            return handleError(error);
        }
    }
};
