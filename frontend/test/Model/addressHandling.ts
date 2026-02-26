import 'dotenv/config';
import { createNewAdress } from "../../utils/Addresses/addressHandling"
import { supabase } from "../../supabase/supabase"

const testUser = {
    email: 'malte1771943596502@abc123.com',
    password: 'password456',
    firstName: 'Malte',
    lastName: 'Engel'
}

const testAddress = {
  country: "Germany",
  postalCode: "80331",
  city: "Munich",
  street: "Marienplatz",
  housenr: 1,
  additional: "2nd Floor, Apartment 5B",
  remarks: "Ring the bell labeled 'Schmidt'"
}

async function signIn () {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: testUser.email,
        password: testUser.password
    })
    if (error) throw new Error('Sign in failed: ' + error)
    console.log('Sign in successfull!')
}

async function testCreateNewAddressForSignedInUser() {
    await signIn()
    createNewAdress("Germany", "80331", "Munich", "Marienplatz", 1, "2nd Floor, Apartment 5B", "Ring the bell labeled 'Engel'")
}

testCreateNewAddressForSignedInUser()