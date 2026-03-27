import { getSignedInUser } from "@/model/User/auth"
import { supabase } from "@/supabase/supabasepublic"
import { User } from "@supabase/supabase-js"
import { validateMeterInput } from "@/utils/meterValidation"
import { Database } from "@/database.types"

type Meter = Database['public']['Tables']['Meters']['Row']

export async function createNewMeter(meterNumber : string, name: string, locatedAt : string) : Promise<void> {
    
    try {
        const user : User = await getSignedInUser()

        const validation : boolean = await validateMeterInput(meterNumber, locatedAt)
        console.log(validation)

        if(validation) {
            const { data, error } = await supabase
                .from('Meters')
                .insert([{
                    meter_number: meterNumber,
                    name: name,
                    belongs_to: user.id,
                    location: locatedAt
                }])
    
            if(error) {throw new Error('Error inserting meter in DB' +  JSON.stringify(error))}
                else {console.log('New meter created successfully')}
        }
    } catch (e) {
        throw new Error('Error creating new meter: ' + e)     
    }
} 

export async function getUsersMeters() : Promise<Pick<Meter, 'meter_number'>[]> {
    const user = await getSignedInUser()
    console.log(user)

    const { data: Meters, error } = await supabase
        .from('Meters')
        .select('meter_number')
        .eq('belongs_to', user?.id)

    if(error) throw new Error('Error getting users Meters')
    return Meters
}



