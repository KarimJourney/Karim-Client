import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useLoginStore = defineStore("login", () => {
  // state
  const isLogin = ref(false);
  const id = ref(""); // 사용자 ID
  const name = ref(""); // 사용자 이름/닉네임
  const profileImageUrl = ref(""); // 프로필 이미지 URL
  const accessToken = ref("");
  const refreshToken = ref("");

  // getters
  const getLogin = computed(() => isLogin.value);
  const getId = computed(() => id.value);
  const getName = computed(() => name.value);
  const getProfileImageUrl = computed(() => profileImageUrl.value);
  const getAccessToken = computed(() => accessToken.value);
  const getRefreshToken = computed(() => refreshToken.value);

  // actions
  const setLogin = (flag, _id, _name, _profileImageUrl, _accessToken, _refreshToken) => {
    isLogin.value = flag;
    if (flag) {
      id.value = _id;
      name.value = _name;
      profileImageUrl.value = _profileImageUrl;
      accessToken.value = _accessToken;
      refreshToken.value = _refreshToken;
      localStorage.setItem("id", id.value);
      localStorage.setItem("name", name.value);
      localStorage.setItem("profileImageUrl", profileImageUrl.value);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    } else {
      id.value = "";
      name.value = "";
      profileImageUrl.value = "";
      localStorage.removeItem("id");
      localStorage.removeItem("name");
      localStorage.removeItem("profileImageUrl");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  };

  const restoreLoginState = () => {
    const storedUserId = localStorage.getItem("id");
    const storedUserName = localStorage.getItem("name");
    const storedProfileImageUrl = localStorage.getItem("profileImageUrl");

    if (storedUserId && storedUserName && storedProfileImageUrl) {
      isLogin.value = true;
      id.value = storedUserId;
      name.value = storedUserName;
      profileImageUrl.value = storedProfileImageUrl;
    }
  };

  // Pinia store가 생성될 때 로그인 상태 복원
  restoreLoginState();

  return {
    isLogin,
    id,
    name,
    profileImageUrl,
    getLogin,
    getId,
    getName,
    getProfileImageUrl,
    setLogin,
  };
});
