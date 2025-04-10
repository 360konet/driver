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
          <h3>Total Earnings: GHC {{ earnings.total }}</h3>
          <div class="earnings-row">
            <p>Today:<br> GHC {{ earnings.today }}</p>
            <p>Week:<br> GHC {{ earnings.week }}</p>
            <p>Month:<br> GHC {{ earnings.month }}</p>
            <p>Year:<br> GHC {{ earnings.year }}</p>
          </div>
        </div>
        <div class="rides-section">
          <h3>Total Rides: {{ rides.total }}</h3>
          <div class="rides-row">
            <p>Today: {{ rides.today }}</p>
            <p>Week: {{ rides.week }}</p>
            <p>Month: {{ rides.month }}</p>
            <p>Year: {{ rides.year }}</p>
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
            <h3>{{ ride.source }} to {{ ride.destination }}</h3>
            <p>{{ ride.ride_end }} - GHC {{ ride.amount }}</p>
          </ion-label>
          <ion-button class="more-button" @click="openRideDetails(ride)">More</ion-button>
        </ion-item>
      </ion-list>
    </ion-content>

    <!-- Ride Details Modal -->
    <ion-modal :is-open="showModal" @didDismiss="showModal = false">
      <ion-content class="ion-padding">
        <h2>Ride Details</h2>
        <p><strong>From:</strong> {{ selectedRide.source }}</p>
        <p><strong>To:</strong> {{ selectedRide.destination }}</p>
        <p><strong>Amount:</strong> GHC {{ selectedRide.amount }}</p>
        <p><strong>Date:</strong> {{ selectedRide.ride_end }}</p>
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
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import axios from "axios";

const route = useRoute();
const driverId = route.params.userId || localStorage.getItem("driver_id");

const showModal = ref(false);
const selectedRide = ref<any>({});
const earnings = ref({ total: 0, today: 0, week: 0, month: 0, year: 0 });
const rides = ref({ total: 0, today: 0, week: 0, month: 0, year: 0 });
const rideHistory = ref<any[]>([]);

const fetchEarningsAndRides = async () => {
  if (!driverId) {
    console.error("No driver ID found!");
    return;
  }

  try {
    console.log(`Fetching data for driver ID: ${driverId}`);

    const response = await axios.get(`https://dririd.nxtremeprojectnew.com/api/driver-earnings/${driverId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    console.log("API Response:", response.data);

    earnings.value = response.data.earnings || { total: 0, today: 0, week: 0, month: 0, year: 0 };
    rides.value = response.data.rides || { total: 0, today: 0, week: 0, month: 0, year: 0 };
    rideHistory.value = response.data.history || [];

  } catch (error) {
    console.error("Error fetching earnings:", error.response ? error.response.data : error.message);
  }
};

onMounted(fetchEarningsAndRides);

const openRideDetails = (ride: any) => {
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
