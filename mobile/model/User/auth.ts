import { User } from "@supabase/supabase-js"
import { supabase } from "../../supabase/supabasepublic"


export const getSignedInUser = async () : Promise<User|null> => {
    const { data : { user } } = await supabase.auth.getUser()
    return user
}
