import 'dotenv/config';
import { createNewProfile } from '../utils/User/userHandling';
import { supabase, supabaseadmin } from './supabase';


async function main() {
    const { data, error } = await supabase
        .from('Users')
        .insert({ email: 'test@abc123', first_name: 'Malte', last_name: 'Engel' })

    if (error) {
        console.error('Insert error:', error)
    } else {
        console.log('Insert successful:', data)
    }
}

async function register() {

    const myEmail = `malte${Date.now()}@abc123.com`
    const myPassword = 'password456'

    const { data: { user, session }, error:signUpError } = await supabase.auth.signUp( {
        email:myEmail,
        password: myPassword
    })

    if (signUpError) return console.error('Sign in Error: ', signUpError)
    console.log('New user ID: ', user?.id)
    const userId = user?.id

    const { data:signInData, error:signInError } = await supabase.auth.signInWithPassword({
        email: myEmail,
        password: myPassword
    })
    if (signInError) return console.error('Fehler beim Sign-In: ' + signInError)
    console.log('Sign In successfull!')

    if (!signInError) {
        const { data, error:profileError } = await supabaseadmin
        .from('Profiles')
        .insert([
            { id: userId, email: myEmail, first_name: 'malte', last_name: 'engel' }
        ])
        if (profileError) {
            return console.error('Error when creating Profile: ' + JSON.stringify(profileError))
        }
        console.log('Profile created successfullly for user id ' + userId)
    }

}


