import { useEffect } from 'react';
import { Slot, useRouter, useSegments } from 'expo-router';
import { AuthContextType, AuthProvider, useAuth } from '../context/AuthContext';

function AuthGate() {
  const { session, loading, hasProfile } : AuthContextType = useAuth()
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return;
    const inTabsGroup = segments[0] === '(tabs)';
    const inCheckin = segments[0] === 'checkIn';

    if (!session) {
      router.replace('/login');
    } else if (session && !hasProfile) {
      router.replace('/checkIn')
    } else if (session){
      router.replace('/(tabs)')
    }
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