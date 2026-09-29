import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { CloseCircle, SearchNormal1 } from 'iconsax-react-native';

import { AppText, Screen } from '@/components/ui';
import { colors, fonts } from '@/theme';

import { FieldMap } from '../components/FieldMap';
import { SetupFooter } from '../components/SetupFooter';
import { SetupHeader } from '../components/SetupHeader';
import { mappedField, setupColors } from '../data/setup';

export function MapViewScreen() {
  const [query, setQuery] = useState('Bhu');
  const [zoom, setZoom] = useState(1);

  return (
    <Screen
      scroll={false}
      header={<SetupHeader title="Map View" />}
      footer={
        <SetupFooter label="Continue" shadow={false} onPress={() => router.push('/setup/crop')}>
          <View style={styles.summary}>
            <AppText style={styles.area} color={colors.textPrimary}>
              {mappedField.area}
            </AppText>
            <AppText style={styles.place} color={colors.textPrimary}>
              {mappedField.place}
            </AppText>
          </View>
        </SetupFooter>
      }>
      <View style={styles.search}>
        <SearchNormal1 size={24} color="#000000" />
        <TextInput
          value={query}
          onChangeText={setQuery}
          accessibilityLabel="Search location"
          placeholder="Search location"
          placeholderTextColor={setupColors.mutedLabel}
          style={styles.input}
        />
        {query ? (
          <Pressable accessibilityRole="button" accessibilityLabel="Clear search" hitSlop={8} onPress={() => setQuery('')}>
            <CloseCircle size={24} color="#000000" />
          </Pressable>
        ) : null}
      </View>

      <FieldMap
        source={require('@assets/images/setup/map-full.png')}
        zoom={zoom}
        onZoom={setZoom}
        onUndo={() => setZoom(1)}
        onLocate={() => setZoom(1)}
        style={styles.map}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  search: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginHorizontal: 16,
    marginTop: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: setupColors.cardBorder,
  },
  input: {
    flex: 1,
    minWidth: 0,
    fontFamily: fonts.outfit,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textPrimary,
    paddingVertical: 0,
  },
  map: { flex: 1, marginTop: 16 },
  summary: { gap: 3, marginBottom: 12 },
  area: { fontFamily: fonts.semibold, fontSize: 14, lineHeight: 20 },
  place: { fontFamily: fonts.regular, fontSize: 12, lineHeight: 16, letterSpacing: 0.4 },
});
