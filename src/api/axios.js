import axios from "axios";

const BASE_BACKEND_URL = import.meta.env.VITE_DJANGO_APP_BASE_URL;

export default axios.create({
  baseURL: BASE_BACKEND_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_BACKEND_URL,
  withCredentials: true,
});
