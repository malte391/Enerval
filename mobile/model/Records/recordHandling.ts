import { Database } from "@/database.types";
import { getSignedInUser } from "@/supabase/auth";
import { supabase } from "@/supabase/supabasepublic";
import { recordAsNumber } from "@/utils/recordConvert";

import { appendRecord, checkThatMeterExistsInDB, validateRecord } from "@/utils/energyRecordValidator";
import { sumRecords } from "./recordAccumulation";

type Record = Database['public']['Tables']['Records']['Row']

export async function createNewRecord(value : string, meterNumber : string) {
    
    const user = await getSignedInUser()

    try {
        await checkThatMeterExistsInDB(meterNumber)
        
        if (validateRecord(value)) {
            const record = appendRecord(value)
    
            const { data: Records, error } = await supabase
                .from('Records')
                .insert([{
                    created_by: user.id,
                    meter: meterNumber,
                    value: record
                }])
            if(!error) console.log('Record inserted successfully')
            if (error) throw new Error('Error materializing the new record.')
        }
        else throw new Error('Invalid record value')
    } catch (error) {
        throw new Error('Error creating new Record: ' + error)
    }
}

export const getAllRecordsOfAMeter = async (meterNumber : string) : Promise<{ value: string }[]> => {
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

export const getSumOfRecordsForMonth = async(meter: string, month: number, year: number) : Promise<number> => {
    const records = await getRecordsForMonth(meter, month, year)
    return sumRecords(records)
}

export const getSumOfRecordsForQuartal = async(
    meter: string,
    quartal: 1 | 2 | 3 | 4,
    year: number
    ) => {
        const records = await getRecordsForQuartal(meter, quartal, year)
        return sumRecords(records)
    }

