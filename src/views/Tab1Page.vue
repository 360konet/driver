<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar class="transparent-toolbar">
        <ion-title color="primary">
          Driver
          <ion-icon 
            aria-hidden="true" 
            :icon="notificationsOutline" 
            style="float:right; font-size: 24px; cursor: pointer;" 
            @click="openNotifications"
          />
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ride-content">
      <div id="map" class="map-container"></div>

      <ion-card v-for="ride in rideRequests" :key="ride.id" color="white">
        <ion-card-header>
          <ion-card-title style="color:brown">Ride Request</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>Pickup: {{ ride.source }}</p>
          <p>Destination: {{ ride.destination }}</p>
          <p>Rider: {{ ride.rider.name }}</p>
          <p>Fare: GHS {{ ride.fare || "0.00" }}</p>
          <div class="button-group" v-if="!rideAccepted">
            <ion-button @click="acceptRide(ride.id)">Accept</ion-button>
            <ion-button @click="declineRide(ride.id)" color="danger">Decline</ion-button>
          </div>
          <div class="button-group" v-if="rideAccepted && !rideStarted">
            <ion-button @click="startRide(ride.id)">Start Ride</ion-button>
          </div>
          <div class="button-group" v-if="rideStarted">
            <ion-button @click="completeRide(ride.id)" color="success">Complete Ride</ion-button>
          </div>
        </ion-card-content>
      </ion-card>


      <ion-modal :is-open="showNotifications" @didDismiss="showNotifications = false">
        <ion-content class="ion-padding">
          <h2>Notifications</h2>
          <div class="notification-list">
            <div v-for="(notification, index) in notifications" :key="index" class="notification-item">
              {{ notification }}
            </div>
          </div>
          <ion-button expand="full" @click="showNotifications = false">Close</ion-button>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonButton, IonIcon, IonModal, alertController
} from "@ionic/vue";
import { notificationsOutline } from "ionicons/icons";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();
const driverId = ref(route.params.userId);
const rideRequests = ref([]);

const pickupLocation = ref("Unknown");
const destination = ref("Unknown");
const fare = ref("0.00");
const rideAccepted = ref(false);
const rideStarted = ref(false);
const rideCompleted = ref(false);
const DriverequestVisible = ref(true);
const showNotifications = ref(false);
const notifications = ref(["New promo: Get 10% off your next ride!", "System update scheduled for midnight.", "Reminder: Safety first! Drive responsibly."]);

let map, pickupMarker, destinationMarker, DriverMarker, directionsService, directionsRenderer;

const fetchRides = async () => {
  try {
    const token = localStorage.getItem("authToken"); // Retrieve token
    const response = await axios.get(`http://127.0.0.1:8000/api/driver/rides/${driverId.value}`,
      {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.data.length > 0) {
      rideRequests.value = response.data;
    } else {
      console.log("No ride requests available.");
    }
  } catch (error) {
    console.error("Error fetching rides:", error);
  }
};

const acceptRide = async (rideId) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.post(`http://127.0.0.1:8000/api/driver/rides/${rideId}/accept`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.data.success) {
      rideAccepted.value = true;
      // Update ride status in UI
      const rideIndex = rideRequests.value.findIndex(r => r.id === rideId);
      if (rideIndex !== -1) {
        rideRequests.value[rideIndex].status = "Processing";
      }

      navigator.geolocation.getCurrentPosition((position) => {
        const DriverLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
        map.setCenter(DriverLocation);
        if (DriverMarker) DriverMarker.setMap(null);
        DriverMarker = new google.maps.Marker({ position: DriverLocation, map, title: "Driver's Location" });

        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: pickupLocation.value }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            const pickupLocationCoords = results[0].geometry.location;
            if (pickupMarker) pickupMarker.setMap(null);
            pickupMarker = new google.maps.Marker({ position: pickupLocationCoords, map, title: "Pickup Location" });
            drawRoute(DriverLocation, pickupLocationCoords);
          }
        });
      });
    }
  } catch (error) {
    console.error("Error accepting ride:", error);
  }
};


onMounted(() => {
  initMap();
  simulateIncomingRequest();
  fetchRides();
});

const initMap = () => {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 5.6037, lng: -0.1870 },
    zoom: 12,
  });
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer({ map });
};

const openNotifications = () => {
  showNotifications.value = true;
};

const simulateIncomingRequest = () => {
  setTimeout(() => {
    pickupLocation.value = "KFC Spintex";
    destination.value = "Kwame Nkrumah Circle";
    fare.value = "25.00";
  }, 3000);
};


const startRide = async (rideId) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.post(
      `http://127.0.0.1:8000/api/driver/rides/${rideId}/start`,
      { ride_start: new Date().toISOString() }, // Send current timestamp
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      rideStarted.value = true;

      // Update UI status
      const rideIndex = rideRequests.value.findIndex(r => r.id === rideId);
      if (rideIndex !== -1) {
        rideRequests.value[rideIndex].status = "In Progress";
        rideRequests.value[rideIndex].ride_start = new Date().toISOString(); // Store locally
      }

      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: destination.value }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          const destinationCoords = results[0].geometry.location;
          if (destinationMarker) destinationMarker.setMap(null);
          destinationMarker = new google.maps.Marker({ position: destinationCoords, map, title: "Destination" });
          drawRoute(pickupMarker.getPosition(), destinationCoords);
        }
      });
    }
  } catch (error) {
    console.error("Error starting ride:", error);
  }
};



const completeRide = async (rideId) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.post(
      `http://127.0.0.1:8000/api/driver/rides/${rideId}/complete`, 
      {}, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      const alert = await alertController.create({
        header: "Ride Completed",
        message: "Ride Completed Successfully!",
        buttons: [
          {
            text: "OK",
            handler: () => {
              resetRide();
            },
          },
        ],
      });
      await alert.present();

      // Update UI status
      const rideIndex = rideRequests.value.findIndex(r => r.id === rideId);
      if (rideIndex !== -1) {
        rideRequests.value[rideIndex].status = "Completed";
      }
    }
  } catch (error) {
    console.error("Error completing ride:", error);
  }
};


const drawRoute = (origin, destination) => {
  directionsService.route({
    origin,
    destination,
    travelMode: google.maps.TravelMode.DRIVING,
  }, (result, status) => {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsRenderer.setDirections(result);
    }
  });
};

const declineRide = () => {
  DriverequestVisible.value = false;
};

const resetRide = () => {
  rideAccepted.value = false;
  rideStarted.value = false;
  rideCompleted.value = false;
  DriverequestVisible.value = true;
  simulateIncomingRequest();
};
</script>

<style scoped>
.transparent-toolbar {
  --background: transparent;
  --box-shadow: none;
  color: white;
}
.map-container {
  height: 60%;
  width: 100%;
}
.ride-content {
  display: flex;
  flex-direction: column;
}
.button-group {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
}
.button-group ion-button {
  flex: 1;
}
.notification-list {
  padding: 10px;
}
.notification-item {
  padding: 10px;
  margin-bottom: 5px;
  background: #f8f8f8;
  border-radius: 5px;
}
</style>
