import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

export default function TabLayout() {


  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black', // change to your brand color
        headerShown: false,
        tabBarStyle: style.tabBarStyle,
        tabBarItemStyle: style.tabBarItemStyle,
        tabBarLabelStyle: style.tabBarLabelStyle,
        animation: 'shift'
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
          name="(scan)"
          options={{
            title: 'Scan',
            tabBarIcon: ({color, size}) => (
              <Ionicons name='scan' size={size} color={color}/>
            ),
          }}
      />

      <Tabs.Screen
        name="(settings)"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />

    </Tabs>
  );
}
const style = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',        // lifts it off the bottom
    bottom: 28,                  // gap from screen edge
    marginHorizontal: 70,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#ffffff',
    borderTopWidth: 0,
    elevation: 0,                // removes Android shadow
    shadowColor: '#000',
    borderColor: '#DDFF00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    paddingBottom: 0,
  },
  tabBarItemStyle: {
    borderRadius: 24,
    borderColor: '#DDFF00',
    marginHorizontal: 4,
    marginVertical: 6,
  },
  tabBarLabelStyle: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 3,
  }
})