import { Share, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';

import { Screen } from '@/components/ui';
import { colors, fonts, palette } from '@/theme';

import { AccountHeader } from '../components/AccountHeader';
import { Dash } from '../components/Dash';
import { FooterButton } from '../components/FooterButton';
import { accountColors } from '../components/tokens';
import { referral } from '../data/refer';

export function ReferEarnScreen() {
  const share = () => {
    Share.share({ message: `Join me on CropCore! Use my referral code ${referral.code}` }).catch(() => undefined);
  };

  return (
    <Screen
      header={<AccountHeader title="Refer & Earn" />}
      footer={<FooterButton label="Refer & Earn Now" onPress={share} />}
      contentStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.title}>{referral.title}</Text>
        <Text style={styles.amount}>{referral.amount}</Text>
        <Text style={styles.caption}>{referral.caption}</Text>
        <Image source={referral.illustration} style={styles.illustration} contentFit="contain" />
        <View style={styles.codeBox}>
          <Text style={styles.codeLabel}>{referral.codeLabel}</Text>
          <Text style={styles.code} selectable>
            {referral.code}
          </Text>
        </View>
        <Dash style={styles.dash} />
        <View style={styles.steps}>
          {referral.steps.map((step, index) => (
            <View key={`${index}-${step}`} style={styles.step}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{index + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 16, paddingVertical: 24 },
  card: {
    borderWidth: 1,
    borderColor: accountColors.border,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingTop: 14,
    paddingBottom: 16,
    alignItems: 'center',
  },
  title: { fontFamily: fonts.medium, fontSize: 16, lineHeight: 24, letterSpacing: 0.4, color: palette.neutral0 },
  amount: { marginTop: 16, fontFamily: fonts.bold, fontSize: 24, lineHeight: 32, color: palette.neutral0 },
  caption: { marginTop: -3, fontFamily: fonts.regular, fontSize: 14, lineHeight: 20, letterSpacing: 0.25, color: palette.neutral50 },
  illustration: { marginTop: 14.5, width: 101, height: 106 },
  codeBox: {
    marginTop: 15.5,
    alignSelf: 'stretch',
    height: 60,
    borderRadius: 8,
    backgroundColor: palette.neutral95,
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeLabel: { fontFamily: fonts.regular, fontSize: 12, lineHeight: 16, letterSpacing: 0.5, color: palette.neutral0 },
  code: { marginTop: 4, fontFamily: fonts.bold, fontSize: 16, lineHeight: 24, color: palette.neutral0 },
  dash: { marginTop: 14 },
  steps: { alignSelf: 'stretch', marginTop: 16, gap: 16 },
  step: { flexDirection: 'row', alignItems: 'flex-start' },
  badge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3,
    marginRight: 8,
  },
  badgeText: { fontFamily: fonts.medium, fontSize: 14, lineHeight: 20, color: colors.textOnPrimary },
  stepText: { flex: 1, fontFamily: fonts.regular, fontSize: 13, lineHeight: 16, color: '#25272B' },
});
