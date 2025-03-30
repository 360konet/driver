<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" :href="`/tabs/tab1/${userId}`">
          <ion-icon aria-hidden="true" :icon="navigateOutline" />
          <ion-label>Request</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="tab2" :href="`/tabs/tab2/${userId}`">
          <ion-icon aria-hidden="true" :icon="clipboardOutline" />
          <ion-label>Ride/Earnings</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="tab3" :href="`/tabs/tab3/${userId}`">
          <ion-icon aria-hidden="true" :icon="personOutline" />
          <ion-label>Account</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { square, navigateOutline, personOutline, clipboardOutline } from 'ionicons/icons';
import { useRoute } from 'vue-router';
import { ref, computed, onMounted } from 'vue';

const route = useRoute();
const userId = ref<string | null>(null);

// Ensure userId is set
onMounted(() => {
  userId.value = route.params.userId as string || localStorage.getItem('user_id');
});

</script>

<style scoped>
ion-page, ion-tabs, ion-tab-bar {
  --background: white;
}

ion-tab-bar {
  --background: white;
  --border-top: 1px solid #ddd; /* Light border */
  border-radius: 15px 15px 0 0; /* Curve at the top */
  overflow: hidden; /* Ensure the curve is applied */
  box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.1); /* Optional: Soft shadow */
}

ion-content {
  --background: white !important;
}

ion-tab-button {
  --color: #333; /* Darker text */
  --color-selected: #e60000; /* Highlight color when active */
  font-weight: 500; /* Slightly bolder text */
}

</style>