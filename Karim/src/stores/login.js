import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useLoginStore = defineStore('login', () => {
  // state
  const isLogin = ref(false);
  const id = ref("");
  const name = ref("");

  // get
  const getLogin = computed(() => isLogin.value);
  const getId = computed(() => id.value);
  const getName = computed(() => name.value);

  // set
  const setLogin = (flag, _id, _name) => {
    isLogin.value = flag;
    if (flag) {
      id.value = _id;
      name.value = _name;
      localStorage.setItem('id', id.value);
      localStorage.setItem('name', name.value);
    } else {
      localStorage.removeItem('id');
      localStorage.removeItem('name');
    }
  };

  const restoreLoginState = () => {
    const storedUserId = localStorage.getItem('id');
    const storedUserName = localStorage.getItem('name');
    
    if (storedUserId && storedUserName) {
      isLogin.value = true;
      id.value = storedUserId;
      name.value = storedUserName;
    }
  };

  // Pinia store가 생성될 때 로그인 상태 복원
  restoreLoginState();

  return { isLogin, id, getLogin, getId, getName, setLogin };
});
