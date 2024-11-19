<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useLoginStore } from "@/stores/login";
import axios from "@/utils/axios";

const loginStore = useLoginStore();
const router = useRouter();

const form = ref({
  title: "",
  content: "",
  member_id: loginStore.getId,
});

const insert = async () => {
  if (form.value.member_id) {
    try {
      const response = await axios.post("/board/new", form.value, {
        headers: { "Content-Type": "application/json" }, // Content-Type을 명시
      });
      if (response.data.msg === "ok") router.push({ name: "board" });
    } catch (error) {
      console.error("질문을 추가하는 데 실패했습니다.", error);
    }
  }
};
</script>

<template>
  <div>
    <h2>질문 쓰기</h2>
    <form @submit.prevent="insert" class="items">
      <div class="item">
        <input
          name="title"
          type="text"
          v-model="form.title"
          required
          placeholder="제목을 입력하세요"
        />
      </div>

      <div class="item">
        <textarea
          name="content"
          rows="15"
          cols="30"
          v-model="form.content"
          placeholder="내용을 입력하세요"
          required
        >
        </textarea>
      </div>

      <div class="btn">
        <button type="submit">등록</button>
        <button type="button" @click="router.push({ name: 'board' })">
          뒤로
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.items {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.item {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.btn {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 30px;
}
</style>
