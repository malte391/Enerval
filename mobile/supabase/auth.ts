import { User } from "@supabase/supabase-js"
import { supabase } from "./supabasepublic"


export const getSignedInUser = async () : Promise<User> => {
    const { data : { user } } = await supabase.auth.getUser()
    if (!user) {throw new Error('User not signed in properly')}
    return user
}