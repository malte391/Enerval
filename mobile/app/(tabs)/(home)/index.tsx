import { View, Text, Pressable, StyleSheet, useWindowDimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import type { Href } from 'expo-router'
import TextSwoosh from '@/components/Brand/welcomeSwoosh'
import { supabase } from '@/supabase/supabasepublic'
import { getSignedInUser } from '@/supabase/auth'

const tiles: { label: string; route: Href }[] = [

]

const user = await getSignedInUser()
const userId: string = user.id
const {data: userName, error} = await supabase
.from('Profiles')
.select('first_name')
.eq('id', userId)

export default function HomeScreen() {

    const {width} = useWindowDimensions()

  return (
    <SafeAreaView>
        <View style={{width: width*0.78}}>
            <TextSwoosh text='Welcome to Enerval!'/>
        </View>
    </SafeAreaView>
)
}

const styles = StyleSheet.create({
})