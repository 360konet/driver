<template>
    <ion-page>
      <ion-header translucent>
        <ion-toolbar class="transparent-toolbar">
          <ion-buttons slot="start">
            <ion-back-button @click="goBack" />
          </ion-buttons>
          <ion-title color="primary">
            Chat
          </ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content :fullscreen="true">
        <div class="chat-container">
          <!-- Chat messages -->
          <div class="messages" ref="messagesContainer">
            <div v-for="(message, index) in messages" :key="index" :class="{'sent': message.sent, 'received': !message.sent}">
              <p>{{ message.text }}</p>
              <span class="timestamp">
                {{ new Date(message.timestamp).toLocaleTimeString() }} <!-- Format timestamp -->
              </span>
            </div>
          </div>
  
          <!-- Message input -->
          <div class="message-input">
            <ion-input v-model="newMessage" placeholder="Type a message..." />
            <ion-button @click="sendMessage" color="primary">Send</ion-button>
          </div>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import { useRoute, useRouter } from 'vue-router';  // Add useRouter import
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonButtons, IonBackButton } from '@ionic/vue';
  import axios from 'axios';
  import { defineProps } from 'vue';
  
  
  const newMessage = ref('');
  const driverName = ref('');  // To hold the driver's name
  const router = useRouter();
  const riderId = ref(localStorage.getItem('userId') || '');  // You can replace with your auth system
  const messages = ref([]);  // Define messages as a reactive variable
  const route = useRoute();
  const rideId = ref(route.params.rideId);  // Get the ride ID from the URL
  const driverId = ref(route.params.driverId);  // Get the driver ID from the URL

  console.log('rideId:', rideId.value);  // Log the rideId to ensure it's set
  console.log('driverId:', driverId.value);  // Log the driverId to ensure it's set
  
  // Accepting data as props
  const props = defineProps({
    driverData: Object,
    rideId: Number
  });
  
  // Use driverData and rideId to load chat history or start a new conversation
  console.log(props.driverData, props.rideId);
  
  // Fetch driver data (assuming API call or data availability)
  const fetchDriverName = async () => {
  try {
    const response = await axios.get(`https://dririd.nxtremeprojectnew.com/api/drivers/${driverId.value}`);
    driverName.value = response.data.name;  // Assuming the response has 'name' field
    localStorage.setItem('driverId', response.data.id); // ✅ Safely set it after response is received
  } catch (error) {
    console.error('Error fetching driver data:', error);
  }
};

  
  const actualDriverId = localStorage.getItem('driverId') || ''  // Get driver's ID

  const sendMessage = async () => {
  if (!actualDriverId) {
    console.error('Driver ID is missing!');
    return;
  }

  if (newMessage.value.trim()) {
    const messageData = {
      user_id: riderId.value,      // ✅ Sender: rider
      driver_id: driverId.value,   // ✅ Recipient: driver
      ride_id: rideId.value,
      message: newMessage.value,
    };


    try {
      await axios.post('https://dririd.nxtremeprojectnew.com/api/chat', messageData);
      messages.value.push({ text: newMessage.value, sent: true });
      newMessage.value = '';

      const messagesContainer = document.querySelector('.messages');
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
};


  
  // Fetch new messages for the rider and driver
  const fetchMessages = async () => {
    try {
      const response = await axios.get('https://dririd.nxtremeprojectnew.com/api/get-chat', {
        params: {
          user_id: riderId.value,
          driver_id: driverId.value,
          ride_id: rideId.value,  // Pass rideId when fetching messages
        },
      });
      
      // Update the messages list with the timestamp from the API
      messages.value = response.data.map(msg => ({
        text: msg.message,
        sent: msg.user_id === actualDriverId, // ✅ now checks if the message is sent by the driver
        timestamp: msg.created_at,  // This will come from the API
      }));
      
      // Scroll to the bottom whenever new messages are fetched
      const messagesContainer = document.querySelector('.messages');
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };
  
  
  // Handle the back button click
  const goBack = () => {
    router.push(`/tabs/tab1/${riderId.value}`);
  };
  
  // Set up polling for new messages every 3 seconds
  let pollingInterval = null;
  onMounted(() => {
    fetchDriverName();
    fetchMessages(); // Fetch messages on load
  
    // Poll every 3 seconds to check for new messages
    pollingInterval = setInterval(fetchMessages, 3000);
  });
  
  // Clean up polling interval when the component is destroyed
  onBeforeUnmount(() => {
    clearInterval(pollingInterval);
  });
  </script>
  
  
  
  <style scoped>
  .transparent-toolbar {
    --background: transparent;
    --box-shadow: none;
    color: white;
  }
  
  .chat-container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .messages {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .messages .sent,
  .messages .received {
    max-width: 70%;
    padding: 10px 15px;
    border-radius: 20px;
    word-wrap: break-word;
  }
  
  .messages .sent {
    align-self: flex-end;
    background-color: #bb1d1d;
    color: white;
    border-bottom-right-radius: 0;
  }
  
  .messages .received {
    align-self: flex-start;
    background-color: #f1f1f1;
    color: #333;
    border-bottom-left-radius: 0;
  }
  
  .message-input {
    display: flex;
    padding: 10px;
    border-top: 1px solid #ccc;
    background: white;
  }
  
  .message-input ion-input {
    flex: 1;
    margin-right: 10px;
  }
  
  .message-input ion-button {
    width: 80px;
  }
  </style>
  