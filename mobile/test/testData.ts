import { supabase } from "@/supabase/supabase"

export const testUser = {
    email: 'malte1771943596502@abc123.com',
    password: 'password456',
    firstName: 'Malte',
    lastName: 'Engel'
}

export async function signIn () {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: testUser.email,
        password: testUser.password
    })
    if (error) throw new Error('Sign in failed: ' + error)
    console.log('Sign in successfull!')
}