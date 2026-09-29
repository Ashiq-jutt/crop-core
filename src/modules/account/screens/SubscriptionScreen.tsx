import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import Svg, { Path } from 'react-native-svg';

import { Screen } from '@/components/ui';
import { colors, fonts, palette } from '@/theme';

import { Dash } from '../components/Dash';
import { AccountHeader } from '../components/AccountHeader';
import { PrimaryButton } from '../components/PrimaryButton';
import { currentPlan } from '../data/profile';
import { subscription } from '../data/subscription';

function Check() {
  return (
    <Svg width={18} height={18} viewBox="0 0 16 16" fill="none" style={styles.check}>
      <Path d="M2 8.5L6 12.5L14 4" stroke={colors.primary} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function SubscriptionScreen() {
  return (
    <Screen header={<AccountHeader title="Subscription" />} contentStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.name}>{subscription.name}</Text>
        <View style={styles.plan}>
          <Text style={styles.planTitle}>{currentPlan.title}</Text>
          <Text style={styles.planPrice}>{currentPlan.price}</Text>
          <Text style={styles.planBilling}>{currentPlan.nextBilling}</Text>
        </View>
        <Dash style={styles.dash} color="#CFD2D6" />
        <View style={styles.features}>
          {subscription.features.map((feature) => (
            <View key={feature} style={styles.feature}>
              <Check />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
      </View>
      <PrimaryButton label="Manage Billings" medium onPress={() => router.back()} style={styles.manage} />
      <PrimaryButton
        label="Cancel Subscription"
        variant="danger-outline"
        onPress={() => router.back()}
        style={styles.cancel}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 24 },
  card: { borderWidth: 1.5, borderColor: '#E4E6E9', borderRadius: 12, padding: 14.5 },
  name: { textAlign: 'center', fontFamily: fonts.semibold, fontSize: 15, lineHeight: 24, color: palette.neutral0 },
  plan: {
    marginTop: 16,
    height: 96,
    borderRadius: 8,
    backgroundColor: palette.primary95,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  planTitle: { fontFamily: fonts.medium, fontSize: 14, lineHeight: 20, color: palette.neutral0 },
  planPrice: { marginTop: 5, fontFamily: fonts.semibold, fontSize: 16, lineHeight: 24, color: palette.neutral0 },
  planBilling: { fontFamily: fonts.regular, fontSize: 12, lineHeight: 16, color: palette.neutral0 },
  dash: { marginTop: 15 },
  features: { marginTop: 16, gap: 16 },
  feature: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  check: { marginLeft: 3 },
  featureText: { fontFamily: fonts.regular, fontSize: 14, lineHeight: 24, color: palette.neutral0 },
  manage: { marginTop: 17 },
  cancel: { marginTop: 15, height: 50 },
});
