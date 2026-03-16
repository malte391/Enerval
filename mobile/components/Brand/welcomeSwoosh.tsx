import { StyleSheet, Text, View } from "react-native";

type SwooshProps = {
    text: string;
}

export default function TextSwoosh({text} : SwooshProps){
    return (
        <View>
            <Text>{text}</Text>
        </View>
    )
}

const style = StyleSheet.create({
    container: {flex: 1, backgroundColor: 'black', padding: 14},
    text: {fontWeight: 'bold', color: '#DDFF00'}
})