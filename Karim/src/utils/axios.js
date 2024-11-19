// src/utils/axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_VUE_API_URL}`, // 환경에 맞게 수정
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 쿠키를 포함해야 하는 경우
});

export default axiosInstance;
