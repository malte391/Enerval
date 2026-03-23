import MonthQuartalSwitch from "@/components/Buttons/Switches/monthQuartalSwitch"
import Datafield from "@/components/Text/dataField"
import Header1 from "@/components/Text/header1"
import Header2 from "@/components/Text/header2"
import { router } from "expo-router"
import { useEffect, useState } from "react"
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const header = {
    german: 'Verbrauch (historisch)'
}

export default function ConsumptionView() {

    const [dimensionSelected, setDimensionSelected] = useState<'m'|'q'>('m')
    const monthDimensionSelected = dimensionSelected == 'm'
    const quartalDimensionSelected = dimensionSelected == 'q'
    const [dimension, setDimension] = useState<boolean>(dimensionSelected == 'm')

    return(
        <SafeAreaView style={styles.root}>
            <ScrollView style={{flex: 1}} contentContainerStyle={styles.scroll}>
                <View style={styles.header}>
                    <Header1 text={header.german} />
                </View>
                <View style={styles.content}>
                    <MonthQuartalSwitch value={dimension} onSwitch={() => setDimension(d => !d)}/>
                    <View style={{borderWidth: 1, height: 200}}>
                        <Header2 text="Placeholder graph"/>
                    </View>
                    <View style={styles.infoTextContainer}>
                        <Datafield label='Gesamtverbrauch: ' data='2.200 kWh' />
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    root: {flex: 1, padding: 20},
    scroll: {gap: 18},
    header: {paddingVertical: 20},
    content: {flex: 1, gap: 12},
    infoTextContainer: {},
})