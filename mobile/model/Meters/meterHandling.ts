import { getSignedInUser } from "@/supabase/auth"
import { supabase } from "@/supabase/supabase"
import { User } from "@supabase/supabase-js"
import { checkLocationExistsInDB } from "@/utils/locations"
import { validateMeterInput } from "@/utils/meterValidation"

export async function crteateNewMeter(meterNumber : string, locatedAt : string) : Promise<void> {
    
    try {
        const user : User = await getSignedInUser()

        validateMeterInput(meterNumber, locatedAt)
        const { data, error } = await supabase
            .from('Meters')
            .insert([{
                meter_number: meterNumber,
                belongs_to: user.id,
                location: locatedAt
            }])

        if(error) {throw new Error(error.message)}
            else {console.log('New meter created successfully')}

    } catch (e) {
        throw new Error('Error creating new meter: ' + e)     
    }
} 




