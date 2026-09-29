import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';

import { Screen } from '@/components/ui';
import { colors, palette } from '@/theme';

import { MoreDots, PillButton } from '../components/Chips';
import { CropCard } from '../components/CropCard';
import { PageHeader } from '../components/PageHeader';
import { font, ink } from '../components/text';
import { fieldWeather, getFieldDetails } from '../data/fields';

const cloudy = require('@assets/images/fields/weather-cloudy.png');
const bulb = require('@assets/images/diagnosis/bulb.png');

export function FieldDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const field = getFieldDetails(id);
  const [done, setDone] = useState<Record<string, boolean>>({});

  const info = [
    { label: 'Field Name', value: field.name },
    { label: 'Total Field Area', value: field.area },
    { label: 'Location', value: field.location },
    { label: 'Soil Type', value: field.soil },
  ];

  return (
    <Screen
      header={
        <PageHeader
          title="Field Details"
          right={
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Field options"
              hitSlop={10}
              onPress={() => router.push(`/field/${field.id}/edit`)}>
              <MoreDots horizontal />
            </Pressable>
          }
        />
      }
      contentStyle={styles.content}>
      <View style={styles.infoCard}>
        <View style={styles.rowBetween}>
          <Text style={styles.cardTitle}>Field Info</Text>
          <PillButton label="Edit Field Info" onPress={() => router.push(`/field/${field.id}/edit`)} />
        </View>
        {info.map((row, i) => (
          <View key={row.label} style={[styles.infoRow, i > 0 && styles.infoRowDivider]}>
            <Text style={styles.infoLabel}>{row.label}</Text>
            <Text style={styles.infoValue}>{row.value}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.rowBetween, styles.sectionHeader]}>
        <Text style={styles.sectionTitle}>Crop Management</Text>
        <PillButton label="Add Crop" onPress={() => router.push(`/field/${field.id}/add-crop`)} />
      </View>

      <View style={styles.crops}>
        {field.crops.map((crop) => (
          <CropCard
            key={crop.id}
            crop={crop}
            taskDone={done[crop.id]}
            onToggleTask={() => setDone((d) => ({ ...d, [crop.id]: !d[crop.id] }))}
            onAddTask={() => router.push(`/field/${field.id}/task?crop=${crop.id}`)}
            primary={{ label: 'View Details', onPress: () => router.push(`/field/${field.id}/crop/${crop.id}`) }}
            secondary={{ label: 'Update Status', onPress: () => router.push(`/field/${field.id}/crop/${crop.id}/status`) }}
          />
        ))}
      </View>

      <View style={styles.weatherCard}>
        <Text style={styles.cardTitle}>Weather</Text>
        <View style={styles.weatherRow}>
          <View style={styles.weatherIcon}>
            <Image source={cloudy} style={styles.cloud} contentFit="contain" />
            <Text style={styles.condition}>{fieldWeather.condition}</Text>
          </View>
          <View style={styles.weatherDivider} />
          <View style={styles.flex}>
            <Text style={styles.weatherDay}>{fieldWeather.day}</Text>
            <Text style={styles.weatherDate}>{fieldWeather.date}</Text>
          </View>
          <View style={styles.weatherRight}>
            <Text style={styles.temperature}>{fieldWeather.temperature}</Text>
            <Text style={styles.rain}>{fieldWeather.rain}</Text>
          </View>
        </View>
        <View style={styles.advice}>
          <Image source={bulb} style={styles.bulb} contentFit="contain" />
          <Text style={styles.adviceText}>{fieldWeather.advice}</Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 24 },
  flex: { flex: 1 },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  infoCard: {
    borderWidth: 1,
    borderColor: '#E7E8EB',
    borderRadius: 12,
    padding: 11,
    paddingHorizontal: 12,
    backgroundColor: palette.neutral100,
  },
  cardTitle: font('medium', 14.5, 22, ink.title),
  infoRow: { height: 48, marginTop: 11, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  infoRowDivider: { marginTop: 0, borderTopWidth: 1, borderTopColor: '#E7E8EB' },
  infoLabel: font('regular', 14.5, 22, '#2C3036'),
  infoValue: font('semibold', 14.5, 22, ink.title),
  sectionHeader: { marginTop: 16 },
  sectionTitle: font('medium', 17, 24, ink.title),
  crops: { gap: 9, marginTop: 13 },
  weatherCard: {
    marginTop: 17,
    borderWidth: 1,
    borderColor: '#E7E8EB',
    borderRadius: 12,
    padding: 12,
    backgroundColor: palette.neutral100,
  },
  weatherRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  weatherIcon: { alignItems: 'center', width: 44 },
  cloud: { width: 29, height: 23 },
  condition: font('semibold', 12.5, 18, ink.title),
  weatherDivider: { width: 1, height: 38, backgroundColor: ink.cardBorder, marginHorizontal: 8 },
  weatherDay: font('semibold', 12.5, 18, ink.title),
  temperature: font('medium', 13.5, 18, ink.title),
  weatherDate: font('regular', 12.5, 18, ink.muted),
  weatherRight: { alignItems: 'flex-end' },
  rain: font('semibold', 12.5, 18, colors.primary),
  advice: {
    marginTop: 12,
    height: 40,
    borderRadius: 8,
    backgroundColor: ink.insight,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    gap: 8,
  },
  bulb: { width: 26, height: 26 },
  adviceText: font('regular', 12.5, 18, ink.title),
});
