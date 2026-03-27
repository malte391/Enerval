import 'dotenv/config';
import { checkProfileExists, createNewProfile } from '@/model/User/userHandling';
import { supabase } from '@/supabase/supabasepublic';

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

async function testCheckProfileExitst(id: string) {
    const profileExists = await checkProfileExists(id)
    console.log(profileExists)
}

testCheckProfileExitst('2427c354-0c3b-442f-9cfa-ec23d4238df1')
