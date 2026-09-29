import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Setting2, ShoppingCart, TickCircle } from 'iconsax-react-native';

import { Screen } from '@/components/ui';
import { colors, fonts, palette } from '@/theme';

import { AccountHeader } from '../components/AccountHeader';
import { FilterChips } from '../components/FilterChips';
import { accountColors } from '../components/tokens';
import {
  notificationFilters,
  notifications,
  type AppNotification,
  type NotificationFilter,
} from '../data/notifications';

function NotificationIconView({ icon }: { icon: AppNotification['icon'] }) {
  if (icon.kind === 'image') return <Image source={icon.source} style={styles.icon} />;
  return (
    <View style={[styles.icon, styles.iconDisc]}>
      {icon.kind === 'tick' ? (
        <TickCircle size={20} color={colors.success} variant="Bold" />
      ) : (
        <ShoppingCart size={20} color={palette.neutral0} />
      )}
    </View>
  );
}

export function NotificationsScreen() {
  const [filter, setFilter] = useState<NotificationFilter>('all');

  const sections = useMemo(() => {
    const visible = notifications.filter((n) => filter === 'all' || n.category === filter);
    return (['Today', 'This Week'] as const)
      .map((title) => ({ title, items: visible.filter((n) => n.section === title) }))
      .filter((section) => section.items.length > 0);
  }, [filter]);

  return (
    <Screen
      header={
        <AccountHeader
          title="Notification"
          right={
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Notification preferences"
              hitSlop={10}
              onPress={() => router.push('/account/notification-preferences')}>
              <Setting2 size={24} color={palette.neutral0} />
            </Pressable>
          }
        />
      }
      contentStyle={styles.content}>
      <FilterChips options={notificationFilters} value={filter} onChange={setFilter} />
      <View style={styles.body}>
        {sections.map((section, index) => (
          <View key={section.title}>
            <Text style={[styles.sectionTitle, index > 0 && styles.sectionTitleNext]}>{section.title}</Text>
            <View style={styles.list}>
              {section.items.map((item) => (
                <View key={item.id} style={styles.card}>
                  <View style={styles.titleRow}>
                    <NotificationIconView icon={item.icon} />
                    <Text style={styles.title} numberOfLines={1}>
                      {item.title}
                    </Text>
                  </View>
                  <Text style={styles.text}>{item.body}</Text>
                  <Text style={styles.time}>{item.time}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 23, paddingBottom: 24 },
  body: { paddingHorizontal: 16 },
  sectionTitle: {
    marginTop: 23,
    marginBottom: 12,
    fontFamily: fonts.semibold,
    fontSize: 16,
    lineHeight: 24,
    color: palette.neutral0,
  },
  sectionTitleNext: { marginTop: 12 },
  list: { gap: 8 },
  card: { borderWidth: 1, borderColor: accountColors.border, borderRadius: 12, padding: 11 },
  titleRow: { flexDirection: 'row', alignItems: 'center' },
  icon: { width: 36, height: 36, borderRadius: 18, marginRight: 8 },
  iconDisc: { backgroundColor: palette.neutral95, alignItems: 'center', justifyContent: 'center' },
  title: { flex: 1, fontFamily: fonts.semibold, fontSize: 14, lineHeight: 20, color: palette.neutral0 },
  text: { marginTop: 8, fontFamily: fonts.regular, fontSize: 14, lineHeight: 20, color: accountColors.body },
  time: { marginTop: 12, fontFamily: fonts.regular, fontSize: 12, lineHeight: 16, letterSpacing: 0.4, color: palette.neutral0 },
});
