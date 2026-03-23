import { createNewRecord, getAllRecordsOfAMeter, getRecordsForMonth } from "@/model/Records/recordHandling";
import { signIn, testMeter } from "../../testData";

async function testUnavailableMeterNumber() {
    await signIn()
    createNewRecord('001234', 'sadhasj21')
}

async function testAvalableMeterNumber() {
    await signIn()
    createNewRecord('001234', testMeter)
}

async function testInvalidValue() {
    await signIn()
    createNewRecord('abswsd', testMeter)
}

async function testGetAllRecords() {
    await signIn()
    const records : Object = await getAllRecordsOfAMeter('asdadlk22')
    Object.values(records).forEach(record => {
        console.log(record.value);
    });
}

async function testGetMonthRecords() {
    const data = await getRecordsForMonth('09487mce', 3, 26)
    console.log(data)
}

testGetAllRecords()
