import { supabase } from "./supabase/supabaseInit.mjs"

export const createNewProfile = async (email : string, firstName : string, lastName : string) : Promise<void> => {

    const { data: { user } } = await supabase.auth.getUser()
    console.log(user)


}