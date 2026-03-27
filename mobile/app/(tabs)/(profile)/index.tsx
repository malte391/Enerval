import {View, Text, StyleSheet, ScrollView} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CpHeaderSwoosh from "@/components/Text/CpHeaderSwoosh";
import {useEffect, useState} from "react";
import {useAuth} from "@/context/AuthContext";
import CpHeader2 from "@/components/Text/CpHeader2";
import CpMenuButton from "@/components/Buttons/Settings/CpMenuButton";


export default function ProfileScreen() {

    const [firstName, setFirstName] = useState<String>()
    const {profile} = useAuth()

    useEffect(() => {
        if (!profile) return
        setFirstName(profile.first_name)
    }, []);

    return (
    <SafeAreaView style={styles.root}>
        <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
            <CpHeaderSwoosh line1='Profile' />
            <View style={styles.view}>
                <CpHeader2 text={firstName}/>
                <CpMenuButton icon='IconMeter' label='Zähler verwalten' onPress={() => console.log('pressed')} />
            </View>
        </ScrollView>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    root: {flex: 1, backgroundColor: '#efefef'},
    container: {gap: 40, marginTop: 40 },
    view: {alignItems: 'center', gap: 15, paddingHorizontal: 30},
})