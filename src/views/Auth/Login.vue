<template>
  <ion-page>
    <ion-content :fullscreen="true" class="login-content">
      <div class="login-container">
        <ion-card class="login-card">
          <img alt="Login cover" src="/img/logincover.jpg" class="cover-image" />
          <ion-card-header class="card-header">
            <ion-card-title class="title">
              Driver
              <ion-button fill="clear" class="customer-care-btn" @click="openCustomerCare">Customer Care</ion-button>
            </ion-card-title>
            <ion-card-subtitle class="subtitle">Sign in to continue</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content>
            <ion-input
              label="Phone"
              label-placement="floating"
              fill="outline"
              placeholder="Enter phone number"
              class="input-field"
            ></ion-input>
            <ion-input
              type="password"
              label="Password"
              label-placement="floating"
              fill="outline"
              placeholder="Enter password"
              class="input-field"
            ></ion-input>

            <ion-button expand="block" @click="navigateToHome" class="login-btn">Login</ion-button>

            <ion-label class="register-label" @click="navigateToRegister">
              Don't have an account? <span class="register-link">Register Now</span>
            </ion-label>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>

    <!-- Customer Care Modal -->
    <ion-modal :is-open="showCustomerCare" @didDismiss="showCustomerCare = false">
        <ion-content class="ion-padding chat-modal">
          <div class="chat-header">
            <h2>Customer Care Chat</h2>
            <ion-button fill="clear" color="danger" @click="showCustomerCare = false">Close</ion-button>
          </div>
          <div class="chat-container">
            <div v-for="(message, index) in chatMessages" :key="index" class="chat-message" :class="{ 'sent': message.sent }">
              {{ message.text }}
            </div>
          </div>
          <div class="chat-input-container">
            <ion-input v-model="newMessage" placeholder="Type a message..." class="chat-input"></ion-input>
            <ion-button @click="sendMessage" class="send-btn">Send</ion-button>
          </div>
        </ion-content>
      </ion-modal>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonCard, IonInput, IonButton, IonCardHeader, IonLabel, IonCardTitle, IonCardSubtitle, IonCardContent, IonContent, IonModal } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const showCustomerCare = ref(false);
const chatMessages = ref<{ text: string; sent: boolean }[]>([]);
const newMessage = ref('');

function navigateToRegister() {
  router.push('/register');
}

function navigateToHome() {
  router.push('/tabs/tab1');
}

function openCustomerCare() {
  showCustomerCare.value = true;
}

function sendMessage() {
  if (newMessage.value.trim() !== '') {
    chatMessages.value.push({ text: newMessage.value, sent: true });
    newMessage.value = '';
  }
}
</script>

<style scoped>
/* Background and Centered Container */
.login-content {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  padding: 20px;
  min-height: 100vh;
}

.login-container {
  width: 100%;
  max-width: 400px;
}

.login-card {
  border-radius: 12px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.cover-image {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 15px;
}

.card-header {
  text-align: center;
  padding-bottom: 10px;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 22px;
  font-weight: bold;
  color: #e60000;
}

.subtitle {
  font-size: 14px;
  color: #fff;
}

.customer-care-btn {
  font-size: 12px;
  color: #e60000;
  --color: #e60000;
  text-transform: capitalize;
}

.input-field {
  margin-bottom: 15px;
  --background: rgba(255, 255, 255, 0.2);
  --placeholder-color: #e60000;
  --color: #e60000;
}

.login-btn {
  margin-top: 10px;
  --background: #e60000;
  --background-hover: #cc0000;
  --color: white;
  font-weight: bold;
  border-radius: 8px;
}

.register-label {
  display: block;
  text-align: center;
  margin-top: 15px;
  font-size: 14px;
  color: #e60000;
  cursor: pointer;
}

.register-link {
  font-weight: bold;
  color: #e60000;
  text-decoration: underline;
}

.chat-modal {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
  }
  
  .chat-container {
    flex-grow: 1;
    max-height: 70vh;
    overflow-y: auto;
    padding: 10px;
    background: #f8f8f8;
    border-radius: 8px;
    margin-bottom: 10px;
  }
  
  .chat-message {
    padding: 8px;
    margin: 5px 0;
    border-radius: 5px;
    background: #e0e0e0;
    width: fit-content;
  }
  
  .sent {
    background: #e60000;
    color: white;
    margin-left: auto;
  }
  
  .chat-input-container {
    display: flex;
    align-items: center;
    padding: 10px;
    background: #fff;
    border-top: 1px solid #ccc;
  }
  
  .chat-input {
    flex-grow: 1;
    margin-right: 10px;
  }
  
  .send-btn {
    --background: #e60000;
    --color: white;
  }
</style>
