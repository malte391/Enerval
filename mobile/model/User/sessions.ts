import { supabase } from "@/supabase/supabasepublic";
import { AuthError, AuthResponse, Session } from "@supabase/supabase-js";


export const getSession = async () : Promise<Session|null> => {
    const {data, error} = await supabase.auth.getSession()
    return data.session?? null
}

export async function signUp(email: string, password: string) : Promise<AuthResponse> {
    return supabase.auth.signUp({ email, password })
}

export async function signIn(email: string, password: string) : Promise<AuthResponse> {
    return supabase.auth.signInWithPassword({ email, password });
}

export async function signOut() : Promise<{ error: AuthError | null }> {
    return supabase.auth.signOut()
}