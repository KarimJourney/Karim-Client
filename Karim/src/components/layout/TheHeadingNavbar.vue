<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Login from "@/components/member/Login.vue"; // 로그인 모달 컴포넌트
import Join from "@/components/member/Join.vue"; // 회원가입 모달 컴포넌트
import { useLoginStore } from "@/stores/login";
import { defineComponent } from 'vue';

const loginStore = useLoginStore();
const router = useRouter();
defineComponent({
  name: 'CiChatConversation',
  name: 'MingcuteUser4Fill',
});

// 모달 상태 관리
const showLoginModal = ref(false);
const showJoinModal = ref(false);

// 로그인 및 회원가입 모달 열기
const openLoginModal = () => (showLoginModal.value = true);
const openJoinModal = () => (showJoinModal.value = true);

const logout = () => {
  loginStore.setLogin(false);
  showMenu.value = false;
  router.push({ name: "home" });
};

const showMenu = ref(false);
const toggleUserMenu = () => {
  showMenu.value = !showMenu.value;
};
</script>

<template>
  <header>
    <nav>
      <div class="nav_left">
        <h1 id="head" @click="router.push({ name: 'home' })">KARIM</h1>
        <ul>
          <li @click="router.push({ name: 'map' })">여행</li>
          <li @click="router.push({ name: 'board' })">커뮤니티</li>
          <li @click="router.push({ name: 'help' })">고객센터</li>
        </ul>
      </div>
      <div class="nav_right">
        <template v-if="loginStore.getLogin">
          <ul>
            <li><span style="color: var(--dark-grey);">{{ loginStore.getName }}</span>&nbsp;님, 반갑습니다.</li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8h4a1 1 0 0 1 1 1v11l-3.333-2.769a1 1 0 0 0-.64-.231H9a1 1 0 0 1-1-1v-3m8-5V5a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v11l3.333-2.77c.18-.148.406-.23.64-.23H8m8-5v4a1 1 0 0 1-1 1H8" />
              </svg>
            </li>
            <li @click="toggleUserMenu"><svg xmlns="http://www.w3.org/2000/svg" width="2em" height="1em" viewBox="0 0 24 24">
		<g fill="none" fill-rule="evenodd">
			<path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
			<path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2M8.5 9.5a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0m9.758 7.484A7.99 7.99 0 0 1 12 20a7.99 7.99 0 0 1-6.258-3.016C7.363 15.821 9.575 15 12 15s4.637.821 6.258 1.984" />
		</g>
	</svg></li>
            <template v-if="showMenu">
              <div class="dropdown">
              <li @click="logout">로그아웃</li>
            <li @click="router.push({ name: 'mypage' }); showMenu = false">내 정보</li>
            <li @click="router.push({ name: 'hotplace' }); showMenu = false">즐겨찾기</li>
            </div>
            </template>
          </ul>
        </template>
        <template v-else>
          <ul>
            <li @click="openLoginModal">로그인</li>
              <!-- <li @click="openJoinModal">회원가입</li> -->
            <li><svg xmlns="http://www.w3.org/2000/svg" width="2em" height="1em" viewBox="0 0 24 24">
		<g fill="none" fill-rule="evenodd">
			<path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
			<path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2M8.5 9.5a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0m9.758 7.484A7.99 7.99 0 0 1 12 20a7.99 7.99 0 0 1-6.258-3.016C7.363 15.821 9.575 15 12 15s4.637.821 6.258 1.984" />
		</g>
	</svg></li>
          </ul>
        </template>
      </div>
    </nav>

    <!-- 로그인 모달 -->
    <Login v-show="showLoginModal" @close="showLoginModal = false" />

    <!-- 회원가입 모달 -->
    <Join v-show="showJoinModal" @close="showJoinModal = false" />
  </header>
</template>

<style scoped>
#head {
  color: var(--navy);
  cursor: pointer;
  font-weight: 500;
  font-family: "dongle", sans-serif;
  font-size: 60px;
  transform: translateY(5px);
  padding-right: 30px;
  height: 90px;
}

nav {
  font-size: 15px;
  height: 85px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.nav_left {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 2%;
  font-weight: 700;
}

.nav_right {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 55vw;
  padding: 0 2%;
}

ul {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
}

.nav_left li {
  padding: 17px;
}
.nav_right ul {
  justify-content: end;
}

.nav_right li {
  padding-left: 20px;
}

li {
  flex: none;
  width: max-content;
  flex-basis: auto;
  cursor: pointer;
  display: flex;
  align-items: center; /* SVG와 텍스트 중앙 정렬 */
}

li:hover {
  color: var(--light-gray);
}

li svg {
  width: 2.2em; /* 아이콘 크기 설정 */
  height: 2.2em; /* 아이콘 크기 설정 */
  transform: translateY(3px);
  color: var(--navy);
}

.nav_element {
  text-decoration: none;
  color: var(--black);
}

.dropdown {
  position: absolute;
  top: 80px;
  right: 0.5%;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  border: solid 1px var(--grey);
  background-color: var(--white);
}

.dropdown li {
  padding: 13px;
}

@media screen and (max-width: 600px) {
  #head, #container {
    padding: 1% 2%;
  }
}
</style>
