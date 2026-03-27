import { checkLocationExistsInDB } from "@/utils/locations";
import { signIn } from "../testData";
import { createNewMeter, getUsersMeters } from "@/model/Meters/meterHandling";

async function createNewMeterTest() {
    await signIn()
    const meterNumber = Date.now().toString().slice(8, 13) + 'mce'
}

async function getUsersMetersTest() {
    await signIn()
    const meters = await getUsersMeters()
    console.log(meters)
}

getUsersMetersTest()