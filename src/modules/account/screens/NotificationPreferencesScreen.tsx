import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';

import { Screen } from '@/components/ui';
import { fonts, palette } from '@/theme';

import { AccountHeader } from '../components/AccountHeader';
import { FilterChips } from '../components/FilterChips';
import { ToggleSwitch } from '../components/ToggleSwitch';
import { accountColors } from '../components/tokens';
import { notificationFilters, notificationPreferences, type NotificationFilter } from '../data/notifications';

export function NotificationPreferencesScreen() {
  const [filter, setFilter] = useState<NotificationFilter>('all');
  const [enabled, setEnabled] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(notificationPreferences.map((p) => [p.id, p.enabled])),
  );

  const visible = notificationPreferences.filter((p) => filter === 'all' || p.category === filter);

  return (
    <Screen header={<AccountHeader title="Notification Preferences" />} contentStyle={styles.content}>
      <FilterChips options={notificationFilters} value={filter} onChange={setFilter} />
      <View style={styles.list}>
        {visible.map((pref) => (
          <View key={pref.id} style={styles.card}>
            <Image source={pref.icon} style={styles.icon} />
            <View style={styles.text}>
              <Text style={styles.title}>{pref.title}</Text>
              <Text style={styles.subtitle}>{pref.subtitle}</Text>
            </View>
            <ToggleSwitch
              value={enabled[pref.id]}
              onChange={(value) => setEnabled((prev) => ({ ...prev, [pref.id]: value }))}
              accessibilityLabel={pref.title}
            />
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 23, paddingBottom: 24 },
  list: { paddingHorizontal: 16, marginTop: 23, gap: 12 },
  card: {
    height: 64,
    borderWidth: 1,
    borderColor: accountColors.border,
    borderRadius: 12,
    paddingHorizontal: 11,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  text: { flex: 1 },
  title: { fontFamily: fonts.semibold, fontSize: 14, lineHeight: 20, color: palette.neutral0 },
  subtitle: { marginTop: 4, fontFamily: fonts.regular, fontSize: 12, lineHeight: 16, letterSpacing: 0.4, color: '#4F545E' },
});
