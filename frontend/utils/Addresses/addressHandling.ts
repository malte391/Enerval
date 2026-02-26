import { supabase } from "../../supabase/supabase"

export const createNewAdress = async (
    country : string, 
    postalCode : string, 
    city : string, 
    street : string, 
    housenr : number, 
    additional? : string, 
    remarks? : string) : Promise<void> => {

        const user = supabase.auth.getUser ? (await supabase.auth.getUser()).data.user : null

        if (!user || !user.email) {
            throw new Error('No signed-in user found')
        }

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

        if (error) throw console.error('Error when creating new Adress: ' + JSON.stringify(error))

        console.log('Address created successfully')

    } 

    //TODO
    const checkThatAddressDoesNotExistYet = async () => {

    }