import { checkLocationExistsInDB } from "@/utils/locations";
import { signIn } from "../testData";
import { crteateNewMeter } from "@/model/Meters/meterHandling";

async function createNewMeterTest(id : string, locatedAt : string) {
    await signIn()
    crteateNewMeter(id, locatedAt)
}

async function main() {
    const meterNumber = Date.now().toString().slice(8, 13) + 'mce'
    console.log(meterNumber)
    await createNewMeterTest(meterNumber, 'fc735ce3-921c-49c8-925f-89e6c876cab9')
}

main()