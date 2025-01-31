import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { toast } from "react-toastify";

let refresh = false;

// const baseUrl = `http://192.168.3.91:8000/api/`

export const baseUrl = `${process.env.REACT_APP_BASE_URL}/api/`;

// const baseUrl = "https://af0a-202-83-25-55.ngrok-free.app/api/";
export const rtkQueryServiceTags = {
  PROGRAM: "Program",
  GOALS: "Goals",
  MATERIAL: "Material",
  CERTIFICATE: "Certificate",
  EQUIPMENT: "Equipment",
  BULK_UPLOAD: "BulkUpload",
};
const { PROGRAM, GOALS, MATERIAL, CERTIFICATE, EQUIPMENT, BULK_UPLOAD } = rtkQueryServiceTags;

export const rtkQueryApiServices = createApi({
  reducerPath: "rtkQueryApiServices",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access_token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: [PROGRAM, GOALS, MATERIAL, CERTIFICATE, EQUIPMENT, BULK_UPLOAD], // Define the necessary tags
  endpoints: () => ({}),
});

const api = axios.create({
  baseURL: baseUrl,
  // headers: {
  //   "Ngrok-Agent-Ips": "202.83.25.55",
  //   "X-Frame-Options": "DENY",
  //   "Vary": "Accept, origin",
  //   "X-Content-Type-Options": "nosniff",
  //   "ngrok-skip-browser-warning": "69420",
  // },
});

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    if (
      response.status &&
      (response.status === 200 || response.status === 201)
    ) {
      return {
        data: response.data,
        status: response.status,
      };
    }
    return response;
  },
  async (error) => {
    const reasons = ["ERR_BAD_REQUEST", "ERR_NETWORK", "ERR_BAD_RESPONSE"];
    const errMsg =
      error?.response?.data?.errors?.[0] ??
      error?.response?.data?.error ??
      error?.response?.data?.message;
    if (errMsg?.length > 0) {
      toast.error(errMsg);
    }
    if (
      error.code &&
      (error.code === "ERR_NETWORK" || error.code === "ERR_BAD_RESPONSE")
    ) {
      error.message = "There is a Server Error. Please try again later.";
    }
    if (
      error.code &&
      error.code === "ERR_BAD_REQUEST" &&
      error.response.status === 401
    ) {
      if (localStorage.getItem("access_token")) {
        window.location.replace(window.location.origin + "/logout");
      }
      error.message =
        error.response.data?.error || error.response.data?.message;
    }
    if (
      error.code &&
      error.code === "ERR_BAD_REQUEST" &&
      error.response.status === 400
    ) {
      error.message =
        error.response.data?.error ||
        error.response.data?.message ||
        error.response.data?.email[0];
    }
    if (
      !reasons.includes(error.code) &&
      error.response.status === 401 &&
      !refresh
    ) {
      refresh = true;
      try {
        const response = await axios.post(
          `${baseUrl}/token/refresh`,
          {
            refresh: localStorage.getItem("refresh_token"),
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data["access"]}`;
          localStorage.setItem("access_token", response.data.access);
          localStorage.setItem("refresh_token", response.data.refresh);
          return axios(error.config);
        }
      } catch (error) {
        console.error("Token refresh error:", error);
      }
    }
    refresh = false;
    return Promise.reject(error);
  }
);

export default api;
