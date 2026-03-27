import { Stack } from 'expo-router'

export default function ProfileStack() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="ModSetContracts" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
        <Stack.Screen name="ModSetMeters" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
        <Stack.Screen name="ModSetUser" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
    </Stack>
  )
}