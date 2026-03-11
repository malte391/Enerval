import 'dotenv/config';
import { createNewAdress, getSignedInUsersAddresses } from "@/model/Addresses/addressHandling"
import { supabase } from "../../supabase/supabase"
import { testUser, signIn } from '../testData';

const testAddress = {
  country: "Germany",
  postalCode: "80331",
  city: "Munich",
  street: "Marienplatz",
  housenr: 1,
  additional: "2nd Floor, Apartment 5B",
  remarks: "Ring the bell labeled 'Schmidt'"
}

async function testCreateNewAddressForSignedInUser() {
    await signIn()
    createNewAdress("Germany", "80331", "München", "Marienplatz", 1, "b", "Around the corner. Meter under the incoming stairs.'")
}

async function testOpenStreetMapApi(postalCode:string) {
    try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?postalcode=${postalCode}&country=Germany&format=json&limit=1`);
        const data = await res.json();
        console.log(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

async function testGetAddresses(){
    await signIn()
    const addresses = await getSignedInUsersAddresses()
    console.log(addresses)
}

testGetAddresses()
