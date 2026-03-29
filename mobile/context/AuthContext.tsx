import {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/supabase/supabasepublic';
import { checkProfileExists } from '@/model/User/userHandling';
import { Profile } from '@/types';

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
    await checkProfileExists(userId).then((exists) => setHasProfile(exists));
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

  const refetchProfile = useCallback(async () => {
    if (session?.user.id) {
      const userId = session!.user.id
      await checkProfile(userId);
      getProfile(userId).then(profile => setProfile(profile))
    }
  }, [session])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        checkProfile(session.user.id);
        getProfile(session.user.id).then(profile => setProfile(() => profile))
      }

      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (_event, session) => {
          if (_event === 'INITIAL_SESSION') return;
          setLoading(true);
          setSession(session);
          if (session) {
            await Promise.all([
              checkProfile(session.user.id),
              getProfile(session.user.id).then(p => setProfile(p))
            ]);
          } else {
            setHasProfile(false);
            setProfile(null);
          }
          setLoading(false)
        }
    );

    return () => subscription.unsubscribe();
  }, []);

  const memo = useMemo(
      () => ({ session, loading, hasProfile, refetchProfile, profile }),
      [session, loading, hasProfile, profile]
  )

  return (
    <AuthContext.Provider value={memo}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);