import { router } from "expo-router";
import {useEffect, useState} from "react";
import {KeyboardAvoidingView, ScrollView, StyleSheet, Text, View, Platform} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import CpRecordInput from "@/components/Input/CpRecordInput";
import {inspect} from "node:util";
import CpHeaderSwoosh from "@/components/Text/CpHeaderSwoosh";
import CpHeader2 from "@/components/Text/CpHeader2";
import CpSubHeader from "@/components/Text/CpSubHeader";
import CpSubTitle from "@/components/Text/CpSubTitle";
import {ProfileContextType, useProfile} from "@/context/ProfileContext";
import CpRecordSubmitButton from "@/components/Buttons/CpRecordSubmitButton";
import {createNewRecord, getMetersLatestRecord} from "@/model/Records/recordHandling";
import {Meter, Records} from "@/types";
import {recordAsNumber} from "@/utils/recordConvert";
import {validateRecord} from "@/utils/energyRecordValidator";

const title = {
    ger: 'Zählerstand eingeben'
}

const subtitle = {
    ger: 'Gib hier deinen aktuellen Zählerstand ohne Nachkommastelle ein'
}

const successMessage = {
    ger: 'Zählerstand gespeichert!'
}

export default function ScanView() {
    const [record, setRecord] = useState<string>('');
    const { meters, refetchRecords } = useProfile()
    const [selectedMeter, setSelectedMeter] = useState<string>(meters[0]?.meter_number?? "")
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [selected, setSelected] = useState<boolean>(false);

    async function handleSubmit(){
        setLoading(true);
        const latestRecord = await getMetersLatestRecord(selectedMeter)
        if (latestRecord >= recordAsNumber(record)) {
            setMessage('Neuer Zählerstand kann nicht geringer sein als dein letzter!')
            setLoading(false)
            return
        }
            else if (!validateRecord(record)) {
                setMessage('Unzulässiger Zählerstand!')
                setLoading(false)
                return
            }
                else {
                    await createNewRecord(record, selectedMeter)
                    refetchRecords()
                    setMessage(successMessage.ger)
                    setLoading(false)
                }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView contentContainerStyle={styles.container}>
                    <CpHeaderSwoosh line1={title.ger} />
                    <View style={styles.meterSelection}>
                        <Text>{`Zähler: ${meters[0]?.meter_number?? ""}`}</Text>
                    </View>
                    <View style={styles.view}>
                        <CpSubTitle text={subtitle.ger} />
                        <CpRecordInput value={record} onFocus={() => setSelected(() => true)} onBlur={() => setSelected(() => false)} onChange={setRecord} />
                        {message && <CpSubTitle text={message}/> }
                    </View>
                </ScrollView>
                <View style={styles.submit}>
                    {selected && <CpRecordSubmitButton onSubmit={() => handleSubmit()} loading={loading}/>}
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: { marginTop: 40, gap: 30 },
    meterSelection: { paddingHorizontal: 30 },
    view: { flex: 1, alignItems: 'center' },
    submit: { paddingHorizontal: 30, paddingBottom: 15, alignItems: 'flex-end' },
})