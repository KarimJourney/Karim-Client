<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "@/utils/axios";

const router = useRouter();

const posts = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get(`/board`);
    console.log(response.data.data);
    posts.value = response.data.data;
  } catch (error) {
    console.error("게시글 목록을 가져오는 데 실패했습니다.", error);
  }
});

const detail = (postId) => {
  router.push({ name: "helpdetail", params: { id: postId } }); // 여행 계획 ID를 URL 파라미터로 전달
};
</script>

<template>
  <div>
    <h2>Q & A 게시판</h2>
    <ul>
      <li v-for="(post, index) in posts" :key="index">
        <a @click="detail(post.id)">
          <p><b>{{ post.title }}</b></p>
          <p>{{ post.member_id}} | 조회수: {{ post.hit }} | {{ post.upload_date }}</p>
        </a>
      </li>
    </ul>
    
    <div class="btn">
      <button @click="router.push({ name: 'helpnew' })">질문하기</button>
    </div>
  </div>
</template>

<style scoped>
.btn {
  width: 100%;
  display: flex;
  justify-content: end;
  gap: 20px;
  margin-bottom: 30px;
}

li {
  width: 100%;
  box-sizing: border-box;
  border-bottom: solid 1px var(--gray);
}

a {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  height: 100%;
}

p {
  width: 100%;
  padding: 2px;
}

</style>
