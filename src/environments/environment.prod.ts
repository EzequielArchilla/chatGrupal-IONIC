import { initializeApp } from 'firebase/app';
import { CapacitorConfig } from '@capacitor/cli';

export const environment = {
  firebase: {
    apiKey: "AIzaSyC6dE8U0NitIBpQTlwMMNARLLighTn0i6k",
    authDomain: "chatgrupal-2281d.firebaseapp.com",
    projectId: "chatgrupal-2281d",
    storageBucket: "chatgrupal-2281d.appspot.com",
    messagingSenderId: "633661786855",
    appId: "1:633661786855:web:4b9ff1f951b1d38047b042"
  },
  production: true,
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: '#ffffffff',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: true,
      androidSpinnerStyle: 'large',
      iosSpinnerStyle: 'small',
      spinnerColor: '#999999',
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: 'launch_screen',
      useDialog: true,
    },
  },
};

// Initialize Firebase
const app = initializeApp(environment.firebase);
