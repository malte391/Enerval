import { Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native"
import { ButtonProps } from "./ButtonPropTypes"
import { Button } from "@react-navigation/elements"

export default function DefaultButton({label, onPress} : ButtonProps) {

    const {width} = useWindowDimensions()

    return(
        <Pressable style={[styles.container, {width: width * 0.35}]} onPress={onPress}>
            <Text style={styles.text}>{label}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        borderWidth: 0,
        minHeight: 55,
        backgroundColor: 'black',
        borderRadius: 8,
        padding: 16,
        alignItems:'center',
        justifyContent: 'center'
    },
    text:{
        fontFamily: 'Avenir Next',
        fontWeight: 'bold',
        color: '#DDFF00',
        fontSize: 18
    }
})