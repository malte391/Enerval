import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native'
import { WIDTH, GAP, GRID_PADDING, TILE_WIDTH, TILE_HEIGHT } from '@/contants/tileConstants'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import type { Href } from 'expo-router'
import TextSwoosh from '@/components/Text/welcomeSwoosh'
import { supabase } from '@/supabase/supabasepublic'
import { getSignedInUser } from '@/supabase/auth'
import { useEffect, useState } from 'react'
import MonthlyConsumptionTile from '@/components/Tiles/monthlyConsumtionTile'
import { useAuth } from '@/context/AuthContext'

const tiles: { label: string; route: Href }[] = [

]


export default function HomeScreen() {

    const {profile} = useAuth()
    const {session} = useAuth()
    const [firstName, setFirstName] = useState<string | null>(null)

    useEffect(() => {
        if (!profile) return
        setFirstName(profile.first_name)
        console.log(profile.first_name)
    }, [session, profile])


  return (
    <SafeAreaView 
        style={styles.root}
        edges={['top']}
    >
        <ScrollView style={{flex: 1}} contentContainerStyle={styles.view}>
            <View style={styles.swoosh}>
                {firstName && <TextSwoosh line1={`Welcome to Enerval,`} line2={`${firstName}!`}/>}
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
    root: {flex: 1, backgroundColor: '#efefef'},
    view: {width: '100%', gap: 50, marginTop: 44 },
    swoosh: {paddingLeft: 20, paddingRight: 20},
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