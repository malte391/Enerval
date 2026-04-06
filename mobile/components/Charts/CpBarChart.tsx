import {StyleSheet, View} from "react-native";
import {BarChart} from 'react-native-gifted-charts';
import {RecordData} from "@/types";

type CpBarChartProps = {
    data: RecordData[]
}

export default function CpBarChart({data}: CpBarChartProps) {

    const maxValue = Math.max(...data.map(val => val.value)) + 10

    const styledData = data.map(item => ({
        ...item,
        frontColor: '#133862',
        topLabelTextStyle: {color: 'transparent'},
    }))

    return (
        <View style={styles.container}>
            <BarChart
                data={styledData}
                maxValue={maxValue}
                barWidth={16}
                spacing={10}
                barBorderRadius={1}
                noOfSections={8}
                yAxisThickness={0}
                xAxisThickness={0}
                yAxisTextStyle={styles.axisText}
                xAxisLabelTextStyle={styles.axisText}
                hideRules={false}
                rulesColor="#F0F0F0"
                rulesType="solid"
                backgroundColor="transparent"
                disablePress={true}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 0,
        marginBottom: 10,
    },
    axisText: {
        color: '#888',
        fontSize: 12,
    },
})