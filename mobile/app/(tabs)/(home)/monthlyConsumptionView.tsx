import { router } from "expo-router"
import { Pressable, ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function MonthlyConsumptionView() {

    return(
        <SafeAreaView style={{padding: 15}}>
            <ScrollView>
                <Pressable onPress={() => router.back()}>
                    <Text>Get Back</Text>
                </Pressable>
                <View>
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>TEST</Text>
                </View>
                <View>
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>TEST</Text>
                </View>
                <View>
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>TEST</Text>
                </View>
                <View>
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>TEST</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}