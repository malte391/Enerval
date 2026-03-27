import MonthQuartalSwitch from "@/components/Buttons/Switches/CpMonthQuartalSwitch"
import Datafield from "@/components/Text/CpDataField"
import CpHeader1 from "@/components/Text/CpHeader1"
import CpHeader2 from "@/components/Text/CpHeader2"
import { getUsersMeters } from "@/model/Meters/meterHandling"
import { sumRecords } from "@/model/Records/recordAccumulation"
import { getAllRecordsOfAMeter } from "@/model/Records/recordHandling"
import { router } from "expo-router"
import { useEffect, useState } from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const header = {
    german: 'Verbrauch (historisch)'
}

export default function ModConsumptionView() {

    const [dimensionSelected, setDimensionSelected] = useState<'m'|'q'>('m')
    const monthDimensionSelected = dimensionSelected == 'm'
    const quartalDimensionSelected = dimensionSelected == 'q'
    const [dimension, setDimension] = useState<boolean>(dimensionSelected == 'm')
    const [selectedMeter, setSelectedMeter] = useState<string>('')
    const [totalConsumption, setTotalConsumption] = useState<number>(0)
    

    useEffect(() => {
        async function totalConsumption() {
            const meters = await getUsersMeters()
            console.log(meters)
            if (meters && meters.length != 0) {
                const recordsOfMeter = await getAllRecordsOfAMeter(meters[0].meter_number)
                const sum = sumRecords(recordsOfMeter)
                setTotalConsumption(sum)
            }
        }
        totalConsumption()

    },[])



    return(
        <SafeAreaView style={styles.root}>
            <ScrollView style={{flex: 1}} contentContainerStyle={styles.scroll}>
                <CpHeader1 text={header.german} />
                <View style={styles.content}>
                    <MonthQuartalSwitch value={dimension} onSwitch={() => setDimension(d => !d)}/>
                    <View style={{borderWidth: 1, height: 200}}>
                        <CpHeader2 text="Placeholder graph"/>
                    </View>
                    <View style={styles.infoTextContainer}>
                        <Datafield label='Gesamtverbrauch: ' data={`${totalConsumption} kWh`} />
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    root: {flex: 1, padding: 20},
    scroll: {gap: 18},
    content: {flex: 1, gap: 12},
    infoTextContainer: {},
})