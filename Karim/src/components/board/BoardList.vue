<script setup>
import { ref, onMounted } from "vue";
import axios from "@/utils/axios";
import { useRoute, useRouter } from "vue-router";

const posts = ref([]);
const isLoading = ref(true);
const errorMessage = ref("");
const router = useRouter();

const fetchBoardList = async () => {
  // try {
  //   const response = await axios.get("/board");
  //   posts.value = response.data;
  // } catch (error) {
  //   console.error("게시판 데이터를 가져오는 데 실패했습니다.", error);
  //   errorMessage.value = "데이터를 가져오는 중 오류가 발생했습니다.";
  // } finally {
  //   isLoading.value = false;
  // }
  posts.value = [
    { id: 1, userId: 11, nickname: "닉네임1", title: "첫 번째 게시물", hit: 34, upload_date: "2024-11-22" },
    { id: 2, userId: 12, nickname: "닉네임2", title: "두 번째 게시물", hit: 12, upload_date: "2024-11-21" },
    { id: 3, userId: 13, nickname: "닉네임3", title: "세 번째 게시물", hit: 47, upload_date: "2024-11-20" },
    { id: 4, userId: 14, nickname: "닉네임4", title: "네 번째 게시물", hit: 21, upload_date: "2024-11-19" },
    { id: 5, userId: 15, nickname: "닉네임5", title: "다섯 번째 게시물", hit: 18, upload_date: "2024-11-18" },
    { id: 6, userId: 16, nickname: "닉네임6", title: "여섯 번째 게시물", hit: 9, upload_date: "2024-11-17" },
  ];
  isLoading.value = false;
};

onMounted(() => {
  fetchBoardList();
});
</script>

<template>
  <section>
    <!-- <div class="board-header">
      <h1>여행기</h1>
    </div> -->

    <div v-if="isLoading" class="loading">
      데이터를 불러오는 중입니다...
    </div>

    <div v-if="errorMessage" class="error">
      {{ errorMessage }}
    </div>

    <div v-else class="board-gallery">
      <ul>
        <template v-if="posts.length">
          <li v-for="(post, index) in posts" :key="post.id" class="board-item">
            <div class="board-card" @click="router.push({name:'boarddetail', params: {id: post.id}})">
              <div class="board-thumbnail"><img :src="post.img"></div>
              <h3 class="board-title">{{ post.title }}</h3>
              <p class="board-meta">{{ post.nickname }} | 조회수 {{ post.hit }}회 | {{ post.upload_date }}</p>
            </div>
          </li>
        </template>
        <template v-else>
          <li class="no-board">등록된 게시물이 없습니다!</li>
        </template>
      </ul>
    </div>
  </section>
</template>

<style scoped>
section {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}

.board-header {
  text-align: center;
  margin-bottom: 20px;
}

.board-header h1 {
  font-size: 28px;
  font-weight: bold;
  color: #111827;
}

/* 로딩 및 에러 */
.loading,
.error,
.no-board {
  text-align: center;
  color: #6b7280;
  font-size: 16px;
  margin-top: 20px;
}

/* 갤러리 스타일 */
.board-gallery ul {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 0;
  list-style: none;
}

.board-item {
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.board-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.board-card {
  padding: 15px;
  text-align: center;
}

.board-thumbnail {
  width: 100%;
  height: 150px;
  background-color: #e5e7eb;
  border-radius: 8px;
  margin-bottom: 15px;
}

.board-title {
  font-size: 18px;
  font-weight: bold;
  color: var(--navy);
  margin: 10px 0;
}

.board-meta {
  font-size: 14px;
  color: var(--grey);
}

.no-board {
  color: var(--light-grey);
  font-style: italic;
  text-align: center;
}
</style>
