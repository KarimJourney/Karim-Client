<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router"; // vue-router 임포트
import axios from "@/utils/axios"; // axios 임포트
import { useLoginStore } from "@/stores/login"; // Pinia 스토어 임포트

const router = useRouter(); // 라우터 인스턴스
const code = ref(""); // code 상태 관리
const loginStore = useLoginStore(); // Pinia 스토어 인스턴스

const getToken = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8080/member/kakaologin/${code.value}`
    );
    console.log(response);

    // message가 "로그인"인지 확인
    if (response.data.message === "로그인" || response.data.message === "회원가입") {
      // 각 데이터를 추출
      const accessToken = response.data.accessToken;
      const memberId = response.data.member.id;
      const nickname = response.data.member.nickname;
      const refreshToken = response.data.refreshToken;

      console.log("Access Token:", accessToken);
      console.log("Member ID:", memberId);
      console.log("Nickname:", nickname);
      console.log("Refresh Token:", refreshToken);

      // Pinia 스토어에 로그인 상태 설정
      loginStore.setLogin(true, memberId, nickname);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // HomeView로 이동
      router.push({
        name: "home", // HomeView 라우트 이름
      });
    }
  } catch (error) {
    console.error("Error fetching token:", error);
  }
};

onMounted(() => {
  code.value = new URLSearchParams(window.location.search).get("code"); // query parameter에서 code 추출
  console.log("Code:", code.value);
  getToken();
});
</script>

<template></template>

<style scoped>
/* 스타일 추가 */
</style>
