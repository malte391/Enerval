import { StyleSheet, Text, View } from "react-native";

type HeaderProps = {
    text: string;
}

export default function CpSubTitle({text = 'Title'}: HeaderProps) {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1, paddingHorizontal: 30, margin: 12, justifyContent: 'center', alignItems: 'center'},
    text: {fontFamily: 'Helvetica-Neue', fontSize: 14, fontWeight: '400', color: 'rgba(0,0,0,0.7)', textAlign: 'center'},
})