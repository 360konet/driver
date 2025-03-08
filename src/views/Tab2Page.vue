<template>
  <ion-page>
    <!-- Header -->
    <ion-header>
      <ion-toolbar class="header-toolbar">
        <ion-title>Ride/Earnings History</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="history-content">
      <!-- Earnings & Rides Overview -->
      <div class="overview-container">
        <div class="earnings-section">
          <h3>Total Earnings: GHC 6823.00</h3>
          <div class="earnings-row">
            <p>Today:<br> GHC 1000</p>
            <p>Week:<br> GHC 1000</p>
            <p>Month:<br> GHC 1000</p>
            <p>Year:<br> GHC 1000</p>
          </div>
        </div>
        <div class="rides-section">
          <h3>Total Rides: 6757</h3>
          <div class="rides-row">
            <p>Today: 13</p>
            <p>Week: 28</p>
            <p>Month: 56</p>
            <p>Year: 654</p>
          </div>
        </div>
      </div>

      <!-- Ride History List -->
      <ion-list class="history-list transparent-list">
        <ion-item 
          v-for="(ride, index) in rideHistory" 
          :key="index" 
          class="history-item transparent-item" 
          color="white"
        >
          <ion-label>
            <h3>{{ ride.from }} to {{ ride.to }}</h3>
            <p>{{ ride.date }} - {{ ride.time }}</p>
            <p>GHC {{ ride.amount }}</p>
          </ion-label>
          <ion-button class="more-button" @click="openRideDetails(ride)">More</ion-button>
        </ion-item>
      </ion-list>
    </ion-content>

    <!-- Ride Details Modal -->
    <ion-modal :is-open="showModal" @didDismiss="showModal = false">
      <ion-content class="ion-padding">
        <h2>Ride Details</h2>
        <p><strong>From:</strong> {{ selectedRide.from }}</p>
        <p><strong>To:</strong> {{ selectedRide.to }}</p>
        <p><strong>Amount:</strong> GHC {{ selectedRide.amount }}</p>
        <p><strong>Date:</strong> {{ selectedRide.date }}</p>
        <p><strong>Duration:</strong> {{ selectedRide.duration }}</p>
        <ion-button @click="showModal = false" expand="full">Close</ion-button>
      </ion-content>
    </ion-modal>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonLabel,
  IonItem,
  IonList,
  IonButton,
  IonModal,
} from "@ionic/vue";
import { ref } from "vue";

type Ride = {
  from: string;
  to: string;
  date: string;
  time: string;
  amount: number;
  duration: string;
};

const showModal = ref(false);
const selectedRide = ref<Ride>({
  from: "",
  to: "",
  date: "",
  time: "",
  amount: 0,
  duration: "",
});


const rideHistory = ref<Ride[]>([
  { from: "Kumasi", to: "Accra", date: "20th Jan 2025", time: "10:30 AM", amount: 200, duration: "3 hours" },
  { from: "Osu", to: "Nungua", date: "15th Jan 2025", time: "5:45 PM", amount: 150, duration: "45 mins" },
  { from: "Tema", to: "Sakumono", date: "12th Jan 2025", time: "3:20 PM", amount: 100, duration: "30 mins" },
  { from: "Burma Camp", to: "East Legon", date: "8th Jan 2025", time: "8:10 AM", amount: 250, duration: "1 hour" },
  { from: "Tamale", to: "Kumasi", date: "5th Jan 2025", time: "6:30 PM", amount: 300, duration: "5 hours" }
]);

const openRideDetails = (ride: Ride) => {
  selectedRide.value = ride;
  showModal.value = true;
};
</script>

<style scoped>
/* Header Styling */
.header-toolbar {
  --background: #e60000;
  color: white;
  text-align: center;
}

/* General Styling */
.history-content {
  background: white;
  padding: 15px;
}

/* Overview Section */
.overview-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 15px;
  background: transparent;
  border-radius: 12px;
  margin-bottom: 15px;
}

.earnings-section, .rides-section {
  flex: 1;
  text-align: center;
  padding: 10px;
  border: 1px solid #e60000;
  border-radius: 10px;
}

.earnings-row, .rides-row {
  display: flex;
  justify-content: space-around;
  font-size: 14px;
  color: #e60000;
}

/* History List Styling */
.history-list {
  margin-top: 10px;
  border-radius: 10px;
  background: transparent;
}

.history-item {
  background: white !important;
  border: 1px solid #e60000;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 12px;
}

.history-item h3 {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  color: #e60000;
}

.history-item p {
  margin: 5px 0 0;
  font-size: 14px;
  color: #e60000;
}

.more-button {
  --background: #e60000;
  --color: white;
  border-radius: 8px;
  font-size: 14px;
}
</style>
