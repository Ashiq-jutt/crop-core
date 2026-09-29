import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { ArrowDown2, Map as MapIcon } from 'iconsax-react-native';

import { AppText, Screen } from '@/components/ui';
import { colors, fonts } from '@/theme';

import { FieldMap } from '../components/FieldMap';
import { OptionSheet } from '../components/OptionSheet';
import { SetupFooter } from '../components/SetupFooter';
import { SetupHeader } from '../components/SetupHeader';
import { SetupInput } from '../components/SetupInput';
import { SetupSteps } from '../components/SetupSteps';
import { fieldDefaults, fieldUnits, mappedField, setupColors, type FieldUnit } from '../data/setup';

export function SetupFieldsScreen() {
  const [name, setName] = useState(fieldDefaults.name);
  const [size, setSize] = useState(fieldDefaults.size);
  const [unit, setUnit] = useState<FieldUnit>(fieldDefaults.unit);
  const [unitSheet, setUnitSheet] = useState(false);
  const [zoom, setZoom] = useState(1);

  return (
    <Screen
      header={<SetupHeader title="Setup Fields" />}
      footer={<SetupFooter label="Continue" onPress={() => router.push('/setup/crop')} />}>
      <SetupSteps step={2} />

      <View style={styles.form}>
        <SetupInput label="Field Name" value={name} onChangeText={setName} />

        <View style={styles.sizeGroup}>
          <AppText style={styles.sizeLabel} color={setupColors.mutedLabel}>
            Feaild Size
          </AppText>
          <View style={styles.sizeRow}>
            <View style={styles.flex}>
              <SetupInput value={size} onChangeText={setSize} keyboardType="decimal-pad" />
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Unit, ${unit}`}
              onPress={() => setUnitSheet(true)}
              style={({ pressed }) => [styles.unit, pressed && styles.pressed]}>
              <AppText style={styles.unitText} color={colors.textPrimary}>
                {unit}
              </AppText>
              <ArrowDown2 size={24} color="#000000" />
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.areaHeading}>
        <AppText style={styles.areaTitle} color={colors.textPrimary}>
          Fields Area
        </AppText>
        <AppText style={styles.areaSubtitle} color={colors.textPrimary}>
          Tap Each Corner Of Your Farm to Mack Boundaries
        </AppText>
      </View>

      <FieldMap
        source={require('@assets/images/setup/field-map.png')}
        zoom={zoom}
        onZoom={setZoom}
        onUndo={() => setZoom(1)}
        onLocate={() => setZoom(1)}
        style={styles.map}
      />

      <View style={styles.summary}>
        <View style={styles.summaryText}>
          <AppText style={styles.area} color={colors.textPrimary}>
            {mappedField.area}
          </AppText>
          <AppText style={styles.place} color={colors.textPrimary}>
            {mappedField.place}
          </AppText>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Full Map View"
          onPress={() => router.push('/setup/map')}
          style={({ pressed }) => [styles.fullMap, pressed && styles.pressed]}>
          <AppText style={styles.fullMapText} color={colors.textPrimary}>
            Full Map View
          </AppText>
          <MapIcon size={24} color="#000000" />
        </Pressable>
      </View>

      <OptionSheet
        visible={unitSheet}
        title="Field Size Unit"
        options={fieldUnits.map((u) => ({ value: u, label: u }))}
        value={unit}
        onSelect={setUnit}
        onClose={() => setUnitSheet(false)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  form: { gap: 20, paddingHorizontal: 16, paddingTop: 20 },
  sizeGroup: { gap: 4 },
  sizeLabel: { fontFamily: fonts.regular, fontSize: 13, lineHeight: 16, paddingHorizontal: 4 },
  sizeRow: { flexDirection: 'row', gap: 12 },
  unit: {
    flex: 1,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: colors.surfaceMuted,
  },
  unitText: { fontFamily: fonts.semibold, fontSize: 14, lineHeight: 20 },
  pressed: { opacity: 0.8 },
  areaHeading: { gap: 4, paddingHorizontal: 16, paddingTop: 16 },
  areaTitle: { fontFamily: fonts.semibold, fontSize: 14, lineHeight: 20 },
  areaSubtitle: { fontFamily: fonts.regular, fontSize: 12, lineHeight: 16, letterSpacing: 0.4 },
  map: { height: 258, marginHorizontal: 16, marginTop: 8, borderRadius: 12 },
  summary: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },
  summaryText: { flex: 1, gap: 3 },
  area: { fontFamily: fonts.semibold, fontSize: 14, lineHeight: 20 },
  place: { fontFamily: fonts.regular, fontSize: 12, lineHeight: 16, letterSpacing: 0.4 },
  fullMap: {
    width: 160,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderRadius: 8,
    backgroundColor: colors.surfaceMuted,
  },
  fullMapText: { fontFamily: fonts.semibold, fontSize: 14, lineHeight: 20 },
});
