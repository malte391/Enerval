import 'dotenv/config';
import { createNewProfile } from '../../utils/User/userHandling.ts';
import { supabase } from '../../supabase/supabase.ts';

const user = {
    email: 'malte1771943596502@abc123.com',
    password: 'password456',
    firstName: 'Malte',
    lastName: 'Engel'
}


async function signIn () {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: user.password
    })
    if (error) throw console.error('Sign in failed: ', error)
    console.log('Sign in successfull!')
}

async function testSignInAndCreationOfProfile () {
    await signIn()
    await createNewProfile(user.firstName,user.lastName)
}

testSignInAndCreationOfProfile()