import { StyleSheet, Text, View, type ImageSourcePropType } from 'react-native';

import { colors, fonts } from '@/theme';

import type { RequestStatus } from '../data/collaboration';
import { collabColors } from '../theme';
import { IconCircle } from './IconCircle';
import { MetaLine } from './MetaLine';
import { StatusBadge } from './StatusBadge';

type DetailHeaderCardProps = {
  title: string;
  meta: string[];
  icon: ImageSourcePropType;
  iconBg: string;
  status: RequestStatus;
  /** Equipment requests use a compact 40pt icon and a single-line title. */
  compact?: boolean;
};

export function DetailHeaderCard({ title, meta, icon, iconBg, status, compact }: DetailHeaderCardProps) {
  return (
    <View style={[styles.card, compact && styles.compact]}>
      <IconCircle source={icon} size={compact ? 40 : 48} background={iconBg} />
      <View style={styles.text}>
        <Text style={compact ? styles.compactTitle : styles.title}>{title}</Text>
        {meta.length ? <MetaLine items={meta} textStyle={styles.meta} /> : null}
      </View>
      <StatusBadge status={status} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    height: 72,
    borderWidth: 1,
    borderColor: collabColors.border,
    borderRadius: 12,
    paddingHorizontal: 11,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  compact: { height: 64 },
  text: { flex: 1, gap: 2 },
  title: { fontFamily: fonts.semibold, fontSize: 16, lineHeight: 22, color: colors.textPrimary },
  compactTitle: { fontFamily: fonts.semibold, fontSize: 14, lineHeight: 20, color: colors.textPrimary },
  meta: { fontSize: 12.8, lineHeight: 18, color: colors.textPrimary },
});
