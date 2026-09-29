import { StyleSheet, Text, View } from 'react-native';

import { fonts } from '@/theme';

import { statusStyles, type RequestStatus } from '../data/collaboration';

export function StatusBadge({ status }: { status: RequestStatus }) {
  const s = statusStyles[status];
  return (
    <View style={[styles.badge, { backgroundColor: s.bg }]}>
      <Text style={[styles.label, { color: s.fg }]}>{s.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { height: 32, paddingHorizontal: 12, borderRadius: 12, justifyContent: 'center' },
  label: { fontFamily: fonts.medium, fontSize: 13, lineHeight: 18 },
});
