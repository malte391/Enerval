import { getAddressesByUserId } from '@/model/Addresses/addressHandling';
import { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.scroll}
      contentContainerStyle={styles.container}>
      <View style={styles.container}>
        <Text>Welcome!</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {flex: 1, backgroundColor: '#fcffec'},
  container: { flex: 1, alignItems:'center', justifyContent: 'center', padding: 14, backgroundColor: '#fcffec', paddingBottom: 120 },
});