import { supabase } from "../../supabase/supabase"

export const createNewProfile = async (firstName : string, lastName : string) : Promise<void> => {

    const user = supabase.auth.getUser ? (await supabase.auth.getUser()).data.user : null

    if (!user || !user.email) {
        throw new Error('No signed-in user found')
    }

    const { data:insertionData, error:insertionError } = await supabase
        .from('Profiles')
        .insert([
            {
                id: user.id,
                email: user.email,
                first_name: firstName,
                last_name: lastName,
            },
        ])
        .select()
        
    if (insertionError) throw console.error('Error creating profile: ', insertionError)
        
    console.log('Profile created successfully:', insertionData)
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