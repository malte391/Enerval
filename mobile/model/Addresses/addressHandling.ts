import { User } from "@supabase/supabase-js"
import { supabase } from "@/supabase/supabasepublic"
import { authentificateAddress } from "@/utils/addressValidation"
import { getSignedInUser } from "@/model/User/auth"
import {Address} from "@/types";

export async function createNewAddress(
    country : string, 
    postalCode : string, 
    city : string, 
    street : string, 
    housenr : string,  
    remarks? : string) : Promise<void> {

    const user = await getSignedInUser()
    if (!user) {throw new Error('User missing')}
    try {
        await authentificateAddress(country, postalCode, city, street, housenr)
    } catch (e) {
       throw new Error('Error when creating new Address: ' + e)
    }
    const { error } = await supabase
        .from('Addresses')
        .insert([
            {
                country: country,
                postal_code: postalCode,
                city: city,
                street: street,
                house_nr: housenr,
                remarks: remarks,
                belongs_to: user!.id
            },
        ])
        .select()

    if (error) {throw new Error(error.message)}
    else {console.log('Address created successfully')}
    } 

export async function getUsersAddress() : Promise<Address> {

    const user = await getSignedInUser()
    if (!user) {throw new Error('User missing')}

    const { data: Address, error } = await supabase
        .from('Addresses')
        .select('*')
        .eq('belongs_to', user!.id)
        .single()
    if(error) throw new Error('Error getting users address')
    return Address
}


