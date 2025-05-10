import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    name: 'Solace',
    slug: process.env.EXPO_PUBLIC_APP_SLUG || 'solace-mobile-app',
    scheme: 'solace',
    version: '4.0.17',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    newArchEnabled: false,
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
      enableFullScreenImage_legacy: true,
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.solace.app',
      infoPlist: {
        NSCameraUsageDescription:
          'This app requires access to the camera to upload images and videos.',
        NSPhotoLibraryUsageDescription:
          'This app requires access to the photo library to upload images.',
        NSMicrophoneUsageDescription: 'This app requires access to the microphone to record audio.',
        NSAppleMusicUsageDescription:
          'This app does not use Apple Music, but a system API may require this permission.',
        UIBackgroundModes: ['fetch', 'remote-notification'],
        ITSAppUsesNonExemptEncryption: false,
      },
      // googleServicesFile: process.env.EXPO_PUBLIC_IOS_GOOGLE_SERVICES_FILE,  // commented out for local prebuild
      entitlements: {
        'aps-environment': 'production',
      },
      associatedDomains: ['applinks:solace.nuuxia.com'],
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.solace.app',
      permissions: [
        'android.permission.CAMERA',
        'android.permission.READ_EXTERNAL_STORAGE',
        'android.permission.WRITE_EXTERNAL_STORAGE',
        'android.permission.RECORD_AUDIO',
        'android.permission.READ_MEDIA_IMAGES',
      ],
      googleServicesFile: process.env.EXPO_PUBLIC_ANDROID_GOOGLE_SERVICES_FILE,
      intentFilters: [
        {
          action: 'VIEW',
          autoVerify: true,
          data: [
            {
              scheme: 'https',
              host: 'solace.nuuxia.com',
              pathPrefix: '/app/accounts/',
              pathPattern: '/*/conversations/*',
            },
          ],
          category: ['BROWSABLE', 'DEFAULT'],
        },
      ],
    },
    extra: {
      eas: {
        projectId: '83b988ac-0dd7-412e-8705-c8497e27f3dd',
        storybookEnabled: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED,
      },
    },
    owner: 'nuuxia',
    plugins: [
      'expo-font',
      [
        'react-native-permissions',
        {
          iosPermissions: ['Camera', 'PhotoLibrary', 'MediaLibrary'],
        },
      ],
      [
        '@sentry/react-native/expo',
        {
          url: 'https://sentry.io/',
          project: process.env.EXPO_PUBLIC_SENTRY_PROJECT_NAME,
          organization: process.env.EXPO_PUBLIC_SENTRY_ORG_NAME,
        },
      ],
      '@react-native-firebase/app',
      '@react-native-firebase/messaging',
      [
        'expo-build-properties',
        {
          android: {
            minSdkVersion: 24,
            compileSdkVersion: 35,
            targetSdkVersion: 34,
            extraMavenRepos: ['$rootDir/../../../node_modules/@notifee/react-native/android/libs'],
            enableProguardInReleaseBuilds: true,
            exclude: ['ffmpeg-kit-react-native'],
          },
          ios: {
            useFrameworks: 'static',
          },
        },
      ],
      './with-ffmpeg-pod.js',
    ],
    androidNavigationBar: {
      backgroundColor: '#ffffff',
    },
  };
};
