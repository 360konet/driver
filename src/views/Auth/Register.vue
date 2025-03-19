<template>
    <ion-page>
      <ion-content :fullscreen="true" class="login-content">
        <div class="login-container">
          <ion-card class="login-card">
            <img alt="Login cover" src="/img/registercover.jpg" class="cover-image" />
            <ion-card-header class="card-header">
              <ion-card-title class="title">
                Driver
                <ion-button fill="clear" class="customer-care-btn">Customer Care</ion-button>
              </ion-card-title>
              <ion-card-subtitle class="subtitle">Sign in to continue</ion-card-subtitle>
            </ion-card-header>
  
            <ion-card-content>
              <ion-input v-model="name" label="Name" label-placement="floating" fill="outline" placeholder="Enter name" class="input-field"></ion-input>
              <ion-input v-model="phone" label="Phone" label-placement="floating" fill="outline" placeholder="Enter phone number" class="input-field"></ion-input>
              <ion-input v-model="email" label="Email" label-placement="floating" fill="outline" placeholder="Enter email" class="input-field"></ion-input>
              <ion-input v-model="password" type="password" label="Password" label-placement="floating" fill="outline" placeholder="Enter password" class="input-field"></ion-input>
              
              <ion-button expand="block" @click="handleRegister" class="login-btn" :disabled="loading">
                {{ loading ? 'Registering...' : 'Register and Continue' }}
              </ion-button>
              
              <ion-label v-if="errorMessage" class="error-message">{{ errorMessage }}</ion-label>
  
  
              <ion-label class="register-label" @click="navigateToLogin">
                Already having an account? <span class="register-link">Login</span>
              </ion-label>
            </ion-card-content>
          </ion-card>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { IonPage, IonCard, IonInput, IonButton, IonCardHeader, IonLabel, IonCardTitle, IonCardSubtitle, IonCardContent, IonContent } from '@ionic/vue';
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import { registerUser } from '@/services/api';


  const router = useRouter();
  const name = ref('');
  const phone = ref('');
  const email = ref('');
  const password = ref('');
  const status = ref('driver'); // Set to "driver" for the driver page
  const loading = ref(false);
  const errorMessage = ref('');


  function navigateToLogin() {
    router.push('/login'); // Ensure '/register' route is defined in your router
  }
  
  const handleRegister = async () => {
  loading.value = true;
  errorMessage.value = '';

  try {
    const userData = { 
      name: name.value, 
      phone: phone.value, 
      email: email.value, 
      password: password.value, 
      status: status.value 
    };
    
    const response = await registerUser(userData);

    if (response.token) {
      localStorage.setItem('authToken', response.token); // Store token
      localStorage.setItem('userId', response.user.id); // Store user ID
    }

    router.push('/car/register'); // Redirect to car registration
  } catch (error: any) {
    errorMessage.value = error.message || 'Something went wrong!';
  } finally {
    loading.value = false;
  }
};


  </script>
  
  <style scoped>
  /* Background and Centered Container */
  .login-content {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffffff; /* Always White */
    padding: 20px;
    min-height: 100vh;
  }
  
  .login-container {
    width: 100%;
    max-width: 400px;
  }
  
  /* Transparent Card Styling */
  .login-card {
    border-radius: 12px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.1); /* Transparent with slight white tint */
    backdrop-filter: blur(10px); /* Glassmorphic Blur Effect */
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  /* Cover Image */
  .cover-image {
    width: 100%;
    border-radius: 8px;
    margin-bottom: 15px;
  }
  
  /* Header Styling */
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
    color: #e60000; /* Red Primary */
  }
  
  .subtitle {
    font-size: 14px;
    color: #fff;
  }
  
  /* Customer Care Button */
  .customer-care-btn {
    font-size: 12px;
    color: #e60000; /* Red */
    --color: #e60000;
    text-transform: capitalize;
  }
  
  /* Input Fields */
  .input-field {
    margin-bottom: 15px;
    --background: rgba(255, 255, 255, 0.2);
    --placeholder-color: #e60000;
    --color: #e60000;
  }
  
  /* Login Button */
  .login-btn {
    margin-top: 10px;
    --background: #e60000; /* Red */
    --background-hover: #cc0000; /* Darker Red */
    --color: white;
    font-weight: bold;
    border-radius: 8px;
  }
  
  /* Register Label */
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
  </style>
  