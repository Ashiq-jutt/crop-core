import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';

import { icons } from '@/components/icons';
import { AppBar, AppText, Screen, SvgIcon, TextField } from '@/components/ui';
import { colors, fonts, radius, spacing } from '@/theme';

import { PrimaryButton } from '@/modules/onboarding/components/PrimaryButton';

import { AuthIllustration } from '../components/AuthIllustration';
import { SocialLoginRow } from '../components/SocialLoginRow';
import { countries, demoPhoneNumber } from '../data/auth';

export function PhoneLoginScreen() {
  const [country] = useState(countries[0]);
  const [phone, setPhone] = useState(demoPhoneNumber);

  const submit = () => router.push({ pathname: '/otp', params: { phone, dialCode: country.dialCode } });

  return (
    <Screen header={<AppBar />}>
      <AuthIllustration source={require('@assets/images/auth/login-farmer.png')} />

      <View style={styles.headings}>
        <AppText variant="headlineSmall" color={colors.textHeading}>
          Login/Sign Up
        </AppText>
        <AppText variant="labelLarge" color={colors.textSecondary}>
          Enter your mobile number to receive a 6-digit code
        </AppText>
      </View>

      <View style={styles.form}>
        <View>
          <AppText variant="bodySmall" color={colors.textTertiary} style={styles.label}>
            Phone Number
          </AppText>
          <View style={styles.phoneRow}>
            <Pressable accessibilityRole="button" accessibilityLabel="Select country" style={styles.country}>
              <Image source={country.flag} style={styles.flag} />
              <SvgIcon source={icons.arrowDown} width={20} />
            </Pressable>
            <View style={styles.phoneField}>
              <TextField
                value={phone}
                onChangeText={(t) => setPhone(t.replace(/\D/g, '').slice(0, 10))}
                keyboardType="phone-pad"
                accessibilityLabel="Phone number"
                right={<SvgIcon source={icons.microphone} width={24} />}
              />
            </View>
          </View>
        </View>
        <PrimaryButton label="Continue" onPress={submit} disabled={phone.length < 10} />
      </View>

      <View style={styles.social}>
        <SocialLoginRow />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  headings: {
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingTop: 56,
    paddingBottom: spacing.lg,
  },
  form: {
    gap: spacing.xl,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
  },
  label: { fontFamily: fonts.outfit, padding: spacing.xs },
  phoneRow: { flexDirection: 'row', gap: spacing.sm },
  country: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.md,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceMuted,
  },
  flag: { width: 24, height: 24, borderRadius: 12 },
  phoneField: { flex: 1 },
  social: { paddingTop: 15 },
});
