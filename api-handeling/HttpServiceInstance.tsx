import axios from "axios";
import { redirect } from "next/navigation";
import { useCallback } from "react";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const ImageUrl = process.env.NEXT_PUBLIC_SITE_IMAGE_URL;

type PayloadObject = { [key: string]: any };

// Sets request and response interceptors
export const useAuthGuard = () => {
  const setInterceptors = useCallback(() => {
    apiClient.interceptors.request.use((request) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        request.headers.Authorization = `Bearer ${token}`;
      }
      return request;
    });

    apiClient.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === 401) {
          localStorage.clear();
          redirect("/"); // Redirect to login/home
        }
        return Promise.reject(error);
      }
    );
  }, []);

  return setInterceptors;
};

// GET with JWT
export const getJwt = async (endpoint: string) => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await apiClient.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error?.response;
  }
};

export const get = async (endpoint: string) => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error: any) {
    return error?.response;
  }
};

// POST
export const post = async (endpoint: string, data: PayloadObject) => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await apiClient.post(endpoint, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error?.response;
  }
};

// ✏️ PUT
export const put = async (endpoint: string, data: PayloadObject) => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await apiClient.put(endpoint, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error?.response;
  }
};

// POST with FormData
export const postAsForm = async (endpoint: string, formData: FormData) => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await apiClient.postForm(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error?.response;
  }
};

// PUT with FormData
export const putAsForm = async (endpoint: string, formData: FormData) => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await apiClient.putForm(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error?.response;
  }
};

// DELETE
export const Delete = async (endpoint: string) => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await apiClient.delete(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error?.response;
  }
};

export default apiClient;
