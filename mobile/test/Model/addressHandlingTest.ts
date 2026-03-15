import 'dotenv/config';
import { createNewAdress } from "@/model/Addresses/addressHandling"
import { testUser, signIn } from '../testData';
import { checkThatCityExists } from '@/utils/addressValidation';

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
    createNewAdress("Germany", "80331", "München", "Marienplatz", '1', "Around the corner. Meter under the incoming stairs.'")
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


async function testCheckThatCityExists(city : string) {
    console.log(await checkThatCityExists(city))
}

testCreateNewAddressForSignedInUser()
