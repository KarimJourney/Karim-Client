<script setup>
import { ref } from "vue";
import axios from "@/utils/axios";
import { useRouter } from "vue-router";
import { useLoginStore } from "@/stores/login";

const title = ref("");
const content = ref("");
const uploadedFiles = ref([]);
const errorMessage = ref("");
const router = useRouter();
const loginStore = useLoginStore();

const handleFileChange = (event) => {
  const files = Array.from(event.target.files);
  uploadedFiles.value = files.map((file) => ({
    file,
    url: URL.createObjectURL(file),
  }));
};

const removeFile = (index) => {
  uploadedFiles.value.splice(index, 1); // 해당 파일 삭제
};

const submitPost = async () => {
  if (!title.value.trim() || !content.value.trim()) {
    errorMessage.value = "제목과 내용을 모두 입력해주세요.";
    return;
  }

  const formData = new FormData();

  // board 객체를 JSON 문자열로 변환 후 추가
  const boardData = {
    userId: loginStore.getId,
    title: title.value,
    content: content.value,
  };
  formData.append("board", JSON.stringify(boardData));

  // 파일 추가
  uploadedFiles.value.forEach(({ file }) => {
    formData.append("files", file); // Key 이름은 서버에서 사용하는 이름과 일치해야 함
  });

  try {
    await axios.post("/board/write", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    router.push({ name: "boardlist" }); // 게시글 목록 페이지로 이동
  } catch (error) {
    console.error("게시글 작성 실패", error);
    errorMessage.value = "게시글 작성 중 오류가 발생했습니다.";
  }
};
</script>


<template>
  <section>
    <!-- 헤더 -->
    <div class="form-header">
      <h1>게시글 작성</h1>
    </div>

    <!-- 폼 -->
    <div class="form-container">
      <!-- 제목 -->
      <label for="title" class="form-label">제목</label>
      <input
        id="title"
        type="text"
        v-model="title"
        class="form-input"
        placeholder="제목을 입력하세요"
      />

      <!-- 내용 -->
      <label for="content" class="form-label">내용</label>
      <textarea
        id="content"
        v-model="content"
        class="form-textarea"
        placeholder="내용을 입력하세요"
      ></textarea>

      <!-- 파일 업로드 -->
      <label for="images" class="form-label">이미지 업로드</label>
      <input
        id="images"
        type="file"
        multiple
        accept="image/*"
        @change="handleFileChange"
        class="form-input-file"
      />

      <!-- 이미지 미리보기 -->
      <div v-if="uploadedFiles.length" class="image-preview-container">
        <div
          v-for="(file, index) in uploadedFiles"
          :key="index"
          class="image-preview"
        >
          <img :src="file.url" alt="업로드 이미지 미리보기" />
          <button class="remove-button" @click="removeFile(index)">×</button>
        </div>
      </div>

      <!-- 에러 메시지 -->
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

      <!-- 버튼 -->
      <div class="form-actions">
        <button class="cancel-button" @click="router.push({ name: 'boardlist' })">
          취소
        </button>
        <button class="submit-button" @click="submitPost">작성하기</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}

/* 헤더 스타일 */
.form-header h1 {
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  color: #111827;
}

/* 폼 컨테이너 */
.form-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* 폼 요소 스타일 */
.form-label {
  font-size: 16px;
  font-weight: bold;
  color: #374151;
}

.form-input {
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  color: #374151;
  background-color: #f9fafb;
  transition: border-color 0.3s ease;
}

.form-textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  color: #374151;
  background-color: #f9fafb;
  transition: border-color 0.3s ease;
}

.form-input:focus,
.form-textarea:focus {
  border-color: var(--navy);
  outline: none;
}

.form-textarea {
  resize: none;
  height: 150px;
}

.form-input-file {
  border: none;
  padding: 5px;
}

/* 이미지 미리보기 */
.image-preview-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.image-preview {
  position: relative;
  width: 100px;
  height: 100px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  overflow: hidden;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-button {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-button:hover {
  background-color: rgba(255, 0, 0, 0.8);
}

/* 에러 메시지 */
.error {
  font-size: 14px;
  color: #ef4444;
  text-align: center;
}

/* 버튼 스타일 */
.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.cancel-button,
.submit-button {
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cancel-button {
  background-color: #d1d5db;
  color: #374151;
}

.cancel-button:hover {
  background-color: #9ca3af;
}

.submit-button {
  background-color: var(--navy);
  color: white;
}

.submit-button:hover {
  background-color: var(--navy);
}
</style>
