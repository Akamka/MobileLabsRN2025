import { Tabs } from 'expo-router';
import CustomTabBar from "../../components/CustomTabBar"; // <-- Путь актуальный для твоей структуры
import { ThemeProvider } from "../../hooks/ThemeContext"; // або "../hooks/ThemeContext", якщо шлях інший

export default function TabLayout() {
  return (
    <ThemeProvider>
    <Tabs
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      <Tabs.Screen name="community" options={{ title: 'Community' }} />
      <Tabs.Screen name="guard" options={{ title: 'Guard' }} />
      <Tabs.Screen name="alerts" options={{ title: 'Alerts' }} />
    </Tabs>
    </ThemeProvider>
  );
}
