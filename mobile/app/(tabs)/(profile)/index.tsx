import {View, Text, StyleSheet, ScrollView} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CpHeaderSwoosh from "@/components/Text/CpHeaderSwoosh";
import {useEffect, useState} from "react";
import {useAuth} from "@/context/AuthContext";
import CpHeader2 from "@/components/Text/CpHeader2";
import CpMenuButton from "@/components/Buttons/Settings/CpMenuButton";
import CpSubHeader from "@/components/Text/CpSubHeader";
import {router} from "expo-router";
import {signOut} from "@/model/User/sessions";

export default function ProfileScreen() {

    const {profile} = useAuth()

    return (
    <SafeAreaView style={styles.root}>
        <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
            <CpHeaderSwoosh line1='Profile' />
            <View style={styles.view}>
                <View style={styles.subhead}>
                    <CpHeader2 text={profile?.first_name ?? ''}/>
                    <CpSubHeader text={profile?.email ?? ''} />
                </View>
                <CpMenuButton icon='user' label='Deine Daten anpassen' onPress={() => router.push('/ModSetUser')} />
                <CpMenuButton icon='contract' label='Verträge verwalten' onPress={() => router.push('/ModSetContracts')} />
                <CpMenuButton icon='meter' label='Zähler verwalten' onPress={() => router.push('/ModSetMeters')} />
            </View>
            <View style={[styles.bottom, styles.view]}>
                <CpMenuButton icon='signOut' label='Abmelden' onPress={() => signOut()} iconColor={'darkred'} fontColor={'darkred'} />
            </View>
        </ScrollView>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    root: {flex: 1, backgroundColor: '#efefef'},
    container: {gap: 40, marginTop: 40 },
    view: {alignItems: 'center', gap: 25, paddingHorizontal: 35},
    subhead: {alignItems: 'center'},
    bottom: {marginTop: 50},
})