import DefaultButton from '@/components/Buttons/buttonDefault';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <DefaultButton label={'Button'} onPress={() => console.log('pressed')}></DefaultButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});