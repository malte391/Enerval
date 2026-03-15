import SubmitButton from "@/components/Buttons/loginButton";
import CredentialInput from "@/components/Input/credentialInput";
import { useAuth } from "@/context/AuthContext";
import { provideCityByPostalCode } from "@/model/Addresses/addressAPI";
import { createNewAdress } from "@/model/Addresses/addressHandling";
import { createNewProfile } from "@/model/User/userHandling";
import { supabase } from "@/supabase/supabasepublic";
import { validatePostalCode } from "@/utils/addressValidation";
import { guessFirstName, guessLastName } from "@/utils/checkIn";
import { useEffect, useState } from "react";
import { Image, StyleSheet, useWindowDimensions, View, Text, ScrollView, KeyboardAvoidingView, Platform } from "react-native";


const welcomeTextEngl = {
    header: 'Welcome to Enerval! ',
    body: 'Complete below information to get started tracking your consumption.'
}

const welcomeTextGer = {
    header: 'Willkommen bei Enerval!',
    body: 'Erstelle dir ein Profil und erhalte überblick über deinen Energieverbrauch!'
}

const labelsGer = {
    fn: 'Vorname',
    ln: 'Nachname',
    postal: 'Postleitzahl',
    city: 'Stadt',
    str: 'Straße',
    nr: 'Hausnummer',
    remarks: 'Bemerkung',
    meter: 'Zählernummer',
    meterName: 'Gib deinem Zähler einen Namen!',
}

const placeholderGer = {
    fn: 'Vorname',
    ln: 'Nachname',
    postal: 'Postleitzahl',
    city: 'Stadt',
    str: 'Straße',
    nr: 'Hausnummer',
    remarks: 'Bemerkung',
    meter: 'Zählernummer',
    meterName: 'z.B. Strom, Tagstrom, Heizung, ...',
}


export default function CheckIn() {
    const {session} = useAuth()
    const mail = session?.user.email
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [country, setCountry] = useState<string>('Germany')
    const [postalCode, setPostalCode] = useState<string>('')
    const [city, setCity] = useState<string>('')
    const [street, setStreet] = useState<string>('')
    const [houseNr, setHouseNr] = useState<string>('')
    const [remarks, setRemarks] = useState<string>('')
    const [meter, setMeter] = useState<string>('')
    const [meterName, setMeterName] = useState<string>('')

    const {width} = useWindowDimensions()

    async function handleSubmit() : Promise<void>{
        try {
            await createNewProfile(firstName, lastName)
            await createNewAdress(country, postalCode, city, street, houseNr, remarks)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!mail) return
        setFirstName(() => mail ? guessFirstName(mail) : '')
        setLastName(() => mail ? guessLastName(mail) : '')
    }, [mail])

    useEffect(() => {
        const fetchCity = async () => {
            const cityByPostalCode = await provideCityByPostalCode(postalCode)
            setCity(cityByPostalCode ?? '')
        }

        if(validatePostalCode(postalCode)) fetchCity()
    }, [postalCode])

      return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView style={styles.scroll}
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
            >
            <View style={styles.logoView}>
                <Image source={require('../assets/images/logo.png')} 
                style={{width: width * 0.7,
                height: width * 0.14
                }}
                resizeMode="contain"
                />
                <View style={styles.subheader}>
                    <Text style={[styles.subText, styles.subtextHead]}>{welcomeTextGer.header}</Text>
                    <Text style={styles.subText}>{welcomeTextGer.body}</Text>
                </View>
            </View>
            <View style={{width: width * 0.78}}>
                <View style={styles.grid}>
                    <View style={styles.nameInput}>
                        <CredentialInput label='Vorname' value={firstName} onChangeText={setFirstName} placeholder="Vorname"/>
                    </View>
                    <View style={styles.nameInput}>
                        <CredentialInput label='Vorname' value={lastName} onChangeText={setLastName} placeholder="Nachname"/>
                    </View>
                    <View style={styles.nameInput}>
                        <CredentialInput label={labelsGer.postal} value={postalCode} onChangeText={setPostalCode} placeholder={labelsGer.postal}/>
                    </View>
                    <View style={styles.nameInput}>
                        <CredentialInput label={labelsGer.city} value={city} onChangeText={setCity} placeholder={labelsGer.city}/>
                    </View>
                </View>
                <View style={styles.streetRow}>
                    <View style={{flex: 7}}>
                        <CredentialInput label={labelsGer.str} value={street} onChangeText={setStreet} placeholder={labelsGer.str}/>
                    </View>
                    <View style={{flex: 3}}>
                        <CredentialInput label={labelsGer.nr} value={houseNr} onChangeText={setHouseNr} placeholder={labelsGer.nr}/>
                    </View>

                </View>
                <View style={styles.inputRows}>
                    <CredentialInput label={labelsGer.remarks} value={remarks} onChangeText={setRemarks} placeholder={labelsGer.remarks}/>
                    <CredentialInput label={labelsGer.meter} value={meter} onChangeText={setMeter} placeholder={labelsGer.meter}/>
                    <CredentialInput label={labelsGer.meterName} value={meterName} onChangeText={setMeterName} placeholder={labelsGer.meterName}/>
                </View>
                <View style={styles.submit}>
                    <SubmitButton label='Profil erstellen' onPress={handleSubmit}/>
                </View>
            </View>
        </ScrollView>  
        </KeyboardAvoidingView>
      );
}
    
    export const styles = StyleSheet.create({
        scroll: {flex: 1, backgroundColor: '#DDFF00'},
        container: { alignItems:'center', gap: 30, padding: 14, backgroundColor: '#DDFF00', paddingBottom: 120 },
        logoView: {alignItems: 'center', marginTop: 180, gap: 20, width: 360},
        subheader: {alignItems: 'center', width: '100%', gap: 4},
        subText: {width: '100%', textAlign: 'center', fontSize: 18, fontWeight: '400'},
        subtextHead: {fontWeight: '600', textDecorationLine: 'underline', fontSize: 20},
        grid: {flexDirection: 'row', flexWrap: 'wrap', columnGap: 12, rowGap: 4, width: '100%', marginBottom: 4},
        streetRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, width: '100%', marginBottom: 4 },
        nameInput: {width: '48%'},
        inputRows: {width: '100%', gap: 4, marginBottom: 12 },
        submit: {width: '100%'}
    });
