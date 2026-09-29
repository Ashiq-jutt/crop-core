import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { icons } from '@/components/icons';
import { AppBar, AppText, DashedDivider, IconButton, Screen, SvgIcon } from '@/components/ui';
import { colors, palette, radius, spacing } from '@/theme';

import { PrimaryButton } from '@/modules/onboarding/components/PrimaryButton';

import { AuthIllustration } from '../components/AuthIllustration';
import { OtpInput } from '../components/OtpInput';
import { VoiceListeningDots } from '../components/VoiceListeningDots';
import { demoPhoneNumber, maskPhone, OTP_LENGTH, OTP_RESEND_SECONDS } from '../data/auth';

export function OtpVerificationScreen() {
  const params = useLocalSearchParams<{ phone?: string; dialCode?: string }>();
  const phone = params.phone ?? demoPhoneNumber;
  const dialCode = params.dialCode ?? '+91';

  const [otp, setOtp] = useState('823');
  const [secondsLeft, setSecondsLeft] = useState(OTP_RESEND_SECONDS);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secondsLeft]);

  return (
    <Screen header={<AppBar />}>
      <AuthIllustration source={require('@assets/images/auth/otp-farmer.png')} />

      <View style={styles.container}>
        <View style={styles.headings}>
          <AppText variant="headlineSmall">Verify Your Number</AppText>
          <View>
            <AppText variant="labelLarge" color={colors.textSecondary}>
              We’sent a 6-Digit Code to Your Mobile Number
            </AppText>
            <View style={styles.phoneRow}>
              <AppText variant="labelLarge" color={palette.neutralColor10}>
                {maskPhone(dialCode, phone)}
              </AppText>
              <IconButton
                accessibilityLabel="Edit phone number"
                padding={spacing.xs}
                onPress={() => router.back()}
                icon={<SvgIcon source={icons.edit} width={16} />}
              />
            </View>
          </View>
        </View>

        <View style={styles.otp}>
          <View style={styles.voice}>
            <VoiceListeningDots />
            <AppText variant="labelLarge">Voice Input Active , Speak OTP</AppText>
          </View>
          <OtpInput length={OTP_LENGTH} value={otp} onChange={setOtp} />
          <DashedDivider />
          <View style={styles.timings}>
            <AppText variant="labelLargeStrong" color={palette.neutral10} style={styles.flex}>
              {secondsLeft > 0 ? `Resend OTP In ${secondsLeft} Sec` : 'Didn’t get the code?'}
            </AppText>
            <Pressable
              accessibilityRole="button"
              onPress={() => (secondsLeft > 0 ? undefined : setSecondsLeft(OTP_RESEND_SECONDS))}
              style={styles.secondary}>
              <AppText variant="labelLargeStrong">{secondsLeft > 0 ? 'Enter Manually' : 'Resend OTP'}</AppText>
            </Pressable>
          </View>
        </View>

        <PrimaryButton label="Proceed" onPress={() => router.replace('/setup/location')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xl,
    paddingHorizontal: spacing.lg,
    paddingTop: 56,
    paddingBottom: spacing.xl,
  },
  headings: { gap: spacing.sm },
  phoneRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  otp: { gap: spacing.sm },
  voice: { alignItems: 'center', gap: spacing.sm, padding: spacing.sm },
  timings: { flexDirection: 'row', alignItems: 'center', gap: spacing.xl },
  flex: { flex: 1 },
  secondary: {
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceMuted,
  },
});
