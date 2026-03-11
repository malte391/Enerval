import { supabase } from "@/supabase/supabase";

export const validateRecord = (record: string): boolean => {
    const value = Number(record);
    return /^[0-9]{1,6}$/.test(record)
}   

export const appendRecord = (record : string) : string => {
    return record.padStart(6, '0')
}

export const checkThatMeterExistsInDB = async (meterNumber : string) : Promise<boolean> => {
    const { data: Meters, error } = await supabase
        .from('Meters')
        .select('*')
        .eq('meter_number', meterNumber)
        if(error) throw error
        return Object.keys(Meters).length !== 0
}