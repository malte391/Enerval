import { Image, Pressable, StyleSheet, Text } from "react-native";
import {useEffect} from "react";

type CpMenuButtonPropTypes = {
    icon: String;
    label: String;
    onPress: () => void;
}

const icons = {
    meter: require('@/assets/icons/IconMeter.png'),
    user:
}

export default function CpMenuButton({icon, label, onPress} : CpMenuButtonPropTypes) {

    return (
        <Pressable style={styles.container} onPress={onPress}>

            <Text style={styles.label}>{label}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {width: '100%', flexDirection: 'row', gap: 25},
    label: {},
    icon: {}

})