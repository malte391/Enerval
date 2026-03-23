import { useCallback, useEffect, useState } from 'react';
import { Slot, useRouter, useSegments } from 'expo-router';
import { AuthContextType, AuthProvider, useAuth } from '../context/AuthContext';
import * as SplashScreen from 'expo-splash-screen'

SplashScreen.preventAutoHideAsync()

function AuthGate() {
  const [splashReady, setSplashReady] = useState<boolean>(false)
  const { session, loading, hasProfile, profile } : AuthContextType = useAuth()
  const router = useRouter();
  const segments = useSegments();

  const profileLoaded = useCallback((): boolean => {
    if (hasProfile !== null) {
      if (hasProfile === true) {
        return profile !== null
      }
    }
    return hasProfile !== null
  }, [hasProfile, profile])

  useEffect(() => {
    if (profileLoaded()) setSplashReady(true)
  }, [profileLoaded])

  useEffect(() => {
    if(splashReady) SplashScreen.hideAsync()
  }, [splashReady])

  useEffect(() => {
    if (loading || hasProfile === null) return;

    function route() {
      if (session) {
        if (hasProfile) { router.replace('/(tabs)/(home)') }
        else if (!hasProfile) { router.replace('/checkIn') }
      }
      if (!session) {
        router.replace('/login');
      }
    }
    
    const inTabsGroup = segments[0] === '(tabs)';
    const inCheckin = segments[0] === 'checkIn';
    const inLogIn = segments[0] === 'login'
    route();

  }, [session, loading, hasProfile]);

  return <Slot />;
} 

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthGate />
    </AuthProvider>
  );
}