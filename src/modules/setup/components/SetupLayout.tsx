import { Stack } from 'expo-router';

import { colors } from '@/theme';

/** Stack for the /setup/* routes. */
export function SetupLayout() {
  return <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }} />;
}
