import { useEffect } from 'react';
import { Slot, useRouter, useSegments } from 'expo-router';
import { AuthContextType, AuthProvider, useAuth } from '../context/AuthContext';


function AuthGate() {
  const { session, loading, hasProfile } : AuthContextType = useAuth()
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return;
    router.replace('/(tabs)' as any)
    const inTabsGroup = segments[0] === '(tabs)';
    const inCheckin = segments[0] === 'checkIn';


    if (!session) {
      router.replace('/login' as any);
    } else if (session){
      if (!hasProfile) {router.replace('/checkIn')}
      router.replace('/(tabs)' as any)
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