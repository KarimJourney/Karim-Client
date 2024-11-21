<script setup>
import { ref, onMounted } from "vue";
import axios from "@/utils/axios"; // axios 임포트

// QnA 데이터를 관리하는 상태
const qnaList = ref([]);
const isLoading = ref(true);
const errorMessage = ref("");

// 서버에서 QnA 데이터를 가져오는 함수
const fetchQnAList = async () => {
  try {
    const response = await axios.get("/help");
    qnaList.value = response.data; // 서버에서 가져온 데이터
  } catch (error) {
    console.error("QnA 데이터를 가져오는 데 실패했습니다.", error);
    errorMessage.value = "데이터를 가져오는 중 오류가 발생했습니다.";
  } finally {
    isLoading.value = false;
  }
};

// 컴포넌트가 마운트되었을 때 QnA 데이터를 가져옵니다.
onMounted(() => {
  fetchQnAList();
});
</script>

<template>
  <section class="qna-section">
    <div class="qna-header">
      <h1>QnA 목록</h1>
    </div>

    <div v-if="isLoading" class="loading">
      데이터를 불러오는 중입니다...
    </div>

    <div v-if="errorMessage" class="error">
      {{ errorMessage }}
    </div>

    <div v-else class="qna-list">
      <ul>
        <template v-if="qnaList.length">
          <li v-for="(qna, index) in qnaList" :key="index" class="qna-item">
            <div class="qna-content">
              <h3>{{ qna.question }}</h3>
              <p v-if="qna.answer">{{ qna.answer }}</p>
              <p v-else class="no-answer">답변이 아직 없습니다.</p>
            </div>
          </li>
        </template>
        <template v-else>
          <li class="no-qna">등록된 QnA가 없습니다!</li>
        </template>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.qna-section {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}

.qna-header {
  text-align: center;
  margin-bottom: 20px;
}

.qna-header h1 {
  font-size: 24px;
  font-weight: bold;
  color: #111827;
}

.loading,
.error,
.no-qna {
  text-align: center;
  color: #6b7280;
  font-size: 16px;
  margin-top: 20px;
}

.qna-list ul {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 0;
  list-style: none;
}

.qna-item {
  background-color: #f9fafb;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.qna-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.qna-content h3 {
  font-size: 18px;
  font-weight: bold;
  color: #1f2937;
}

.qna-content p {
  font-size: 14px;
  color: #6b7280;
  margin-top: 10px;
}

.no-answer {
  color: #9ca3af;
  font-style: italic;
}
</style>
