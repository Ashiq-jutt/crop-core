import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

import { SvgIcon } from '@/components/ui';
import { colors } from '@/theme';

const SPLASH_DURATION_MS = 1500;

export function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => router.replace('/onboarding'), SPLASH_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <View style={styles.logo}>
        <SvgIcon source={require('@assets/images/brand/logo.svg')} width={248} height={64.44} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  /** The logo sits 5pt above the frame's vertical centre. */
  logo: { marginBottom: 10 },
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
});
