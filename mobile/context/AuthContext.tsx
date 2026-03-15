import { createContext, useContext, useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/supabase/supabasepublic';

export type AuthContextType = {
  session: Session | null;
  loading: boolean;
  hasProfile: boolean;        // ← new
  refetchProfile: () => void; // ← new, call this after checkin is done
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
  hasProfile: false,
  refetchProfile: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasProfile, setHasProfile] = useState(false);

  async function checkProfile(userId: string) {
    const { data } = await supabase
      .from('Profiles')
      .select('id')
      .eq('id', userId)
      .single();
    setHasProfile(() => data !== null);
  }

  async function refetchProfile() {
    if (session?.user.id) await checkProfile(session.user.id);
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) checkProfile(session.user.id);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (session) checkProfile(session.user.id);
        else setHasProfile(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ session, loading, hasProfile, refetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);