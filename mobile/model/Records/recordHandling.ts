import { getSignedInUser } from "@/model/User/auth";
import { supabase } from "@/supabase/supabasepublic";
import {RecordData, Records} from "@/types";
import { appendRecord, checkThatMeterExistsInDB, validateRecord } from "@/utils/energyRecordValidator";
import { sumTotalConsumption } from "./recordAccumulation";
import {recordAsNumber} from "@/utils/recordConvert";

export async function createNewRecord(value : string, meterNumber : string) {
    
    const user = await getSignedInUser()
    if(!user) throw new Error("not able to get signed in user")

    try {
        await checkThatMeterExistsInDB(meterNumber)
        
        if (validateRecord(value)) {
            const record = appendRecord(value)
    
            const { error } = await supabase
                .from('Records')
                .insert([{
                    created_by: user.id,
                    meter: meterNumber,
                    value: record
                }])
            if(!error) console.log('Record inserted successfully')
        }
        else console.log('Invalid record value')
    } catch (error) {
        throw new Error('Error creating new Record: ' + error)
    }
}

export const getAllRecordsOfAMeter = async (meterNumber : string) :
    Promise<Pick<Records, 'value' | 'created_at' | 'meter'>[]> => {
    if(await checkThatMeterExistsInDB(meterNumber)) {
        const {data: Records, error } = await supabase
            .from('Records')
            .select('value, created_at, meter')
            .eq('meter', meterNumber)
        if(error) throw new Error(`Couldn't get records`)
        return Records
    }
    else throw new Error('Meter does not exist')
}

export const getAllRecordValuesOfAMeter = async (meterNumber : string) :
    Promise<Pick<Records, 'value'>[]> => {
    if(await checkThatMeterExistsInDB(meterNumber)) {
        const {data: Records, error } = await supabase
            .from('Records')
            .select('value')
            .eq('meter', meterNumber)
        if(error) throw new Error(`Couldn't get records`)
        return Records
    }
    else throw new Error('Meter does not exist')
}

export const getRecordsForMonth = async(meter: string, month: number, year: number): Promise<{ value: string }[]> => {
  const start = new Date(year, month - 1, 1).toISOString()
  const end = new Date(year, month, 1).toISOString()

  const { data: Records, error } = await supabase
    .from('Records')
    .select('value')
    .eq('meter', meter)
    .gte('created_at', start)
    .lt('created_at', end)

  if (error) throw error
  return Records
}

export const getRecordsForQuartal = async (
    meter: string,
    quartal: 1 | 2 | 3 | 4,
    year: number
    ): Promise<{ value: string }[]> => {
    const startMonth = (quartal - 1) * 3
    const start = new Date(year, startMonth, 1).toISOString()
    const end = new Date(year, startMonth + 3, 1).toISOString()

    const { data: Records, error } = await supabase
        .from('Records')
        .select('value')
        .eq('meter', meter)
        .gte('created_at', start)
        .lt('created_at', end)

    if (error) throw error
    return Records
}

export const getConsumptionForMonth = async(meter: string, month: number, year: number) : Promise<number> => {
    const records = await getRecordsForMonth(meter, month, year)
    return sumTotalConsumption(records)
}

export const getConsumptionPerMonth = async(meter: string, month: number, year: number) : Promise<number> => {
    const prevMonth = month - 1 === 0 ? 12 : month - 1
    const prevYear = month - 1 === 0 ? year - 1 : year

    const prevRecords = await getRecordsForMonth(meter, prevMonth, prevYear)
    const currentRecords = await getRecordsForMonth(meter, month, year)

    if (currentRecords.length === 0) return 0

    const lastCurrent = recordAsNumber(currentRecords[currentRecords.length - 1].value)

    if (prevRecords.length === 0) {
        const firstCurrent = recordAsNumber(currentRecords[0].value)
        return lastCurrent - firstCurrent
    }

    const lastPrev = recordAsNumber(prevRecords[prevRecords.length - 1].value)
    return lastCurrent - lastPrev
}

export const getSumOfRecordsForQuartal = async(
    meter: string,
    quartal: 1 | 2 | 3 | 4,
    year: number
    ) => {
        const records = await getRecordsForQuartal(meter, quartal, year)
        return sumTotalConsumption(records)
    }

export const getMetersLatestRecord = async (meterNr: string) : Promise<number> => {
    const {data: Records} = await supabase
        .from('Records')
        .select('value')
        .eq('meter', meterNr)

    if(!Records || Records.length == 0) return 0
    return Math.max(...Records.map(r => recordAsNumber(r.value)))
}

export const getConsumptionDataPerMonthForYear = async (meter: string, year: number) : Promise<RecordData[]> => {
    const months: {number: number, letter: string}[] = [
        {number: 1,  letter: 'J'},
        {number: 2,  letter: 'F'},
        {number: 3,  letter: 'M'},
        {number: 4,  letter: 'A'},
        {number: 5,  letter: 'M'},
        {number: 6,  letter: 'J'},
        {number: 7,  letter: 'J'},
        {number: 8,  letter: 'A'},
        {number: 9,  letter: 'S'},
        {number: 10, letter: 'O'},
        {number: 11, letter: 'N'},
        {number: 12, letter: 'D'},
    ]
    const result = await Promise.all(
        months.map(async (month) => ({
            value: await getConsumptionPerMonth(meter, month.number, year),
            label: month.letter
        }))
    )
    console.log(result)
    return result
}

