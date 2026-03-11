import { User } from "@supabase/supabase-js"
import { supabase } from "../../supabase/supabase"
import { authentificateAddress } from "../../utils/addressValidation"
import { getSignedInUser } from "@/supabase/auth"

export async function createNewAdress( 
    country : string, 
    postalCode : string, 
    city : string, 
    street : string, 
    housenr : number, 
    additional? : string, 
    remarks? : string) : Promise<void> {
        
        try {
            const user : User = await getSignedInUser()
            await authentificateAddress(country, postalCode, city, street, housenr)
            const { data, error } = await supabase
                .from('Addresses')
                .insert([
                    {
                        country: country,
                        postal_code: postalCode,
                        city: city,
                        street: street,
                        house_nr: housenr,
                        additional: additional,
                        remarks: remarks,
                        belongs_to: user.id
                    },
                ])
                .select()
    
            if (error) {throw new Error(error.message)}
                else {console.log('Address created successfully')}
        } catch (e) {
           throw new Error('Error when creating new Adress: ' + e)
        }
    } 

export async function getSignedInUsersAddresses() {
    const userId = (await getSignedInUser()).id

    const { data: Addresses, error } = await supabase
        .from('Addresses')
        .select('country, postal_code, city, street, additional')
        .eq('belongs_to', userId)
    if(error) throw new Error('Error getting users address')
    return Addresses
}


