import { createContext, useContext, useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/supabase/supabasepublic';
import { checkProfileExists } from '@/model/User/userHandling';
import { Profile } from '@/app/types';

export type AuthContextType = {
  session: Session | null;
  loading: boolean;
  hasProfile: boolean|null; 
  refetchProfile: () => void; 
  profile: Profile | null
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
  hasProfile: false,
  refetchProfile: () => {},
  profile: null
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasProfile, setHasProfile] = useState<boolean|null>(null);
  const [profile, setProfile] = useState<Profile | null>(null)

  async function checkProfile(userId: string) {
    const profileExists = await checkProfileExists(userId)
    setHasProfile(profileExists);
    console.log(profile)
  }

  async function getProfile(userId : string) {
    const {data: Profile, error} = await supabase
            .from('Profiles')
            .select(
              'id, first_name, last_name, email'
            )
            .eq('id', userId)
            .single<Profile>()
      return Profile?? null
  }

  async function refetchProfile() {
    if (session?.user.id) 
      {
        const userId = session!.user.id
        checkProfile(userId);
        getProfile(userId).then(profile => setProfile(profile))
      }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        checkProfile(session.user.id);
        getProfile(session.user.id).then(profile => setProfile(profile))
      }

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
    <AuthContext.Provider value={{ session, loading, hasProfile, refetchProfile, profile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);