import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'chat.aula',
  appName: 'Chat Aula',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,

      backgroundColor: '#ffffffff',

      launchAutoHide: true,

      androidSplashResourceName: 'launch_splash',
    },
  },
};

export default config;
