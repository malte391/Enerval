import { StyleSheet, Text, View } from "react-native";

type HeaderProps = {
    text: string;
}

export default function CpHeader2({text = 'Title'}: HeaderProps) {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {padding: 14},
    text: {fontFamily: 'Helvetica-Neue', fontSize: 20, fontWeight: '600'}
})