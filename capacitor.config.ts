import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.driverapp',
  appName: 'DriverApp',
  webDir: 'dist',
  plugins: {
    Geolocation: {
      enabled: true
    }
  }
};

export default config;
