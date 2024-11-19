<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "@/utils/axios";

const route = useRoute();
const router = useRouter();

const postId = route.params.id;
const form = ref({});

onMounted(async () => {
  try {
    const response = await axios.get(`/board/${postId}`, { id: postId });
    console.log(response.data.data);
    form.value = response.data.data;
  } catch (error) {
    console.error("게시글을 가져오는 데 실패했습니다.", error);
  }
});

const update = async () => {
  if (form.value.member_id) {
    try {
      const response = await axios.patch("/board/${postId}", form.value, {
        headers: { "Content-Type": "application/json" }, // Content-Type을 명시
      });
      if (response.data.msg === "ok")
        router.push({ name: "detail", params: { id: postId } });
    } catch (error) {
      console.error("질문을 수정하는 데 실패했습니다.", error);
    }
  }
};
</script>

<template>
  <div>
    <h2>질문 수정</h2>
    <form @submit.prevent="update" class="items">
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
        <button
          type="button"
          @click="router.push({ name: 'detail', params: { id: postId } })"
        >
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
