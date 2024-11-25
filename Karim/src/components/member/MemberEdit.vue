<script setup>
import { ref, onMounted } from "vue";
import { useLoginStore } from "@/stores/login";
import { useRouter } from "vue-router";
import axios from "@/utils/axios"; // axios 임포트

const router = useRouter();
const loginStore = useLoginStore();
const member = ref(null); // 사용자 정보를 저장할 ref
const showWithdrawModal = ref(false); // 탈퇴 확인 모달 상태

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
    await axios.patch(
      "/member/modify",
      { id: member.value.id, nickname: member.value.nickname }, // 닉네임만 서버로 전송
    );
    alert("수정되었습니다.");
    loginStore.setName(member.value.nickname); // 로그인 정보 업데이트
    router.push({ name: "profile", params: {id: member.value.id} }); // 수정 후 마이페이지로 이동
  } catch (error) {
    console.error("수정 중 오류 발생:", error);
    alert("수정하는 중 오류가 발생했습니다.");
  }
};

// 회원 탈퇴 처리
const handleWithdraw = async () => {
  try {
    await axios.delete(`/member/withdraw/${member.value.id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
    });
    alert("탈퇴가 완료되었습니다.");
    loginStore.setLogin(false, null, null); // 로그아웃 처리
    router.push({ name: "home" }); // 홈으로 이동
  } catch (error) {
    console.error("탈퇴 중 오류 발생:", error);
    alert("탈퇴하는 중 오류가 발생했습니다.");
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
          <button @click="router.push({ name: 'mypage' })" class="back">뒤로</button>
          <button class="withdraw" @click="showWithdrawModal = true">탈퇴하기</button>
        </div>
      </div>
    </template>

    <!-- 탈퇴 확인 모달 -->
    <div v-if="showWithdrawModal" class="modal-overlay">
      <div class="modal">
        <h3>정말로 탈퇴하시겠습니까?</h3>
        <p>탈퇴 후 복구할 수 없습니다.</p>
        <div class="modal-buttons">
          <button @click="handleWithdraw">예, 탈퇴합니다</button>
          <button @click="showWithdrawModal = false">취소</button>
        </div>
      </div>
    </div>
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

.back {
  background-color: #ccc;
  color: #333;
}

.back:hover {
  background-color: #bbb;
}

.withdraw {
  background-color: #d9534f; /* 붉은색 */
}

.withdraw:hover {
  background-color: #c9302c; /* hover 효과 적용 */
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.modal h3 {
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
}

.modal p {
  font-size: 14px;
  margin-bottom: 20px;
  color: #666;
}

.modal-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.modal-buttons button {
  background-color: #d9534f;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.modal-buttons button:hover {
  background-color: #c9302c;
}

.modal-buttons button:last-child {
  background-color: #ccc;
  color: #333;
}

.modal-buttons button:last-child:hover {
  background-color: #bbb;
}
</style>
