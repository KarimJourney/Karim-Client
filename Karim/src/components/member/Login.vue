<script setup>
import { ref } from "vue";

const kakaoLogin = async () => {
  const Auth_url = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${import.meta.env.VITE_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}`;
  window.location.href = Auth_url;
};
</script>

<template>
  <div id="modal-overlay">
    <div id="modal">
      <button id="close" @click="$emit('close')">X</button>

      <div id="modal-content">
        <h2>KARIM</h2>

        <div class="social-login">
          <button class="kakao-login" @click="kakaoLogin">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <path fill="currentColor"
                d="M12 3c5.8 0 10.501 3.664 10.501 8.185c0 4.52-4.701 8.184-10.5 8.184a14 14 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866c0-4.52 4.7-8.185 10.5-8.185m5.908 8.06l1.47-1.424a.472.472 0 0 0-.656-.678l-1.928 1.866V9.282a.472.472 0 0 0-.944 0v2.557a.5.5 0 0 0 0 .222V13.5a.472.472 0 0 0 .944 0v-1.363l.427-.413l1.428 2.033a.472.472 0 1 0 .773-.543zm-2.958 1.924h-1.46V9.297a.472.472 0 0 0-.943 0v4.159c0 .26.21.472.471.472h1.932a.472.472 0 1 0 0-.944m-5.857-1.091l.696-1.708l.638 1.707zm2.523.487l.002-.016a.47.47 0 0 0-.127-.32l-1.046-2.8a.69.69 0 0 0-.627-.474a.7.7 0 0 0-.653.447l-1.662 4.075a.472.472 0 0 0 .874.357l.332-.813h2.07l.298.8a.472.472 0 1 0 .884-.33zM8.294 9.302a.47.47 0 0 0-.471-.472H4.578a.472.472 0 1 0 0 .944h1.16v3.736a.472.472 0 0 0 .944 0V9.774h1.14a.47.47 0 0 0 .472-.472" />
            </svg>
            &nbsp;카카오로 시작하기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#modal {
  display: flex;
  align-items: center;
}

#modal-content {
  width: 280px;
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

.social-login {
  margin-top: 20px;
}

.kakao-login {
  width: 100%;
  background: var(--kakao);
  padding: 10px 20px;
  font-size: 0.85em;
  cursor: pointer;
}
</style>
