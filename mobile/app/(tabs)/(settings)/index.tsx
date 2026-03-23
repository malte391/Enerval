import DefaultButton from '@/components/Buttons/buttonDefault'
import { signOut } from '@/model/User/sessions'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SettingsScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ alignItems:'center', justifyContent: 'center', padding: 20 }}>
        <Text>Settings</Text>
        <DefaultButton label='Sign out' onPress={() => signOut()}/>
      </View>
    </SafeAreaView>
  )
}
