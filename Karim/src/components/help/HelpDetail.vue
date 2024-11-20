<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useLoginStore } from "@/stores/login";
import axios from "@/utils/axios";

const loginStore = useLoginStore();
const route = useRoute();
const router = useRouter();
const postId = route.params.id;
const post = ref({});

onMounted(async () => {
  try {
    const response = await axios.get(`/board/${postId}`, { id: postId });
    console.log(response.data.data);
    post.value = response.data.data;
    post.value.hit += 1;
    try {
      await axios.patch(`/board/hit/${postId}`, {
        id: postId,
        hit: post.value.hit,
      });
    } catch (error) {
      console.error("조회수 업데이트에 실패했습니다.", error);
    }
  } catch (error) {
    console.error("게시글을 가져오는 데 실패했습니다.", error);
  }
});

const goUpdate = () => {
  router.push({ name: "helpupdate", params: { id: postId } });
};

const goDelete = async () => {
  const c = confirm("삭제하시겠습니까?");
  if (c) {
    try {
      const response = await axios.delete(`/board/${postId}`, { id: postId });
      if (response.data.msg === "ok") router.push({ name: "help" });
    } catch (error) {
      console.error("게시글 삭제 실패했습니다.", error);
    }
  }
};
</script>

<template>
  <div class="items">
    <div class="item">
      <h2>{{ post.title }}</h2>
    <p>{{ post.member_id }} | 조회수: {{ post.hit }} | {{ post.upload_date }}</p>
    </div>
    <div class="item">
      <p>{{ post.content }}</p>
    </div>
    <div class="btn">
      <button type="button" @click="router.push({ name: 'board' })">뒤로</button>
      <template v-if="post.member_id === loginStore.getId">
        <div>
          <button @click="goUpdate">수정</button>
          &nbsp;
          <button @click="goDelete">삭제</button>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
h2 {
  margin: 0;
}

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
  justify-content: space-between;
}

</style>
