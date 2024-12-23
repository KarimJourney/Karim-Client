import axios from "axios";
import router from "@/router"; // Router 인스턴스를 가져옴
import { useLoginStore } from "@/stores/login"; // LoginStore import

const API = axios.create({
  baseURL: `${import.meta.env.VITE_VUE_API_URL}`, // 환경에 맞게 수정
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 쿠키를 포함해야 하는 경우
});

// 요청 인터셉터: Authorization 헤더에 Access Token 추가
API.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: Access Token 만료 시 Refresh Token 사용
API.interceptors.response.use(
  (response) => response, // 성공 응답 그대로 반환
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      // Refresh Token으로 새로운 Access Token 발급
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post(
          `${import.meta.env.VITE_VUE_API_URL}/member/refresh`, // Refresh 토큰 API
          {},
          {
            headers: { Authorization: `Bearer ${refreshToken}` },
          }
        );

        const newAccessToken = response.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        console.log("Response:", response); 
        // 원래의 요청을 새로운 Access Token으로 다시 실행
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return API(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token expired or invalid", refreshError);

        // LoginStore의 상태를 갱신하여 로그인 상태를 'false'로 변경
        const loginStore = useLoginStore(); // store 인스턴스를 가져옴
        loginStore.setLogin(false, "", "", "", "", "");

        // Vue Router를 사용해 홈으로 이동
        await router.push({ name: "home" });
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default API;
