import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';

import { colors, fonts, palette } from '@/theme';

import { images, type MyRequest } from '../data/collaboration';
import { collabColors } from '../theme';
import { CalendarCircle } from './CalendarCircle';
import { IconCircle } from './IconCircle';
import { MetaLine } from './MetaLine';
import { StatusBadge } from './StatusBadge';

type MyRequestCardProps = { request: MyRequest; onPress: () => void };

export function MyRequestCard({ request, onPress }: MyRequestCardProps) {
  const { person } = request;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${request.task} request`}
      onPress={onPress}
      style={styles.card}>
      <View style={styles.top}>
        <IconCircle source={request.icon} size={36} background={request.iconBg} />
        <View style={styles.titleBlock}>
          <Text style={styles.title}>{request.task}</Text>
          <MetaLine items={request.meta} />
        </View>
        <StatusBadge status={request.status} />
      </View>

      {request.date && person ? (
        <View style={styles.infoRow}>
          <View style={[styles.half, styles.leftHalf]}>
            <CalendarCircle />
            <View>
              <Text style={styles.label}>Date</Text>
              <Text style={styles.value}>{request.date}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={[styles.half, styles.rightHalf]}>
            <Image source={person.avatar} style={{ width: person.avatarWidth, height: 24 }} contentFit="contain" />
            <View>
              <Text style={styles.label}>{person.label}</Text>
              <Text style={styles.value}>{person.value}</Text>
            </View>
          </View>
        </View>
      ) : null}

      {request.message ? <Text style={styles.message}>{request.message}</Text> : null}

      {request.acceptedNote ? (
        <View style={styles.strip}>
          <Image source={images.davidMalan} style={styles.stripAvatar} />
          <Text style={styles.stripText}>{request.acceptedNote}</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: collabColors.border,
    borderRadius: 12,
    padding: 11,
    backgroundColor: colors.surface,
  },
  top: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  titleBlock: { flex: 1, gap: 3, marginTop: -2 },
  title: { fontFamily: fonts.semibold, fontSize: 13, lineHeight: 18, color: colors.textPrimary },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginTop: 16 },
  half: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  leftHalf: { width: 158 },
  rightHalf: { flex: 1, paddingLeft: 23 },
  divider: { width: 2, height: 22, backgroundColor: '#676767' },
  label: { fontFamily: fonts.regular, fontSize: 12.5, lineHeight: 16, color: palette.neutral30 },
  value: { fontFamily: fonts.semibold, fontSize: 14, lineHeight: 20, color: colors.textPrimary },
  message: {
    marginTop: 16,
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 15.5,
    marginBottom: 1,
    color: colors.textPrimary,
  },
  strip: {
    marginTop: 16,
    height: 40,
    borderRadius: 8,
    backgroundColor: collabColors.greenSurface,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    gap: 10,
  },
  stripAvatar: { width: 28, height: 28, borderRadius: 14 },
  stripText: { fontFamily: fonts.regular, fontSize: 13, lineHeight: 20, color: colors.textPrimary },
});
