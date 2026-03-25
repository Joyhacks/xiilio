import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.e4c2ff06faec40a28aebc6afdc9c244f',
  appName: 'xiilio',
  webDir: 'dist',
  server: {
    url: 'https://e4c2ff06-faec-40a2-8aeb-c6afdc9c244f.lovableproject.com?forceHideBadge=true',
    cleartext: true,
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
      backgroundColor: '#1a1610',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
      launchFadeOutDuration: 300,
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#1a1610',
    },
  },
};

export default config;
