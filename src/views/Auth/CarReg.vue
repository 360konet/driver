<template>
    <ion-page>
      <ion-content :fullscreen="true" class="login-content">
        <div class="login-container">
          <ion-card class="login-card">
            <img alt="Register cover" src="/img/registercover.jpg" class="cover-image" />
            <ion-card-header class="card-header">
              <ion-card-title class="title">
                Driver
                <ion-button fill="clear" class="customer-care-btn">Customer Care</ion-button>
              </ion-card-title>
              <ion-card-subtitle class="subtitle">Register Vehicle</ion-card-subtitle>
            </ion-card-header>
  
            <ion-card-content>
              <!-- Vehicle Type Selection -->
              <ion-segment v-model="vehicleType">
                <ion-segment-button value="car" style="color:black">Car</ion-segment-button>
                <ion-segment-button value="motor" style="color:black">Motorcycle</ion-segment-button>
              </ion-segment>
  
              <!-- Car Fields -->
              <div v-if="vehicleType === 'car'">
                <ion-input label="Car Brand" label-placement="floating" fill="outline" placeholder="Eg. Toyota" v-model="car.brand"></ion-input>
                <ion-input label="Model" label-placement="floating" fill="outline" placeholder="Eg. Corolla" v-model="car.model"></ion-input>
                <ion-input label="Year" label-placement="floating" type="number" fill="outline" placeholder="Eg. 2023" v-model="car.year"></ion-input>
                <ion-input label="License Plate" label-placement="floating" fill="outline" placeholder="Eg. GR-1234-22" v-model="car.plate"></ion-input>
              </div>
  
              <!-- Motorcycle Fields -->
              <div v-if="vehicleType === 'motor'">
                <ion-input label="Motorcycle Brand" label-placement="floating" fill="outline" placeholder="Eg. Yamaha" v-model="motor.brand"></ion-input>
                <ion-input label="Model" label-placement="floating" fill="outline" placeholder="Eg. R15" v-model="motor.model"></ion-input>
                <ion-input label="Year" label-placement="floating" type="number" fill="outline" placeholder="Eg. 2023" v-model="motor.year"></ion-input>
                <ion-input label="License Plate" label-placement="floating" fill="outline" placeholder="Eg. M-1234-22" v-model="motor.plate"></ion-input>
              </div>
  
              <ion-button expand="block" @click="registerVehicle" class="login-btn">Register</ion-button>
            </ion-card-content>
          </ion-card>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { IonPage, IonCard, IonInput, IonButton, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonContent, IonSegment, IonSegmentButton } from '@ionic/vue';
  import { useRouter } from 'vue-router';

  const vehicleType = ref('car'); // Default selection
  const car = ref({ brand: '', model: '', year: '', plate: '' });
  const motor = ref({ brand: '', model: '', year: '', plate: '' });
  const router = useRouter();

  
//   const registerVehicle = () => {
//     if (vehicleType.value === 'car') {
//       console.log('Registering Car:', car.value);
//     } else {
//       console.log('Registering Motorcycle:', motor.value);
//     }
//   };

function registerVehicle() {
    router.push('/tabs/tab3'); // Ensure '/register' route is defined in your router
  }

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
  