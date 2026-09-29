import { router, Tabs } from 'expo-router';

import { AppTabBar } from '@/components/navigation/AppTabBar';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <AppTabBar {...props} onCenterPress={() => router.push('/diagnosis')} />}>
      <Tabs.Screen name="home" />
      <Tabs.Screen name="fields" />
      <Tabs.Screen name="market" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
