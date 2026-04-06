import Datafield from "@/components/Text/CpDataField"
import { sumTotalConsumption } from "@/model/Records/recordAccumulation"
import { getConsumptionDataPerMonthForYear } from "@/model/Records/recordHandling"
import { useEffect, useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import CpModal from "@/components/Wrapper/CpModal";
import {useProfile} from "@/context/ProfileContext";
import {Meter, RecordData, Records} from "@/types";
import CpBarChart from "@/components/Charts/CpBarChart";
import LoadingView from "@/Views/LoadingView";

const title = {
    ger: 'Verbrauch (historisch)'
}

export default function ModConsumptionView() {

    const [totalConsumption, setTotalConsumption] = useState<number>(0)
    const [year, setYear] = useState<number>(new Date().getFullYear())
    const [chartData, setChartData] = useState<RecordData[]>([{value: 0, label: 'J'}])
    const [loading, setLoading] = useState<boolean>(true)

    const { meters, records } = useProfile()

    const [selectedMeter, setSelectedMeter] = useState<Pick<Meter, 'meter_number' | 'location'> | null>(meters[0]?? null)

    useEffect(() => {
        if (!selectedMeter) return
        setLoading(true)
        const recordsForSelectedMeter = records.filter(r => r.meter === selectedMeter.meter_number)
        Promise.all([
            getConsumptionDataPerMonthForYear(selectedMeter.meter_number, year)
        ]).then(([chartData]) => {
            setTotalConsumption(sumTotalConsumption(recordsForSelectedMeter.map(r => ({ value: r.value }))))
            setChartData(chartData)
            setLoading(false)
        })
    }, [selectedMeter, records])

    return(
        <CpModal title={title.ger}>
            {!loading ?
                <View style={styles.content}>
                    <CpBarChart data={chartData} />
                    <View style={styles.infoTextContainer}>
                        <Datafield label='Gesamtverbrauch: ' data={`${totalConsumption} kWh`} />
                    </View>
                </View>
                :
                <LoadingView />
            }

        </CpModal>
    )
}

const styles = StyleSheet.create({
    content: {flex: 1, gap: 12},
    infoTextContainer: {},
})