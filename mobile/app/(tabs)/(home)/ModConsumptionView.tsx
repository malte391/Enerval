import MonthQuartalSwitch from "@/components/Buttons/Switches/CpMonthQuartalSwitch"
import Datafield from "@/components/Text/CpDataField"
import CpHeader1 from "@/components/Text/CpHeader1"
import CpHeader2 from "@/components/Text/CpHeader2"
import { getUsersMeters } from "@/model/Meters/meterHandling"
import { sumRecords } from "@/model/Records/recordAccumulation"
import {getAllRecordsOfAMeter, getAllRecordValuesOfAMeter} from "@/model/Records/recordHandling"
import { router } from "expo-router"
import { useEffect, useState } from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import CpModal from "@/components/Wrapper/CpModal";

const title = {
    ger: 'Verbrauch (historisch)'
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
                const recordsOfMeter = await getAllRecordValuesOfAMeter(meters[0].meter_number)
                const sum = sumRecords(recordsOfMeter)
                setTotalConsumption(sum)
            }
        }
        totalConsumption()

    },[])



    return(
        <CpModal title={title.ger}>
            <View style={styles.content}>
                <MonthQuartalSwitch value={dimension} onSwitch={() => setDimension(d => !d)}/>
                <View style={{borderWidth: 1, height: 200}}>
                    <CpHeader2 text="Placeholder graph"/>
                </View>
                <View style={styles.infoTextContainer}>
                    <Datafield label='Gesamtverbrauch: ' data={`${totalConsumption} kWh`} />
                </View>
            </View>
        </CpModal>
    )
}

const styles = StyleSheet.create({
    content: {flex: 1, gap: 12},
    infoTextContainer: {},
})