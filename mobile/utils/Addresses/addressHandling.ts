import { supabase } from "../../supabase/supabase"
import { checkThatCityExists, validatePostalCode } from "./addressValidation"

export const createNewAdress = async (
    country : string, 
    postalCode : string, 
    city : string, 
    street : string, 
    housenr : string, 
    additional? : string, 
    remarks? : string) : Promise<void> => {

        const user = supabase.auth.getUser ? (await supabase.auth.getUser()).data.user : null

        if (!user || !user.email) {
            throw new Error('No signed-in user found')
        }
        
        try {
            authentificateAddress(country, postalCode, city, street, housenr)
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
    
            console.log('Address created successfully')
        } catch (e) {
            console.log('Error when creating new Adress: ' + JSON.stringify(e))
        }
    } 

const authentificateAddress = async (country : string, 
    postalCode : string, 
    city : string, 
    street : string, 
    housenr : string, 
    additional? : string, 
    remarks? : string) : Promise<boolean> => {
        const validPostalCode : boolean = validatePostalCode(postalCode)
        const cityExists : boolean = await checkThatCityExists(city)
        if(!validPostalCode) {throw new Error('invalid postal code')}
        if(!cityExists) {throw new Error(`city ${city} could not be found`)}
        return validPostalCode && cityExists
}