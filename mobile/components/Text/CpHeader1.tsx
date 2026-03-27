import { StyleSheet, Text, View } from "react-native";

type HeaderProps = {
    text: string;
}

export default function CpHeader1({text = 'Title'}: HeaderProps) {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {paddingVertical: 20},
    text: {fontFamily: 'Helvetica-Neue', fontSize: 24, fontWeight: 'bold'}
})