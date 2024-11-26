<script setup>
import { ref, onMounted } from "vue";
import axios from "@/utils/axios";
import { useRouter } from "vue-router";
import { useLoginStore } from "@/stores/login";

const posts = ref([]);
const isLoading = ref(true);
const errorMessage = ref("");
const router = useRouter();
const loginStore = useLoginStore();
const image_base_url = import.meta.env.VITE_VUE_API_IMAGE_URL;

const fetchBoardList = async () => {
  try {
    const response = await axios.get("/board/list");
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
    <!-- 게시판 헤더 -->
    <div class="board-header">
      <!-- <h1>여행기</h1> -->
      <button v-if="loginStore.getId" class="create-button" @click="router.push({ name: 'boardnew' })">
        게시글 작성하기
      </button>
    </div>

    <!-- 로딩 상태 -->
    <div v-if="isLoading" class="loading">
      데이터를 불러오는 중입니다...
    </div>

    <!-- 에러 메시지 -->
    <div v-if="errorMessage" class="error">
      {{ errorMessage }}
    </div>

    <!-- 게시글 리스트 -->
    <div v-else class="board-gallery">
      <ul>
        <template v-if="posts.length">
          <li v-for="(post, index) in posts" :key="post.id" class="board-item">
            <div class="board-card" @click="router.push({ name: 'boarddetail', params: { id: post.id } })">
              <div class="board-thumbnail">
                <template v-if="post.files[0]?.saveFolder">
                  <img :src="`${image_base_url}/${post.files[0]?.saveFolder}/${post.files[0]?.saveFile}`" alt="게시글 이미지" />
                </template>
                <template v-else>
                  <img src="/src/assets/img/no-image.png" alt="게시글 이미지" />
                </template>
              </div>
              <h3 class="board-title">{{ post.title }}</h3>
              <p class="board-meta">{{ post.nickname }} | 조회수 {{ post.hit }}회<br>{{ post.uploadDate }}</p>
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

/* 게시판 헤더 */
.board-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.board-header h1 {
  font-size: 28px;
  font-weight: bold;
  color: #111827;
}

.create-button {
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: var(--white);
  background-color: var(--navy);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.create-button:hover {
  background-color: var(--navy);
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
  cursor: pointer;
}

.board-thumbnail {
  width: 100%;
  height: 150px;
  background-color: #e5e7eb;
  border-radius: 8px;
  margin-bottom: 15px;
}

.board-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
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
