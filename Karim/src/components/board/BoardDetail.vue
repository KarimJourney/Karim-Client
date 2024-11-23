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
const comments = ref([]); // 댓글 리스트 (아직 데이터 없음)

onMounted(async () => {
  // try {
  //   const response = await axios.get(`/board/${postId}`, { id: postId });
  //   post.value = response.data.data;
  //   post.value.hit += 1;
  //   try {
  //     await axios.patch(`/board/hit/${postId}`, {
  //       id: postId,
  //       hit: post.value.hit,
  //     });
  //   } catch (error) {
  //     console.error("조회수 업데이트에 실패했습니다.", error);
  //   }
  // } catch (error) {
  //   console.error("게시글을 가져오는 데 실패했습니다.", error);
  // }
  post.value = {
    id: 1,
    userId: 11,
    nickname: "닉네임1",
    title: "첫 번째 게시물",
    content: "이것은 게시글의 본문입니다.",
    hit: 34,
    upload_date: "2024-11-22",
    img: "https://via.placeholder.com/600x300",
  };
  comments.value = [{
    id: 1,
    userId: 22,
    nickname: "닉네임2",
    content: "예뻐용"
  },
{
  id:2,
  userId:22,
  nickname:"닉넴",
  content:"ㄱㅊㄱㅊ"
}]
});

const goUpdate = () => {
  router.push({ name: "update", params: { id: postId } });
};

const goDelete = async () => {
  const c = confirm("삭제하시겠습니까?");
  if (c) {
    try {
      const response = await axios.delete(`/board/${postId}`, { id: postId });
      if (response.data.msg === "ok") router.push({ name: "board" });
    } catch (error) {
      console.error("게시글 삭제 실패했습니다.", error);
    }
  }
};
</script>

<template>
  <div class="container">
    <!-- 게시글 영역 -->
    <div class="post-section">
      <img v-if="post.img" :src="post.img" alt="게시글 이미지" class="post-image" />
      <h2 class="post-title">{{ post.title }}</h2>
      <p class="post-meta">
        작성자: {{ post.nickname }} | 조회수: {{ post.hit }} | {{ post.upload_date }}
      </p>
      <p class="post-content">{{ post.content }}</p>
      <div class="post-actions">
        <button @click="router.push({ name: 'boardlist' })">뒤로</button>
        <template v-if="post.userId === loginStore.getId">
          <button @click="goUpdate">수정</button>
          <button @click="goDelete">삭제</button>
        </template>
      </div>
    </div>

    <!-- 댓글 영역 -->
    <div class="comments-section">
      <h3>댓글</h3>
      <ul class="comments-list">
        <li v-if="comments.length" v-for="(comment, index) in comments" :key="index" class="comment-item">
          <p class="comment-author" @click="router.push({name:'profile', param: {id:'22'}})">{{ comment.nickname }}</p>
          <p class="comment-content">{{ comment.content }}</p>
        </li>
        <li v-else class="no-comments">아직 댓글이 없습니다!</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.post-section,
.comments-section {
  flex: 1;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
}

.post-section {
  max-width: 60%;
}

.comments-section {
  max-width: 40%;
}

.post-image {
  width: 100%;
  height: auto;
  margin-bottom: 20px;
  border-radius: 8px;
}

.post-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.post-meta {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 20px;
}

.post-content {
  font-size: 16px;
  color: #374151;
  margin-bottom: 20px;
}

.post-actions {
  display: flex;
  gap: 10px;
}

.comments-section h3 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}

.comments-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.comment-item {
  margin-bottom: 15px;
  padding: 10px;
  background-color: #f3f4f6;
  border-radius: 8px;
}

.comment-author {
  font-weight: bold;
  font-size: 14px;
}

.comment-content {
  font-size: 14px;
  color: #374151;
  margin-top: 5px;
}

.no-comments {
  color: #9ca3af;
  font-style: italic;
  text-align: center;
}
</style>
