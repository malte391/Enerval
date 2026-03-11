import { getSignedInUser } from "@/supabase/auth";
import { supabase } from "@/supabase/supabase";
import { appendRecord, checkThatMeterExistsInDB, validateRecord } from "@/utils/energyRecordValidator";

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

export const getAllRecordsOfAMeter = async (meterNumber : string) : Promise<any> => {
    const userId = (await getSignedInUser()).id

    if(await checkThatMeterExistsInDB(meterNumber)) {
        const {data: Records, error } = await supabase
            .from('Records')
            .select('value')
            .eq('created_by', userId)
            .eq('meter', meterNumber)
        if(error) throw new Error(`Error getting records for user ${userId}`)
        return Records
    }
    else throw new Error('Meter does not exist')
}