import { View, Text, Pressable } from 'react-native'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function WorkoutScreen() {
  return (
    <SafeAreaView style={{flex: 1}}>
        <View style={{ flex: 1, padding: 16, gap: 20 }}>
        <Pressable onPress={() => router.back()}>
            <Text>←</Text>
        </Pressable>
        <Text style={{ fontSize: 24, fontWeight: '600' }}>Workout</Text>
        </View>
    </SafeAreaView>
  )
}