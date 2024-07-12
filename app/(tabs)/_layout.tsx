import { Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useColorScheme } from '@/src/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#121212' : '#f5f5f5',
          height: 60,
        },
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconSize = focused ? size : size - 3;
          if (route.name === 'index') {
            iconName = 'home';
          } else if (route.name === 'categories') {
            iconName = 'list';
          } else if (route.name === 'search') {
            iconName = 'search';
          } else if (route.name === 'bookmark') {
            iconName = 'book-open';
          } else if (route.name === 'account') {
            iconName = 'user';
          }
          return <Feather name={iconName} size={iconSize} color={color} />;
        },
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="bookmark"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
