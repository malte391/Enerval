import { Database } from "@/database.types"
import { getSignedInUser } from "@/model/User/auth"
import { supabase } from "@/supabase/supabasepublic"
import { User } from "@supabase/supabase-js"


export const createNewProfile = async (firstName : string, lastName : string) : Promise<void> => {
    try {
        const user : User = await getSignedInUser()
        const { data:insertionData, error:insertionError } = await supabase
            .from('Profiles')
            .insert([
                {
                    id: user.id,
                    email: user?.email,
                    first_name: firstName,
                    last_name: lastName,
                },
            ])
            .select()
            
        if (insertionError) throw new Error('Error creating profile: ', insertionError)
            else console.log('Profile created successfully:', insertionData)
    } catch (e) {
        throw new Error('Error creating new Profile' + e)
    }
}

export const checkProfileExists = async (userId: string) : Promise<boolean> => {
    const {data, error} = await supabase
      .from('Profiles')
      .select('id')
      .eq('id', userId)
      .single();

      if (error) return false
    return data !== null
}


//TODO
export const updateFirstName = async (firstName : string) : Promise<void> => {

}

//TODO
export const updateLastName = async (lastName : string) : Promise<void> => {

}

//TODO
const checkUserNameConventions = (firstName : string, secondName : string) : boolean => {
    return true
}

