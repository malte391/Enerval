import {createContext, useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/supabase/supabasepublic';
import { checkProfileExists } from '@/model/User/userHandling';
import { Profile } from '@/types';

export type AuthContextType = {
  session: Session | null;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  hasProfile: boolean | null;
  refetchProfile: () => void;
  profile: Profile | null
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
  setLoading: () => {},
  hasProfile: false,
  refetchProfile: () => {},
  profile: null
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasProfile, setHasProfile] = useState<boolean | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null)
  const isFetching = useRef(false)

  // stable functions — defined outside useCallback so they don't cause dep changes
  const checkProfile = useCallback(async (userId: string) => {
    const exists = await checkProfileExists(userId)
    setHasProfile(exists)
  }, [])

  const getProfile = useCallback(async (userId: string): Promise<Profile | null> => {
    const { data } = await supabase
        .from('Profiles')
        .select('id, first_name, last_name, email')
        .eq('id', userId)
        .single<Profile>()
    return data ?? null
  }, [])

  const fetchUserData = useCallback(async (userId: string) => {
    if (isFetching.current) return
    isFetching.current = true
    await Promise.all([
      checkProfile(userId),
      getProfile(userId).then(p => setProfile(p))
    ])
    isFetching.current = false
  }, [checkProfile, getProfile])

  const refetchProfile = useCallback(async () => {
    if (session?.user.id) {
      await fetchUserData(session.user.id)
    }
  }, [session, fetchUserData])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session) void fetchUserData(session.user.id)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (_event, session) => {
          if (_event === 'INITIAL_SESSION') return
          setLoading(true)
          setSession(session)
          if (session) {
            await fetchUserData(session.user.id)
          } else {
            setHasProfile(false)
            setProfile(null)
          }
          setLoading(false)
        }
    )

    return () => subscription.unsubscribe()
  }, [fetchUserData])

  const memo = useMemo(
      () => ({ session, loading, setLoading, hasProfile, refetchProfile, profile }),
      [session, loading, hasProfile, refetchProfile, profile]
  )

  return (
      <AuthContext.Provider value={memo}>
        {children}
      </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);