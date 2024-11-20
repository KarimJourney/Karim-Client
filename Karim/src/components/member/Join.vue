<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import axios from "@/utils/axios"; // axios 임포트

// params를 ref로 설정하여 양방향 바인딩
const params = ref({
  userId: "",
  userPwd: "",
  userName: "",
  emailId: "",
  emailDomain: "",
});

const pwdCheck = ref("");
const resultMessage = ref("");
const isUseId = ref(false);
const errorMessage = ref("");

const router = useRouter();

// 아이디 중복 확인 함수
const checkId = async () => {
  const id = params.value.userId;
  if (id.length < 4 || id.length > 16) {
    resultMessage.value = "아이디는 4자 이상, 16자 이하로 입력해주세요.";
    isUseId.value = false;
    return;
  }

  try {
    const { data } = await axios.get(`/user/idcheck/${id}`);
    console.log(data);
    if (data === 0) {
      resultMessage.value = `${id}은 사용할 수 있습니다.`;
      isUseId.value = true;
    } else {
      resultMessage.value = `${id}은 사용할 수 없습니다.`;
      isUseId.value = false;
    }
  } catch (error) {
    console.error(error);
    resultMessage.value = "아이디 중복 확인 중 오류가 발생했습니다.";
    isUseId.value = false;
  }
};

// 비밀번호 확인 함수
const validatePasswords = () => {
  if (params.value.userPwd !== pwdCheck.value) {
    return "비밀번호가 일치하지 않습니다.";
  }
  return "";
};

// 회원가입 제출 함수
const join = async () => {
  if (!isUseId.value) {
    errorMessage.value = "아이디 중복 확인을 먼저 해주세요.";
    return;
  }

  const passwordError = validatePasswords();
  if (passwordError) {
    errorMessage.value = passwordError;
    return;
  }

  try {
    const response = await axios.post("/user/join", params.value);
    if (response.data.msg === "ok") {
      emit("close"); // 회원가입 완료 후 모달 닫기
      router.push({ name: "home" }); // 로그인 페이지로 이동
    } else {
      errorMessage.value = response.msg;
    }
  } catch (error) {
    console.error(error);
    errorMessage.value = "회원가입 중 오류가 발생했습니다.";
  }
};

// 아이디 변경 시 idcheck 자동 실행
watch(
  () => params.value.userId,
  (newUserId) => {
    if (newUserId) {
      checkId();
    }
  }
);

// emit 정의 (부모로부터 'close' 이벤트 전달)
const emit = defineEmits("close");
</script>

<template>
  <div id="modal-overlay">
    <div id="modal">
      <h2>회원가입</h2>
      <div id="modal-content">
        <div class="items">
          <div class="item">
            <label for="userid">아이디</label>
            <input id="userid" name="userid" class="field" type="text" v-model="params.userId"
              required />
            <span v-if="resultMessage" class="result-message">
              {{ resultMessage }}
            </span>
          </div>

          <div class="item">
            <label for="userpwd">비밀번호</label>
            <input id="userpwd" name="userpwd" class="field" type="password"
              v-model="params.userPwd" required />
          </div>

          <div class="item">
            <label for="pwdcheck">비밀번호 확인</label>
            <input id="pwdcheck" name="pwdcheck" class="field" type="password"
              v-model="pwdCheck" required />
          </div>

          <div class="item">
            <label for="username">이름</label>
            <input id="username" name="username" class="field" type="text" v-model="params.userName"
              required />
          </div>

          <div class="item">
            <label for="emailid">이메일 </label>
            <div class="emailContainer">
              <input id="emailid" class="field" type="text" v-model="params.emailId" required />
              <span>&nbsp;@&nbsp;</span>
              <select class="field" aria-label="도메인 선택" v-model="params.emailDomain">
                <option value="ssafy.com">ssafy.com</option>
                <option value="google.com">google.com</option>
                <option value="naver.com">naver.com</option>
                <option value="kakao.com">kakao.com</option>
              </select>
            </div>
          </div>
        </div>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        <div class="btn">
          <button @click="join">가입</button>
          <button id="signupCloseBtn" @click="emit('close')">닫기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h2 {
  font-weight: 800;
}

.items {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.item {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.emailContainer {
  display: flex;
  width: 73.5%;
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

.result-message {
  color: var(--purple);
  /* 결과 메시지 색상 */
  font-size: 0.875rem;
  /* 글자 크기 */
  margin-top: 5px;
  /* 상단 여백 */
}

.error-message {
  color: var(--red);
}

@media screen and (max-width: 768px) {
  .field, .emailContainer {
    width: 100%;
  }
}
</style>
