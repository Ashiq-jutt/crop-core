import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Microphone2, TickCircle } from 'iconsax-react-native';

import { AppText, DashedDivider, Screen } from '@/components/ui';
import { colors, fonts } from '@/theme';

import { AcreSlider } from '../components/AcreSlider';
import { ChoiceChip } from '../components/ChoiceChip';
import { FieldSummaryCard } from '../components/FieldSummaryCard';
import { SetupFooter } from '../components/SetupFooter';
import { SetupHeader } from '../components/SetupHeader';
import { SetupSteps } from '../components/SetupSteps';
import {
  cropOptions,
  cropStages,
  formatAcres,
  initialAllocations,
  irrigationTypes,
  setupColors,
  totalAcres,
  type CropAllocation,
} from '../data/setup';

const round = (n: number) => Math.round(n * 10) / 10;

export function AreaDistributionScreen() {
  const [allocations, setAllocations] = useState<CropAllocation[]>(initialAllocations);
  const allocated = round(allocations.reduce((sum, a) => sum + a.acres, 0));
  const complete = allocated === totalAcres;

  const update = (cropId: string, patch: Partial<CropAllocation>) =>
    setAllocations((list) => list.map((a) => (a.cropId === cropId ? { ...a, ...patch } : a)));

  const reset = () => {
    const share = round(totalAcres / allocations.length);
    setAllocations((list) =>
      list.map((a, i) => ({ ...a, acres: i === 0 ? round(totalAcres - share * (list.length - 1)) : share })),
    );
  };

  return (
    <Screen
      header={<SetupHeader title="Area Distribution" />}
      footer={<SetupFooter label="Go to Dashboard" onPress={() => router.replace('/home')} />}>
      <SetupSteps step={4} />

      <View style={styles.content}>
        <FieldSummaryCard />

        <View style={styles.totalCard}>
          <View style={styles.totalRow}>
            <AppText style={styles.body} color={colors.textPrimary}>
              Total Allocated
            </AppText>
            <View style={styles.totalValue}>
              <AppText style={styles.body} color={colors.textPrimary}>
                {`${formatAcres(allocated)} / ${formatAcres(totalAcres)}`}
              </AppText>
              <TickCircle size={20} variant="Bold" color={complete ? setupColors.success : colors.border} />
            </View>
          </View>
          <DashedDivider style={styles.totalDivider} />
          <View style={styles.progressTrack}>
            <View
              style={[styles.progressFill, { width: `${Math.min(100, (allocated / totalAcres) * 100)}%` }]}
            />
          </View>
          <View style={styles.tipRow}>
            <AppText style={styles.tip} color={setupColors.tip}>
              Tip : Use Mic and Say “Equal Distribution”
            </AppText>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Reset distribution"
              onPress={reset}
              style={({ pressed }) => [styles.reset, pressed && styles.pressed]}>
              <AppText style={styles.tip} color={colors.textPrimary}>
                Reset
              </AppText>
            </Pressable>
          </View>
        </View>

        {allocations.map((a) => {
          const crop = cropOptions.find((c) => c.id === a.cropId);
          if (!crop) return null;
          return (
            <View key={a.cropId} style={styles.cropCard}>
              <View style={styles.cropHeader}>
                <View style={styles.cropCircle}>
                  <Image source={crop.icon} style={styles.cropIcon} />
                </View>
                <AppText style={styles.cropName} color={colors.textPrimary}>
                  {crop.name}
                </AppText>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`Set ${crop.name} area by voice`}
                  style={({ pressed }) => [styles.mic, pressed && styles.pressed]}>
                  <Microphone2 size={20} color="#000000" />
                </Pressable>
              </View>

              <View style={styles.sliderRow}>
                <AcreSlider
                  label={`${crop.name} acres`}
                  value={a.acres}
                  max={totalAcres}
                  onChange={(acres) => update(a.cropId, { acres })}
                />
                <AppText style={styles.body} color={colors.textPrimary}>
                  {formatAcres(a.acres)}
                </AppText>
              </View>

              <DashedDivider style={styles.cropDivider} />

              <AppText style={styles.sectionTitle} color={colors.textPrimary}>
                Current Stage
              </AppText>
              <View style={styles.chips}>
                {cropStages.map((stage) => (
                  <ChoiceChip
                    key={stage}
                    label={stage}
                    selected={a.stage === stage}
                    onPress={() => update(a.cropId, { stage })}
                  />
                ))}
              </View>

              <AppText style={[styles.sectionTitle, styles.sectionGap]} color={colors.textPrimary}>
                Irrigation Type
              </AppText>
              <View style={styles.chips}>
                {irrigationTypes.map((irrigation) => (
                  <ChoiceChip
                    key={irrigation}
                    label={irrigation}
                    selected={a.irrigation === irrigation}
                    onPress={() => update(a.cropId, { irrigation })}
                  />
                ))}
              </View>
            </View>
          );
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { gap: 16, paddingHorizontal: 16, paddingTop: 16, paddingBottom: 24 },
  body: { fontFamily: fonts.regular, fontSize: 14, lineHeight: 20 },
  totalCard: {
    marginTop: 8,
    paddingHorizontal: 11,
    paddingTop: 11,
    paddingBottom: 11,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  totalRow: { height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  totalValue: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  totalDivider: { marginHorizontal: 10, marginTop: 7, marginBottom: 8 },
  progressTrack: { height: 16, borderRadius: 8, overflow: 'hidden', backgroundColor: colors.surfaceMuted },
  progressFill: { height: 16, borderRadius: 8, backgroundColor: setupColors.success },
  tipRow: { height: 24, marginTop: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  tip: { fontFamily: fonts.regular, fontSize: 12, lineHeight: 16, letterSpacing: 0.4 },
  reset: { height: 24, justifyContent: 'center', paddingHorizontal: 8, borderRadius: 8, backgroundColor: colors.surfaceMuted },
  pressed: { opacity: 0.8 },
  cropCard: {
    paddingHorizontal: 11,
    paddingTop: 11,
    paddingBottom: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cropHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  cropCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceMuted,
  },
  cropIcon: { width: 40, height: 40 },
  cropName: { flex: 1, fontFamily: fonts.regular, fontSize: 16, lineHeight: 24 },
  mic: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceMuted,
  },
  sliderRow: { flexDirection: 'row', alignItems: 'center', gap: 13, marginTop: 10 },
  cropDivider: { marginTop: 13, marginBottom: 16 },
  sectionTitle: { fontFamily: fonts.semibold, fontSize: 14, lineHeight: 20, marginBottom: 8 },
  sectionGap: { marginTop: 16, marginBottom: 12 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
});
