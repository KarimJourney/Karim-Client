<script setup>
import { ref, onMounted } from "vue";
import { useLoginStore } from "@/stores/login";
import { useRouter } from "vue-router";
import axios from "@/utils/axios"; // axios 임포트

const router = useRouter();
const loginStore = useLoginStore();
const member = ref(null); // 사용자 정보를 저장할 ref

// 사용자 정보 가져오기
const fetchMemberInfo = async () => {
  const userId = loginStore.getId; // 로그인된 사용자 ID
  try {
    const response = await axios.get(`/member/${userId}`);
    member.value = response.data; // 사용자 정보를 member에 저장
  } catch (error) {
    console.error("회원 정보를 가져오는 데 실패했습니다.", error);
    alert("회원 정보를 가져오는 중 오류가 발생했습니다.");
    router.push({ name: "home" }); // 실패 시 홈으로 이동
  }
};

// 닉네임 수정 처리
const handleModify = async () => {
  const confirmModify = confirm("내 정보를 수정하시겠습니까?");
  if (!confirmModify) return;

  try {
    const response = await axios.patch(
      "/member/modify",
      { id: member.value.id, nickname: member.value.nickname }, // 닉네임만 서버로 전송
      { headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` } }
    );
    alert("수정되었습니다.");
    loginStore.setLogin(true, loginStore.getId, member.value.nickname); // 로그인 정보 업데이트
    router.push({ name: "mypage" }); // 수정 후 마이페이지로 이동
  } catch (error) {
    console.error("수정 중 오류 발생:", error);
    alert("수정하는 중 오류가 발생했습니다.");
  }
};

// 컴포넌트가 로드될 때 사용자 정보 가져오기
onMounted(() => {
  fetchMemberInfo();
});
</script>

<template>
  <section class="member-edit">
    <h2>내 정보 수정</h2>
    <template v-if="member">
      <div class="items">
        <div class="item">
          <label for="userId">아이디</label>
          <input id="userId" class="field" v-model="member.id" readonly />
        </div>
        <div class="item">
          <label for="nickname">닉네임</label>
          <input id="nickname" class="field" v-model="member.nickname" />
        </div>
        <div class="btn">
          <button @click="handleModify">수정하기</button>
          <button @click="router.push({ name: 'home' })">뒤로</button>
        </div>
      </div>
    </template>
  </section>
</template>

<style scoped>
.member-edit {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}

h2 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
}

.items {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

label {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.field {
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 6px;
  width: 100%;
}

.btn {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
}

button {
  background-color: var(--navy);
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: var(--navy);
}
</style>
