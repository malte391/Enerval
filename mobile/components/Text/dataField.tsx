import { StyleSheet, Text, View } from "react-native";

type DatafieldProps = {
    label: string;
    data: string;
}

export default function Datafield({label, data} : DatafieldProps) {

    return(
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.data}>{data}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1, flexDirection: 'row', gap: 5, alignItems: 'center'},
    label: {fontSize: 18, fontWeight: '700'},
    data: {fontSize: 16, backgroundColor: '#DDFF00'}
})