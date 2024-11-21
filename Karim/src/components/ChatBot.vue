<template>
  <div class="chatbot-container" :class="{ minimized: isMinimized }">
    <div v-if="!isMinimized" class="chatbot">
      <div class="chatbot-header">
        <span>여행 챗봇</span>
        <button class="close-btn" @click="toggleMinimize">-</button>
      </div>
      <div class="chatbot-body">
        <div class="messages">
          <div
            v-for="(message, index) in messages"
            :key="index"
            :class="message.sender"
          >
            {{ message.text }}
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
        width="2em"
        height="2em"
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
          text: "안녕하세요! 저는 여행 챗봇입니다. 여행지 추천, 맛집, 숙소 정보 등을 알려드릴게요. 무엇을 도와드릴까요?",
        },
      ],
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

      try {
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-4",
            messages: [
              {
                role: "system",
                content:
                  "안녕하세요! 저는 여행 정보를 전문적으로 제공하는 챗봇입니다. 추천 여행지, 맛집, 숙소, 여행 팁 등에 대한 정보를 사용자 맞춤형으로 제공합니다.",
              },
              { role: "user", content: userMessage },
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );

        const botMessage = response.data.choices[0].message.content;
        this.messages.push({ sender: "bot", text: botMessage });
      } catch (error) {
        console.error("Error:", error);
        this.messages.push({
          sender: "bot",
          text: "오류가 발생했습니다. 다시 시도해주세요.",
        });
      }
    },
  },
};
</script>

<style scoped>
.chatbot-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.chatbot {
  width: 350px;
  height: 450px;
  background-color: var(--white);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
}

.chatbot-header {
  background-color: var(--navy);
  color: var(--white);
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-weight: bold;
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
  overflow-y: auto;
  margin-bottom: 10px;
}

.user {
  text-align: right;
  margin: 5px;
  padding: 5px;
  background-color: #e1f5fe;
  border-radius: 5px;
}

.bot {
  text-align: left;
  margin: 5px;
  padding: 5px;
  background-color: #f1f1f1;
  border-radius: 5px;
}

.input-container {
  display: flex;
  gap: 5px;
}

input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px;
  background-color: var(--navy);
  color: var(--white);
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.chatbot-icon {
  width: 45px;
  height: 45px;
  padding: 10px;
  background-color: white;
  color: var(--navy);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  font-size: 24px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.chatbot-icon:hover {
  background-color: var(--navy);
  color: white;
}
</style>
