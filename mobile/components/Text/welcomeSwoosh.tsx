import { StyleSheet, Text, View } from "react-native";

type SwooshProps = {
    line1: string;
    line2?: string
}

export default function TextSwoosh({line1, line2} : SwooshProps){
    return (
        <View style={style.container}>
            <View style={style.textContainer}>
                <Text style={style.text}>{line1}</Text>
            </View>
            {line2 && <View style={style.textContainer}>
                <Text style={style.text}>{line2}</Text>
            </View>}

        </View>
    )
}

const style = StyleSheet.create({
    container: {flex: 1, paddingHorizontal: 18, gap: 5}, 
    textContainer: {alignSelf: 'flex-start', backgroundColor: '#DDFF00', paddingVertical: 4, paddingLeft: 18, paddingRight: 18},
    text: {fontWeight: 'bold', textAlign: 'left', color: '#000000', fontSize: 26}
})