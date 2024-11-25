<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useLoginStore } from "@/stores/login";
import axios from "@/utils/axios";

const loginStore = useLoginStore();
const route = useRoute();
const router = useRouter();
const postId = route.params.id;
const post = ref({});
const comments = ref([]);
const newComment = ref("");
const isEditingComment = ref(null);
const editCommentContent = ref("");
const image_base_url = import.meta.env.VITE_VUE_API_IMAGE_URL;

onMounted(async () => {
  try {
    const response = await axios.get(`/board/${postId}`);
    post.value = response.data;

    const response2 = await axios.get(`/comment/list/${postId}`);
    comments.value = response2.data;
  } catch (error) {
    console.error("게시글을 가져오는 데 실패했습니다.", error);
  }
});

const goUpdate = () => {
  router.push({ name: "boardupdate", params: { id: postId } });
};

const goDelete = async () => {
  const c = confirm("삭제하시겠습니까?");
  if (c) {
    try {
      await axios.delete(`/board/delete/${postId}`);
      router.push({ name: "board" });
    } catch (error) {
      console.error("게시글 삭제 실패했습니다.", error);
    }
  }
};

const submitComment = async () => {
  if (!newComment.value.trim()) return;
  try {
    const response = await axios.post(`/comment/write`, {
      boardId: postId,
      userId: loginStore.getId,
      content: newComment.value,
    });
    router.go(0);
  } catch (error) {
    console.error("댓글 작성 실패", error);
  }
};

const startEditComment = (comment) => {
  isEditingComment.value = comment.id;
  editCommentContent.value = comment.content;
};

const saveEditComment = async (commentId) => {
  try {
    await axios.patch(`/comment/modify`, {
      id: commentId,
      userId: loginStore.getId,
      content: editCommentContent.value,
    });
    const comment = comments.value.find((c) => c.id === commentId);
    comment.content = editCommentContent.value;
    isEditingComment.value = null;
    editCommentContent.value = "";
  } catch (error) {
    console.error("댓글 수정 실패", error);
  }
};

const deleteComment = async (commentId) => {
  const c = confirm("댓글을 삭제하시겠습니까?");
  if (c) {
    try {
      await axios.delete(`/comment/delete/${commentId}`);
      comments.value = comments.value.filter((c) => c.id !== commentId);
    } catch (error) {
      console.error("댓글 삭제 실패", error);
    }
  }
};
</script>

<template>
  <div class="container">
    <!-- 게시글 영역 -->
    <div class="post-section">
      <!-- 이미지 캐러셀 -->
      <div v-if="post.files && post.files.length" class="carousel">
        <div class="carousel-wrapper">
          <button v-if="post.files.length > 1" class="carousel-button left" @click="post.files.unshift(post.files.pop())">
            &#x276E;
          </button>
          <img
            :src="`${image_base_url}/${post.files[0]?.saveFolder}/${post.files[0]?.saveFile}`"
            alt="게시글 이미지"
            class="carousel-image"
          />
          <button v-if="post.files.length > 1" class="carousel-button right" @click="post.files.push(post.files.shift())">
            &#x276F;
          </button>
        </div>
      </div>
      <h2 class="post-title">{{ post.title }}</h2>
      <p class="post-meta">
        작성자: {{ post.nickname }} | 조회수: {{ post.hit }} | {{ post.uploadDate }}
      </p>
      <p class="post-content">{{ post.content }}</p> <!-- 수정 부분 -->
      <div class="post-actions">
        <button @click="router.push({ name: 'boardlist' })">뒤로</button>
        <template v-if="post.userId == loginStore.getId">
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
          <div class="comment-header">
            <p class="comment-author" @click="router.push({name:'profile', params: {id: comment.userId}})">
              {{ comment.nickname }}
            </p>
            <div class="comment-actions" v-if="comment.userId == loginStore.getId">
              <template v-if="isEditingComment === comment.id">
                <button @click="saveEditComment(comment.id)">저장</button>
                <button @click="isEditingComment = null">취소</button>
              </template>
              <template v-else>
                <button @click="startEditComment(comment)">수정</button>
                <button @click="deleteComment(comment.id)">삭제</button>
              </template>
            </div>
          </div>
          <template v-if="isEditingComment === comment.id">
            <textarea v-model="editCommentContent" class="comment-edit-input"></textarea>
          </template>
          <template v-else>
            <p class="comment-content">{{ comment.content }}</p> <!-- 수정 부분 -->
          </template>
        </li>
        <li v-else class="no-comments">아직 댓글이 없습니다!</li>
      </ul>
      <div class="comment-form">
        <textarea v-model="newComment" class="comment-input" placeholder="댓글을 작성하세요"></textarea>
        <button @click="submitComment">댓글 작성</button>
      </div>
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

.post-actions {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  margin-top: 20px;
}

.carousel {
  position: relative;
  margin-bottom: 20px;
}

.carousel-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  font-size: 24px;
  cursor: pointer;
  z-index: 1;
}

.carousel-button.left {
  left: 10px;
}

.carousel-button.right {
  right: 10px;
}

.carousel-image {
  width: 40vw;
  height: 40vh;
  border-radius: 8px;
  object-fit: cover;
}

.post-title {
  color: var(--dark-grey);
}

.post-content {
  color: var(--black);
  white-space: pre-wrap; /* 줄바꿈 및 공백을 유지하면서, 너비에 맞춰 자동 줄바꿈 */
  word-wrap: break-word;
}

.comments-section h3 {
  margin-bottom: 20px;
}

.comments-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.comment-item {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: #f9fafb;
  position: relative;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.comment-author {
  color: var(--black);
}

.comment-actions button {
  margin-left: 10px;
  padding: 4px 8px;
  color: var(--light-grey);
  background-color: #f9fafb;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}

.comment-content {
  margin-top: 10px;
  font-size: 14px;
  white-space: pre-wrap; /* 댓글 내용도 줄바꿈을 유지하면서 자동으로 줄바꿈 처리 */
  word-wrap: break-word;
}

.comment-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

.comment-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
}

.comment-edit-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
}

.comment-item button {
  background-color: #f9fafb;
}
</style>
