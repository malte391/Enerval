import { checkLocationExistsInDB } from "@/utils/locations";
import { signIn } from "../testData";
import { createNewMeter, getUsersMeters } from "@/model/Meters/meterHandling";

async function createNewMeterTest() {
    await signIn()
    const meterNumber = Date.now().toString().slice(8, 13) + 'mce'
    createNewMeter(meterNumber, '4b05a7be-deb9-45e9-9c9a-e899bb2a66c0')
}

async function getUsersMetersTest() {
    await signIn()
    const meters = await getUsersMeters()
    console.log(meters)
}

getUsersMetersTest()