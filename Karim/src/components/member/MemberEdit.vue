<script setup>
import { ref, onMounted } from "vue";
import { useLoginStore } from "@/stores/login";
import { useRouter } from "vue-router";
import axios from "@/utils/axios"; // axios 임포트

const router = useRouter();

// 로그인 상태 및 사용자 정보 관리
const loginStore = useLoginStore();
const member = ref(null); // 사용자 정보를 저장할 ref

// API로 사용자 정보 가져오기
const fetchMemberInfo = async () => {
  const userId = loginStore.getId; // 로그인된 사용자 ID 가져오기
  try {
    const response = await axios.post(`/user/mypage/${userId}`);
    member.value = response.data.member;
  } catch (error) {
    console.error("회원 정보를 가져오는 데 실패했습니다.", error);
    alert("회원 정보를 가져오는 중 오류가 발생했습니다.");
  }
};

// 수정하기 처리
const handleModify = async () => {
  const confirmModify = confirm("수정하시겠습니까?");
  if (!confirmModify) return;

  const memberDto = {
    userId: member.value.userId,
    userPwd: member.value.userPwd,
    userName: member.value.userName,
    emailId: member.value.emailId,
    emailDomain: member.value.emailDomain,
  };

  try {
    const response = await axios.post("/user/modify", memberDto);
    alert("회원 정보가 수정되었습니다.");
    loginStore.setLogin(true, loginStore.getId, member.value.userName);
    router.push({ name: "mypage" });
  } catch (error) {
    console.error("회원 정보 수정 중 오류 발생:", error);
    alert("회원 정보를 수정하는 중 오류가 발생했습니다.");
  }
};

// 탈퇴 처리
const handleExit = async () => {
  const confirmExit = confirm("탈퇴하시겠습니까?");
  if (!confirmExit) return;

  try {
    await axios.post("/user/delete", {
      userId: member.value.userId,
      userPwd: member.value.userPwd,
    });
    loginStore.setLogin(false); // 탈퇴 후 로그아웃 처리
    router.push({name:'home'});
  } catch (error) {
    console.error("회원 탈퇴 중 오류 발생:", error);
    alert("회원 탈퇴하는 중 오류가 발생했습니다.");
  }
};

// 페이지 로드 시 사용자 정보 가져오기
onMounted(() => {
  fetchMemberInfo();
});
</script>

<template>
  <section>
    <h2>내 정보 수정</h2>
    <template v-if="member">
      <div class="items">
        <div class="item">
          <div>아이디</div>
          <input
            type="hidden"
            name="userId"
            class="field"
            readonly
            v-model="member.userId"
          />
          <span class="field">{{ member.userId }}</span>
        </div>
        <div class="item">
          <div>비밀번호</div>
          <input type="password" name="userPwd" class="field" v-model="member.userPwd" />
        </div>
        <div class="item">
          <div>닉네임</div>
          <input name="userName" class="field" v-model="member.userName" />
        </div>
        <div class="item">
          <div>이메일</div>
          <div class="emailContainer">
            <input name="emailId" class="field" v-model="member.emailId" />
            <span style="width: 4%;">@</span>
            <select
              class="field"
              name="emailDomain"
              v-model="member.emailDomain"
            >
              <option
                value="ssafy.com"
                :selected="member.emailDomain === 'ssafy.com'"
              >
              ssafy.com
              </option>
              <option
                value="google.com"
                :selected="member.emailDomain === 'google.com'"
              >
              google.com
              </option>
              <option
                value="naver.com"
                :selected="member.emailDomain === 'naver.com'"
              >
              naver.com
              </option>
              <option
                value="kakao.com"
                :selected="member.emailDomain === 'kakao.com'"
              >
              kakao.com
              </option>
            </select>
          </div>
        </div>
        <div class="btn">
          <button type="button" @click="handleModify">수정하기</button>
          <button type="button" @click="handleExit">탈퇴</button>
          <button type="button" @click="router.push({name:'home'})">뒤로</button>
        </div>
      </div>
    </template>
  </section>
</template>

<style scoped>
h2 {
  font-weight: 800;
}

.items {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.emailContainer {
  display: flex;
  width: 72%;
  min-width: 100px;
  flex: none;
  justify-content: start;
}


.btn {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 30px;
}

.field {
  width: 70%;
  min-width: 100px;
}
</style>
