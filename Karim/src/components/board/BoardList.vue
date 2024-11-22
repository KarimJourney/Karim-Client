<script setup>
import { ref, onMounted } from "vue";
import axios from "@/utils/axios";

const posts = ref([]);
const isLoading = ref(true);
const errorMessage = ref("");

const fetchBoardList = async () => {
  try {
    const response = await axios.get("/board");
    posts.value = response.data;
  } catch (error) {
    console.error("게시판 데이터를 가져오는 데 실패했습니다.", error);
    errorMessage.value = "데이터를 가져오는 중 오류가 발생했습니다.";
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchBoardList();
});
</script>

<template>
  <section>
    <!-- <div class="board-header">
      <h1>커뮤니티</h1>
    </div> -->

    <div v-if="isLoading" class="loading">
      데이터를 불러오는 중입니다...
    </div>

    <div v-if="errorMessage" class="error">
      {{ errorMessage }}
    </div>

    <div v-else class="board-list">
      <ul>
        <template v-if="posts.length">
          <li v-for="(post, index) in posts" :key="index" class="board-item">
            <div class="board-content">
              <h3>{{ post.title }}</h3>
              <p class="author">작성자: {{ post.nickname }}</p>
              <p class="date">조회수: {{ post.hit }}</p>
              <p class="date">작성일: {{ post.upload_date }}</p>
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
  max-width: 800px;
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
  font-size: 24px;
  font-weight: bold;
  color: #111827;
}

.loading,
.error,
.no-board {
  text-align: center;
  color: #6b7280;
  font-size: 16px;
  margin-top: 20px;
}

.board-list ul {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 0;
  list-style: none;
}

.board-item {
  background-color: #f9fafb;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease, color 0.3s ease;
}

.board-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  background-color: var(--navy);
  color: white;
}

.board-content h3 {
  font-size: 18px;
  font-weight: bold;
  color: #1f2937;
  transition: color 0.3s ease;
}

.board-content p {
  font-size: 14px;
  color: #6b7280;
  margin-top: 10px;
  transition: color 0.3s ease;
}

.board-item:hover .board-content h3,
.board-item:hover .board-content p {
  color: white;
}

.author {
  font-style: italic;
  color: #9ca3af;
}

.date {
  font-size: 12px;
  color: #9ca3af;
  margin-top: 5px;
}

.no-board {
  color: #9ca3af;
  font-style: italic;
}
</style>