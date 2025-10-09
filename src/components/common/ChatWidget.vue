<template>
  <div class="chat-widget">
    <!-- Chat Toggle Button -->
    <button
      v-if="!isOpen"
      class="chat-toggle-btn"
      @click="toggleChat"
      aria-label="Open chat"
    >
      <i class="fas fa-comments"></i>
      <span class="chat-badge" v-if="unreadCount > 0">{{ unreadCount }}</span>
    </button>

    <!-- Chat Window -->
    <div v-if="isOpen" class="chat-window">
      <!-- Chat Header -->
      <div class="chat-header">
        <div class="chat-title">
          <i class="fas fa-comments me-2"></i>
          Chat với chúng tôi
        </div>
        <button class="chat-close-btn" @click="closeChat" aria-label="Close chat">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <!-- Chat Messages -->
      <div class="chat-messages" ref="messagesContainer">
        <div
          v-for="message in messages"
          :key="message.id"
          class="message"
          :class="{ 'message-user': message.isUser, 'message-bot': !message.isUser }"
        >
          <div class="message-content">
            <div class="message-text">{{ message.text }}</div>
            <div class="message-time">{{ formatTime(message.timestamp) }}</div>
          </div>
        </div>
        
        <!-- Typing indicator -->
        <div v-if="isTyping" class="message message-bot">
          <div class="message-content">
            <div class="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>

      <!-- Chat Input -->
      <div class="chat-input">
        <form @submit.prevent="sendMessage">
          <div class="input-group">
            <input
              v-model="newMessage"
              type="text"
              placeholder="Nhập tin nhắn..."
              class="form-control"
              :disabled="isTyping"
            />
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="!newMessage.trim() || isTyping"
            >
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'

interface ChatMessage {
  id: number
  text: string
  isUser: boolean
  timestamp: Date
}

const isOpen = ref(false)
const newMessage = ref('')
const messages = ref<ChatMessage[]>([])
const isTyping = ref(false)
const unreadCount = ref(0)
const messagesContainer = ref<HTMLElement>()

let messageId = 0

// Initial bot message
const initialMessage: ChatMessage = {
  id: messageId++,
  text: 'Xin chào! Chúng tôi có thể giúp gì cho bạn?',
  isUser: false,
  timestamp: new Date()
}

messages.value.push(initialMessage)

const toggleChat = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    unreadCount.value = 0
    nextTick(() => {
      scrollToBottom()
    })
  }
}

const closeChat = () => {
  isOpen.value = false
}

const sendMessage = async () => {
  if (!newMessage.value.trim() || isTyping.value) return

  const userMessage: ChatMessage = {
    id: messageId++,
    text: newMessage.value,
    isUser: true,
    timestamp: new Date()
  }

  messages.value.push(userMessage)
  const messageText = newMessage.value
  newMessage.value = ''

  await nextTick()
  scrollToBottom()

  // Simulate bot response
  isTyping.value = true
  await simulateTyping()

  const botResponse = getBotResponse(messageText)
  const botMessage: ChatMessage = {
    id: messageId++,
    text: botResponse,
    isUser: false,
    timestamp: new Date()
  }

  messages.value.push(botMessage)
  isTyping.value = false

  await nextTick()
  scrollToBottom()
}

const getBotResponse = (userMessage: string): string => {
  const message = userMessage.toLowerCase()
  
  if (message.includes('dịch vụ') || message.includes('service')) {
    return 'Chúng tôi cung cấp đầy đủ các dịch vụ cưới hỏi: tổ chức trọn gói, trang trí sân khấu, âm thanh ánh sáng, chụp ảnh quay phim. Bạn quan tâm đến dịch vụ nào?'
  }
  
  if (message.includes('giá') || message.includes('price') || message.includes('cost')) {
    return 'Giá dịch vụ của chúng tôi rất cạnh tranh và phù hợp với mọi ngân sách. Vui lòng liên hệ trực tiếp để được báo giá chi tiết.'
  }
  
  if (message.includes('liên hệ') || message.includes('contact')) {
    return 'Bạn có thể liên hệ với chúng tôi qua:\n📞 Hotline: 0123 456 789\n📧 Email: info@weddingevents.com\n📍 Địa chỉ: 123 Đường ABC, Quận 1, TP.HCM'
  }
  
  if (message.includes('cảm ơn') || message.includes('thank')) {
    return 'Cảm ơn bạn! Chúng tôi rất vui được hỗ trợ bạn. Nếu có thêm câu hỏi gì, đừng ngần ngại hỏi nhé!'
  }
  
  return 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể. Bạn có thể gọi hotline 0123 456 789 để được tư vấn trực tiếp.'
}

const simulateTyping = (): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(resolve, 1000 + Math.random() * 2000)
  })
}

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('vi-VN', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

// Handle new messages when chat is closed
const handleNewMessage = () => {
  if (!isOpen.value) {
    unreadCount.value++
  }
}

onMounted(() => {
  // Simulate incoming message after 10 seconds
  setTimeout(() => {
    if (!isOpen.value) {
      const welcomeMessage: ChatMessage = {
        id: messageId++,
        text: 'Bạn có cần tư vấn về dịch vụ cưới hỏi không?',
        isUser: false,
        timestamp: new Date()
      }
      messages.value.push(welcomeMessage)
      handleNewMessage()
    }
  }, 10000)
})
</script>

<style scoped>
.chat-widget {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.chat-toggle-btn {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--primary-color);
  color: white;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: all 0.3s ease;
  position: relative;
}

.chat-toggle-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
}

.chat-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #dc3545;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.chat-window {
  position: absolute;
  bottom: 70px;
  right: 0;
  width: 350px;
  height: 500px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-header {
  background: var(--primary-color);
  color: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-title {
  font-weight: 600;
  font-size: 1rem;
}

.chat-close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 5px;
  border-radius: 3px;
  transition: background-color 0.2s;
}

.chat-close-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.chat-messages {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.message {
  display: flex;
  margin-bottom: 10px;
}

.message-user {
  justify-content: flex-end;
}

.message-bot {
  justify-content: flex-start;
}

.message-content {
  max-width: 80%;
  padding: 10px 15px;
  border-radius: 18px;
  position: relative;
}

.message-user .message-content {
  background: var(--primary-color);
  color: white;
  border-bottom-right-radius: 5px;
}

.message-bot .message-content {
  background: #f1f3f4;
  color: #333;
  border-bottom-left-radius: 5px;
}

.message-text {
  font-size: 0.9rem;
  line-height: 1.4;
  white-space: pre-line;
}

.message-time {
  font-size: 0.7rem;
  opacity: 0.7;
  margin-top: 5px;
}

.typing-indicator {
  display: flex;
  gap: 4px;
  align-items: center;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #999;
  animation: typing 1.4s infinite ease-in-out;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0);
    opacity: 0.5;
  }
  30% {
    transform: translateY(-10px);
    opacity: 1;
  }
}

.chat-input {
  padding: 15px;
  border-top: 1px solid #eee;
}

.input-group {
  display: flex;
  gap: 10px;
}

.form-control {
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 10px 15px;
  font-size: 0.9rem;
  outline: none;
}

.form-control:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(13, 110, 253, 0.25);
}

.btn {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

@media (max-width: 480px) {
  .chat-window {
    width: calc(100vw - 40px);
    right: -20px;
  }
}
</style>