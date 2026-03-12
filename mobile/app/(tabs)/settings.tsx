import { View, Text, Button, StyleSheet } from 'react-native';
import { supabase } from '@/supabase/supabasepublic';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text>Settings</Text>
      <Button title="Log out" onPress={() => supabase.auth.signOut()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 },
});