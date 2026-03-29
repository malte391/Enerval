import { useCallback, useEffect, useState } from 'react';
import { Slot, useRouter, useSegments } from 'expo-router';
import { AuthContextType, AuthProvider, useAuth } from '@/context/AuthContext';
import * as SplashScreen from 'expo-splash-screen'

SplashScreen.preventAutoHideAsync()

function AuthGate() {
  const [splashReady, setSplashReady] = useState<boolean>(false)
  const { session, loading, hasProfile, profile } : AuthContextType = useAuth()
  const router = useRouter();
  const segments = useSegments();

  const profileLoaded = useCallback((): boolean => {
    if (loading) return false
    if (hasProfile !== null) {
      if (hasProfile === true) {
        return profile !== null
      }
    }
    return hasProfile !== null
  }, [hasProfile, profile, loading])

  useEffect(() => {
    if (profileLoaded()) setSplashReady(true)
  }, [profileLoaded])

  useEffect(() => {
    if(splashReady) SplashScreen.hideAsync()
  }, [splashReady])

  useEffect(() => {
    if (loading) return
    if (hasProfile === null) return;
    if (hasProfile === true && profile === null) return;

    const inTabsGroup = segments[0] === '(tabs)';
    const inCheckin = segments[0] === 'checkIn';
    const inLogIn = segments[0] === 'login'

    function route() {
      if (session) {
        if (hasProfile && !inTabsGroup) router.replace('/(tabs)/(home)')
        else if (!hasProfile && !inCheckin) router.replace('/checkIn')
      } else {
        if (!inLogIn) router.replace('/login');
      }
    }
    route();

  }, [session, loading, hasProfile, profile]);

  return <Slot />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthGate />
    </AuthProvider>
  );
}