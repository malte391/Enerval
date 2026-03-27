import { getAllRecordsOfAMeter } from "@/model/Records/recordHandling";
import { useState } from "react"
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";

type MonthQuartalSwitchPropTypes = {
    value: boolean;
    onSwitch: () => void;
}

const {width} = Dimensions.get('window')

export default function MonthQuartalSwitch({value, onSwitch} : MonthQuartalSwitchPropTypes) {

    const monthSelected = value
    const quartalSelected = !value


    return(
        <View style={styles.container}>
            <Pressable style={[styles.button, {
                    backgroundColor : monthSelected ? 'hsla(0, 0%, 69%, 0.50)' : 'hsla(60, 2%, 88%, 0.88)',
                    borderWidth: monthSelected ? 1 : 0
                }]}
                onPress={onSwitch}>
                <Text style={[styles.text, {
                    fontWeight: monthSelected ? '700' : '400'
                }]}>M</Text>
            </Pressable>
            <Pressable style={[styles.button, {
                    backgroundColor : quartalSelected ? 'hsla(0, 0%, 69%, 0.50)' : 'hsla(60, 2%, 88%, 0.88)',
                    borderWidth: quartalSelected ? 1 : 0
                }]}
                onPress={onSwitch}>
                <Text style={[styles.text, {
                    fontWeight: quartalSelected ? '700' : '400'
                }]}>Q</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flexDirection: 'row', gap: 1},
    button: {backgroundColor: 'hsla(60, 2%, 88%, 0.88)', alignItems: 'center', justifyContent: 'center', height: 35, width: 35, borderRadius: 4, borderColor: '#5d5c5c'},
    text: {color: 'black', textAlign: 'center', fontSize: 14}
})