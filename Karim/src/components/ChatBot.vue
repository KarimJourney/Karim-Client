<template>
  <div class="chatbot-container" :class="{ minimized: isMinimized }">
    <div v-if="!isMinimized" class="chatbot">
      <div class="chatbot-header">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.5em"
          height="1.5em"
          viewBox="0 0 24 24"
          class="back-icon"
          @click="toggleMinimize"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.3"
            d="M15 18l-6-6l6-6"
          />
        </svg>
        <div class="header-content">
          <div class="title-container">
            <span class="header-title">AI 카림이</span>
            <div class="status-indicator"></div>
          </div>
          <span class="header-subtitle">여행 관련해서 궁금한 사항이 있다면 물어보세요!</span>
        </div>
      </div>
      <div class="chatbot-body">
        <div class="messages">
          <div
            v-for="(message, index) in messages"
            :key="index"
            :class="['message', message.sender]"
          >
            <p class="message-text">{{ message.text }}</p>
          </div>
          <!-- 로딩 애니메이션 -->
          <div v-if="isLoading" class="loading">
            <div class="spinner"></div>
          </div>
        </div>
        <div class="input-container">
          <input
            v-model="userInput"
            @keyup.enter="sendMessage"
            placeholder="여행지 추천, 맛집, 숙소 정보를 물어보세요!"
          />
          <button @click="sendMessage">전송</button>
        </div>
      </div>
    </div>
    <div v-else class="chatbot-icon" @click="toggleMinimize">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.5em"
        height="1.5em"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M16 8h4a1 1 0 0 1 1 1v11l-3.333-2.769a1 1 0 0 0-.64-.231H9a1 1 0 0 1-1-1v-3m8-5V5a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v11l3.333-2.77c.18-.148.406-.23.64-.23H8m8-5v4a1 1 0 0 1-1 1H8"
        />
      </svg>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ChatBot",
  data() {
    return {
      isMinimized: true,
      userInput: "",
      messages: [
        {
          sender: "bot",
          text: "안녕하세요! 저는 AI 카림입니다. 여행지 추천, 맛집, 숙소 정보 등을 알려드릴게요. 무엇을 도와드릴까요?",
        },
      ],
      isLoading: false, // 로딩 상태 추가
      latitude: 36.0,
      longitude: 127.0,
    };
  },
  methods: {
    toggleMinimize() {
      this.isMinimized = !this.isMinimized;
    },
    async sendMessage() {
      if (!this.userInput.trim()) return;

      const userMessage = this.userInput;
      this.messages.push({ sender: "user", text: userMessage });
      this.userInput = "";
      this.isLoading = true; // 로딩 시작

      try {
        // 1단계: 여행 관련 여부 판단
        const relevanceCheckPayload = {
          model: "gpt-4o-2024-11-20",
          messages: [
            {
              role: "system",
              content:
                "다음 사용자의 메시지가 국내(대한민국) 여행, 국내(대한민국) 관광, 국내(대한민국) 숙박, 국내(대한민국) 맛집, 국내(대한민국) 여행 팁 등에 관련되어 있는지 판단하세요. 'Yes' 또는 'No'로만 답변하세요.",
            },
            { role: "user", content: userMessage },
          ],
        };

        const relevanceCheckResponse = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          relevanceCheckPayload,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );

        const relevance = relevanceCheckResponse.data.choices[0].message.content.trim();

        // 관련성이 없다고 판단된 경우 처리
        if (relevance.toLowerCase() === "no") {
          this.messages.push({
            sender: "bot",
            text: "죄송합니다. 저는 국내 여행 관련 질문에만 답변할 수 있습니다.",
          });
          this.isLoading = false; // 로딩 종료
          return;
        }

        // 2단계: 여행 관련된 질문만 GPT에 요청
        const responsePayload = {
          model: "gpt-4o-2024-11-20",
          messages: [
            {
              role: "system",
              content:
                "안녕하세요! 당신은 여행 전문 챗봇입니다. " +
                "국내(대한민국) 여행, 국내(대한민국) 관광, 국내(대한민국) 숙박, 국내(대한민국) 맛집, 국내(대한민국) 여행 팁 등에 대한 질문에만 답변하세요. " +
                "질문에 국내(대한민국) 여행과 무관한 요소가 포함되어 있으면, 무관한 부분은 무시하고 국내(대한민국) 여행 관련 정보에만 답변하세요." +
                `현재 사용자 위치는 위도 ${this.latitude}도, 경도 ${this.longitude} 도 입니다. 사용자가 어떤 장소에 대해 질문하면 사용자의 위치에서 최대한 가까운 장소에 대해 답변하세요.`,
              },
            { role: "user", content: userMessage },
          ],
        };

        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          responsePayload,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );

        const botMessage = response.data.choices[0].message.content.trim();
        this.messages.push({ sender: "bot", text: botMessage });
      } catch (error) {
        console.error("Error:", error);
        this.messages.push({
          sender: "bot",
          text: "오류가 발생했습니다. 다시 시도해주세요.",
        });
      } finally {
        this.isLoading = false; // 로딩 종료
      }
    },
  },
  mounted() {
    const self = this;
  navigator.geolocation.getCurrentPosition(function(cur) {
    self.latitude = cur.coords.latitude;
    self.longitude = cur.coords.longitude;
  });
  },
};
</script>

<style scoped>
/* 기존 스타일 그대로 유지 */
.chatbot-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.chatbot {
  width: 350px;
  max-height: 500px;
  background-color: var(--white);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chatbot-header {
  background-color: var(--navy);
  color: var(--white);
  padding: 10px;
  display: flex;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.back-icon {
  cursor: pointer;
}

.header-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 10px;
}

.title-container {
  display: flex;
  align-items: center;
}

.header-title {
  font-size: 16px;
  font-weight: bold;
  text-align: left;
}

.status-indicator {
  width: 5px;
  height: 5px;
  background-color: #00ff00;
  border-radius: 50%;
  margin-left: 8px;
}

.header-subtitle {
  font-size: 12px;
  color: var(--light-gray);
  opacity: 0.7;
  text-align: left;
  margin-top: 5px;
}

.chatbot-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 10px;
  overflow-y: auto;
}

.messages {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: auto;
  margin-bottom: 10px;
}

.message {
  display: inline-block;
  margin: 5px 0;
  padding: 10px 15px;
  border-radius: 10px;
  max-width: 75%;
  word-wrap: break-word;
  white-space: pre-wrap;
}

.message.user {
  align-self: flex-end;
  background-color: #e1f5fe;
  color: #000;
  border-radius: 10px 0px 10px 10px;
  margin-right: 10px;
}

.message.bot {
  align-self: flex-start;
  background-color: #f1f1f1;
  color: #333;
  border-radius: 0px 10px 10px 10px;
}

.input-container {
  display: flex;
  gap: 10px;
  align-items: center;
}

input {
  flex: 1;
  font-size: 14px;
  padding: 13px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  font-size: 14px;
  padding: 13px 15px;
  background-color: var(--navy);
  color: var(--white);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.chatbot-icon {
  width: 60px;
  height: 60px;
  padding: 5px;
  background-color: white;
  color: var(--navy);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  font-size: 28px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.chatbot-icon:hover {
  background-color: var(--navy);
  color: white;
}

.back-icon {
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.back-icon:hover {
  opacity: 1;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid var(--navy);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
