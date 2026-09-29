import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';

import { AppText, Screen } from '@/components/ui';
import { colors, fonts } from '@/theme';

import { SetupFooter } from '../components/SetupFooter';
import { SetupHeader } from '../components/SetupHeader';
import { locationBenefits, setupColors } from '../data/setup';

export function LocationSelectionScreen() {
  return (
    <Screen
      header={<SetupHeader title="Set Location" showBack={false} />}
      footer={<SetupFooter label="Allow Location" onPress={() => router.push('/setup/profile')} />}>
      <Image
        source={require('@assets/images/setup/location-farmer.png')}
        style={styles.illustration}
        contentFit="contain"
        accessibilityLabel="Farmer checking his location on a phone"
      />

      <View style={styles.headings}>
        <AppText variant="headlineSmall" color={colors.textPrimary} align="center">
          Your farm, your location
        </AppText>
        <AppText style={styles.subtitle} color={colors.textPrimary} align="center">
          Get accurate weather, nearby markets & services — just for you
        </AppText>
      </View>

      <View style={styles.card}>
        {locationBenefits.map((b) => (
          <View key={b.id} style={styles.row}>
            <Image source={b.icon} style={styles.icon} />
            <View style={styles.rowText}>
              <AppText style={styles.rowTitle} color={colors.textPrimary}>
                {b.title}
              </AppText>
              <AppText style={styles.rowDescription} color={colors.textSecondary} numberOfLines={1}>
                {b.description}
              </AppText>
            </View>
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  illustration: { width: 148, height: 148, alignSelf: 'center', marginTop: 16 },
  headings: { gap: 8, paddingHorizontal: 16, paddingTop: 24 },
  subtitle: { fontFamily: fonts.regular, fontSize: 14, lineHeight: 20 },
  card: {
    marginHorizontal: 16,
    marginTop: 32,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 19,
    gap: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: setupColors.cardBorder,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  icon: { width: 32, height: 32 },
  rowText: { flex: 1, gap: 4 },
  rowTitle: { fontFamily: fonts.semibold, fontSize: 14, lineHeight: 20 },
  rowDescription: { fontFamily: fonts.regular, fontSize: 12, lineHeight: 16, letterSpacing: 0.4 },
});
