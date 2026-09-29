import { Fragment } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';

import { Screen } from '@/components/ui';
import { fonts, palette } from '@/theme';

import { AccountHeader } from '../components/AccountHeader';
import { Dash } from '../components/Dash';
import { PrimaryButton } from '../components/PrimaryButton';
import { StatTiles } from '../components/StatTiles';
import { accountColors } from '../components/tokens';
import { farmFields, noCrop, type FarmField } from '../data/farm';
import { myFarmStats } from '../data/profile';

function FieldCard({ field }: { field: FarmField }) {
  const rows = [
    { label: 'Field Name', value: field.name },
    { label: 'Total Field Area', value: field.area },
    { label: 'Location', value: field.location },
    { label: 'Soil Type', value: field.soil },
  ];
  return (
    <View style={styles.card}>
      {rows.map((row, index) => (
        <Fragment key={row.label}>
          {index > 0 ? <View style={styles.divider} /> : null}
          <View style={styles.detail}>
            <Text style={styles.label}>{row.label}</Text>
            <Text style={styles.value}>{row.value}</Text>
          </View>
        </Fragment>
      ))}
      <Dash style={styles.dash} />
      {field.crops.length > 0 ? (
        <View style={styles.crops}>
          {field.crops.map((crop) => (
            <View key={crop.id} style={styles.crop}>
              <Image source={crop.image} style={styles.cropIcon} accessibilityLabel={crop.name} />
              <Text style={styles.cropName}>{crop.name}</Text>
              <Text style={styles.value}>{crop.area}</Text>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>{noCrop.title}</Text>
          <Text style={styles.emptyBody}>{noCrop.body}</Text>
        </View>
      )}
    </View>
  );
}

export function MyFarmsScreen() {
  return (
    <Screen header={<AccountHeader title="My Farms" />} contentStyle={styles.content}>
      <StatTiles stats={myFarmStats} />
      <View style={styles.list}>
        {farmFields.map((field) => (
          <FieldCard key={field.id} field={field} />
        ))}
      </View>
      <PrimaryButton label="Add Field" onPress={() => router.push('/field/add')} style={styles.add} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 24 },
  list: { marginTop: 32, gap: 21 },
  card: {
    borderWidth: 1,
    borderColor: accountColors.border,
    borderRadius: 12,
    paddingHorizontal: 11,
    paddingTop: 11,
    paddingBottom: 11,
  },
  detail: { height: 47, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  divider: { height: 1, backgroundColor: accountColors.border },
  label: { fontFamily: fonts.regular, fontSize: 14, lineHeight: 20, color: accountColors.label },
  value: { fontFamily: fonts.semibold, fontSize: 14, lineHeight: 20, color: palette.neutral0 },
  dash: { marginTop: 12, marginBottom: 12 },
  crops: { gap: 12 },
  crop: { flexDirection: 'row', alignItems: 'center' },
  cropIcon: { width: 36, height: 36, borderRadius: 18, marginRight: 8 },
  cropName: { flex: 1, fontFamily: fonts.semibold, fontSize: 14, lineHeight: 20, color: palette.neutral0 },
  empty: { alignItems: 'center' },
  emptyTitle: { fontFamily: fonts.semibold, fontSize: 14, lineHeight: 20, color: palette.neutral0 },
  emptyBody: {
    marginTop: 5,
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
    color: '#34393F',
    textAlign: 'center',
  },
  add: { marginTop: 22 },
});
