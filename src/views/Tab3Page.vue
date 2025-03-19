<template>
  <ion-page>
    <ion-content :fullscreen="true" class="white-background">
      <!-- Profile Header -->
      <div class="profile-header">
        <div class="profile-image-container">
          <ion-img src="/img/logincover.jpg" class="profile-image" />
        </div>
        <ion-label class="profile-name">{{ user.name }}</ion-label>
        <p>{{ user.status }}</p>
      </div>

      <!-- Profile Details -->
      <ion-card class="transparent-card">
        <ion-list class="transparent-list">
          <ion-item class="transparent-item no-background">
            <ion-icon slot="start" :icon="phonePortraitOutline" />
            <ion-label>Phone</ion-label>
            <ion-note slot="end">{{ user.phone }}</ion-note>
          </ion-item>
          <ion-item class="transparent-item no-background">
            <ion-icon slot="start" :icon="mailOpenOutline" />
            <ion-label>Email</ion-label>
            <ion-note slot="end">{{ user.email }}</ion-note>
          </ion-item>
          <ion-item class="transparent-item no-background">
            <ion-icon slot="start" :icon="locateOutline" />
            <ion-label>Current Location</ion-label>
            <ion-note slot="end">{{ user.location || 'Unknown' }}</ion-note>
          </ion-item>
          <ion-item class="transparent-item no-background">
            <ion-icon slot="start" :icon="timeOutline" />
            <ion-label>Created At</ion-label>
            <ion-note slot="end">{{ user.created_at }}</ion-note>
          </ion-item>
        </ion-list>
        <ion-button expand="block" class="red-button">Edit Profile</ion-button>
      </ion-card>

      <!-- Car Details -->
      <div class="profile-header">
        <ion-label class="profile-name">Vehicle Details</ion-label>
      </div>
      <ion-card class="transparent-card">
        <ion-list class="transparent-list">
          <ion-item class="transparent-item no-background">
            <ion-icon slot="start" :icon="carOutline" />
            <ion-label>Car Brand</ion-label>
            <ion-note slot="end">{{ vehicle.brand || 'N/A' }}</ion-note>
          </ion-item>
          <ion-item class="transparent-item no-background">
            <ion-icon slot="start" :icon="carOutline" />
            <ion-label>Model</ion-label>
            <ion-note slot="end">{{ vehicle.model || 'N/A' }}</ion-note>
          </ion-item>
          <ion-item class="transparent-item no-background">
            <ion-icon slot="start" :icon="calendarNumberOutline" />
            <ion-label>Year</ion-label>
            <ion-note slot="end">{{ vehicle.year || 'N/A' }}</ion-note>
          </ion-item>
          <ion-item class="transparent-item no-background">
            <ion-icon slot="start" :icon="paperPlaneOutline" />
            <ion-label>Number Plate</ion-label>
            <ion-note slot="end">{{ vehicle.plate || 'N/A' }}</ion-note>
          </ion-item>
        </ion-list>
        <ion-button expand="block" class="red-button">Edit Car Details</ion-button>
      </ion-card>

      <ion-card class="transparent-card">
        <ion-list class="transparent-list">
          <ion-item class="transparent-item no-background">
            <ion-icon slot="start" :icon="chatbubbleOutline" />
            <ion-label>Language</ion-label>
            <ion-note slot="end">English</ion-note>
          </ion-item>
          <ion-item class="transparent-item no-background">
            <ion-icon slot="start" :icon="callOutline" />
            <ion-label>Customer Care</ion-label>
            <ion-note slot="end">+233 00 000 0000</ion-note>
          </ion-item>
        </ion-list>
      </ion-card>

      <!-- Action Buttons -->
      <div class="action-buttons">
        <ion-button expand="block" class="red-button" @click="logout">Log Out</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { 
  IonPage, 
  IonContent, 
  IonLabel, 
  IonImg, 
  IonCard, 
  IonList, 
  IonItem, 
  IonIcon, 
  IonNote, 
  IonButton 
} from "@ionic/vue";
import { 
  phonePortraitOutline, 
  mailOpenOutline, 
  locateOutline, 
  timeOutline, 
  carOutline, 
  calendarNumberOutline, 
  paperPlaneOutline, 
  chatbubbleOutline, 
  callOutline 
} from "ionicons/icons";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

// State for user and vehicle
const user = ref({});
const vehicle = ref({});

const router = useRouter();

// Fetch user and vehicle details
const fetchProfile = async () => {
  try {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      router.push("/login");
      return;
    }

    const response = await axios.get(`http://127.0.0.1:8000/api/user/profile/${userId}`);

    user.value = response.data.user;
    vehicle.value = response.data.vehicle || {}; // If no vehicle, keep an empty object
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
};


// Logout function
const logout = () => {
  localStorage.removeItem("authToken");
  router.push("/login");
};

// Load profile data on component mount
onMounted(fetchProfile);
</script>

<style scoped>
.white-background {
  --background: #ffffff;
}

/* Profile Header */
.profile-header {
  text-align: center;
  padding: 20px 0;
  background-color: #ffffff;
}

.profile-image-container {
  margin: 0 auto;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #e60000;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-name {
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 10px;
  color: #e60000;
}

/* Transparent Profile Details Card */
.transparent-card {
  background: transparent;
  border: none;
  box-shadow: none;
}

.transparent-list {
  background: transparent;
}

.transparent-item {
  background: transparent;
  --ion-background-color: transparent;
  --inner-border-width: 0;
}

.no-background {
  --background: transparent !important;
  --ion-item-background: transparent !important;
}

ion-list {
  --ion-safe-area-padding: 0;
}

ion-icon {
  color: #e60000;
}

/* Action Buttons */
.action-buttons {
  margin: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.red-button {
  --border-radius: 8px;
  --background: #e60000;
  --color: white;
}
</style>
