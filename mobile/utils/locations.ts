import { supabase } from "@/supabase/supabase"

export const checkLocationExistsInDB = async (id : string) : Promise<boolean> => {
    const { data: addresses, error } = await supabase
    .from('Addresses')
    .select('*')
    .eq('id', id)
    if(error) return false
    console.log(addresses)
    console.log(addresses !== null)
    return addresses !== null
}