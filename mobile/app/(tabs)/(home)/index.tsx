import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native'
import { WIDTH, GAP, GRID_PADDING, TILE_WIDTH, TILE_HEIGHT } from '@/app/contants/tileConstants'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import type { Href } from 'expo-router'
import TextSwoosh from '@/components/Brand/welcomeSwoosh'
import { supabase } from '@/supabase/supabasepublic'
import { getSignedInUser } from '@/supabase/auth'
import { useEffect, useState } from 'react'
import MonthlyConsumptionTile from '@/components/Tiles/monthlyConsumtionTile'

const tiles: { label: string; route: Href }[] = [

]


export default function HomeScreen() {

    const [firstName, setFirstName] = useState<string | null>(null)
    
    async function  getFirstName() : Promise<string | null> {
        const user = await getSignedInUser()
        const userId: string = user.id
        const {data: userName, error} = await supabase
        .from('Profiles')
        .select('first_name')
        .eq('id', userId)
        .single<{ first_name: string }>()

        return userName?.first_name ?? null
    }

    useEffect(() => {
        getFirstName().then(name => setFirstName(name))
    }, [])


  return (
    <SafeAreaView 
        style={styles.root}
        edges={['top']}
    >
        <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
            <View style={styles.swoosh}>
                <TextSwoosh line1={`Welcome to Enerval ${firstName ? `,` : ''}`} line2={`${firstName ? `${firstName}!` : null}`}/>
            </View>
            <View style={styles.gridWrapper}>
                <View style={styles.grid}>
                    <View style={styles.tileWrapper}>
                        <MonthlyConsumptionTile />
                    </View>
                    <View>
                        <MonthlyConsumptionTile />
                    </View>
                    <View>
                        <MonthlyConsumptionTile />
                    </View>
                    <View>
                        <MonthlyConsumptionTile />
                    </View>
                </View>

            </View>
        </ScrollView>
    </SafeAreaView>

)
}

const styles = StyleSheet.create({
    root: {flex: 1},
    container: {width: '100%', gap: 50, marginTop: 44 },
    swoosh: {paddingLeft: 20, paddingRight: 50},
    gridWrapper: {
        alignItems: 'center',
        width: '100%',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: GAP,
        width: '100%',
        paddingHorizontal: GRID_PADDING
    },
    tileWrapper: {marginBottom: 4}
})