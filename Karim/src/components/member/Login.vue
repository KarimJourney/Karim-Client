<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "@/utils/axios"; // axios를 임포트
import { useLoginStore } from "@/stores/login";
import { defineComponent } from 'vue';

defineComponent({
  name: 'MdiUser',
  name: 'MdiKeyOutline',
  name: 'RiKakaoTalkFill',
});

const loginStore = useLoginStore();
const emit = defineEmits("close");

const router = useRouter();
const userId = ref("");
const userPwd = ref("");
const errorMessage = ref("");

const login = async () => {
  if (!userId.value || !userPwd.value) {
    errorMessage.value = "*아이디와 비밀번호를 입력하세요.";
    return;
  }

  try {
    const response = await axios.post("/user/login", {
      userId: userId.value,
      userPwd: userPwd.value,
    });
    if (response.data.msg === "ok") {
      // 로그인 성공 후 홈으로 리다이렉트
      loginStore.setLogin(
        true,
        response.data.data.userId,
        response.data.data.userName
      );
      userId.value = "";
      userPwd.value = "";
      emit("close");
      router.push({ name: "home" });
    } else {
      errorMessage.value = response.data.msg;
    }
  } catch (error) {
    errorMessage.value = "*아이디와 비밀번호가 다릅니다.";
    console.error(error);
  }
};

const kakaoLogin = async () => {
  try {
    const client_id= import.meta.env.VITE_CLIENT_ID;
    const redirect_uri = import.meta.env.VITE_REDIRECT_URI;
    const response = await axios.get(`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}`);
    if (response.data.message === '로그인') {
      router.push({name:'home'});
    } else if (response.data.message === '회원가입') {
      // router.push({name:'register'});
      console.log("회원가입이 필요합니다");
    }
  } catch (error) {
    errorMessage.value = "*카카오 로그인에 실패했습니다.";
    console.error(error);
  }
}
</script>

<template>
  <div id="modal-overlay">
    <div id="modal">
      <button id="close" @click="$emit('close')">X</button>

      <div id="modal-content">
        <h2>KARIM</h2>
        <div class="items">
          <div class="item">
            <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="currentColor"
                  d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4" />
              </svg></span>
            <input type="text" v-model="userId" placeholder="아이디" />
          </div>

          <div class="item">
            <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="currentColor"
                  d="M21 18h-6v-3h-1.7c-1.1 2.4-3.6 4-6.3 4c-3.9 0-7-3.1-7-7s3.1-7 7-7c2.7 0 5.2 1.6 6.3 4H24v6h-3zm-4-2h2v-3h3v-2H11.9l-.2-.7C11 8.3 9.1 7 7 7c-2.8 0-5 2.2-5 5s2.2 5 5 5c2.1 0 4-1.3 4.7-3.3l.2-.7H17zM7 15c-1.7 0-3-1.3-3-3s1.3-3 3-3s3 1.3 3 3s-1.3 3-3 3m0-4c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1" />
              </svg></span>
            <input type="password" v-model="userPwd" placeholder="비밀번호" />
          </div>

          <div class="item">
            <p v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </p>

          <button class="login" @click="login">로그인</button>
          </div>
        </div>

        
        <a href="#" class="forgot-password">비밀번호를 잊으셨나요?</a>
        <div class="social-login">
          <hr />
          <p>간편 로그인</p>
          <button class="kakao-login" @click="kakaoLogin">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <path fill="currentColor"
                d="M12 3c5.8 0 10.501 3.664 10.501 8.185c0 4.52-4.701 8.184-10.5 8.184a14 14 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866c0-4.52 4.7-8.185 10.5-8.185m5.908 8.06l1.47-1.424a.472.472 0 0 0-.656-.678l-1.928 1.866V9.282a.472.472 0 0 0-.944 0v2.557a.5.5 0 0 0 0 .222V13.5a.472.472 0 0 0 .944 0v-1.363l.427-.413l1.428 2.033a.472.472 0 1 0 .773-.543zm-2.958 1.924h-1.46V9.297a.472.472 0 0 0-.943 0v4.159c0 .26.21.472.471.472h1.932a.472.472 0 1 0 0-.944m-5.857-1.091l.696-1.708l.638 1.707zm2.523.487l.002-.016a.47.47 0 0 0-.127-.32l-1.046-2.8a.69.69 0 0 0-.627-.474a.7.7 0 0 0-.653.447l-1.662 4.075a.472.472 0 0 0 .874.357l.332-.813h2.07l.298.8a.472.472 0 1 0 .884-.33zM8.294 9.302a.47.47 0 0 0-.471-.472H4.578a.472.472 0 1 0 0 .944h1.16v3.736a.472.472 0 0 0 .944 0V9.774h1.14a.47.47 0 0 0 .472-.472" />
            </svg>
            &nbsp;카카오로 간편로그인하기</button>
        </div>
        <p class="register">아직 회원이 아니신가요? <a href="#">가입하기</a></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
#modal {
  display: flex;
  align-items: center;
}

#close {
  position: absolute;
  right: 5px;
  top: 5px;
  cursor: pointer;
}

h2 {
  color: var(--navy);
  cursor: pointer;
  font-weight: 500;
  font-family: "dongle", sans-serif;
  font-size: 60px;
}

.items {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.item {
  width: 100%;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.item input {
  padding: 10px 40px;
  font-size: 16px;
  background-color: #F4F4F4;
}

.item .icon {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
}

.forgot-password {
  display: block;
  margin: 10px 0;
  color: var(--grey);
  font-size: 0.7em;
  text-decoration: underline;
}

.social-login hr {
  margin-top: 30px;
  height: 1px;
  color: var(--light-grey);
}

.social-login p {
  position: relative;
  left: 30%;
  transform: translateY(-100%);
  width: 40%;
  background-color: var(--white);
}

.login {
  background-color: var(--navy);
  color: var(--white);
  width: 100%;
}

.kakao-login {
  width: 100%;
  border: solid 1px var(--kakao);
  padding: 10px 20px;
  font-size: 0.85em;
  cursor: pointer;
}

.register {
  margin-top: 20px;
  font-size: 0.8em;
}

.error-message {
  text-align: left;
  font-size: 0.7em;
  color: var(--navy);
  margin-bottom: 1.7em;
}
</style>
