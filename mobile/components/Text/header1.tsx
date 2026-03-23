import { StyleSheet, Text, View } from "react-native";

type HeaderProps = {
    text: string;
}

export default function Header1({text = 'Title'}: HeaderProps) {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {},
    text: {fontFamily: 'Helvetica-Neue', fontSize: 24, fontWeight: 'bold'}
})