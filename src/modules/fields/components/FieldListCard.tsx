import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { Add } from 'iconsax-react-native';

import { DashedDivider } from '@/components/ui';
import { palette } from '@/theme';

import { cropBadgesSmall, cropOption } from '../data/crops';
import type { Field } from '../data/fields';
import { ActionButton } from './ActionButton';
import { MoreDots, StatusChip } from './Chips';
import { GlyphCircle } from './GlyphCircle';
import { font, ink } from './text';

const plotIcon = require('@assets/images/fields/plot.png');
const noCropIcon = require('@assets/images/fields/no-crop.png');

type FieldListCardProps = {
  field: Field;
  onOpen: () => void;
  onMore: () => void;
  onAddCrop: () => void;
};

export function FieldListCard({ field, onOpen, onMore, onAddCrop }: FieldListCardProps) {
  const empty = field.crops.length === 0;
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={`Open ${field.name}`} onPress={onOpen} style={styles.card}>
      <View style={[styles.header, empty && styles.headerEmpty]}>
        {empty ? null : <Image source={plotIcon} style={styles.plot} contentFit="contain" />}
        <View style={styles.flex}>
          <Text style={styles.name}>{field.name}</Text>
          <Text style={styles.area}>{field.area}</Text>
        </View>
        <Pressable accessibilityRole="button" accessibilityLabel={`${field.name} options`} hitSlop={10} onPress={onMore}>
          <MoreDots />
        </Pressable>
      </View>

      {empty ? (
        <View style={styles.empty}>
          <Image source={noCropIcon} style={styles.noCrop} />
          <Text style={styles.emptyTitle}>No Crop Assigned</Text>
          <Text style={styles.emptyBody}>Select a Crop to Plant This Season</Text>
          <DashedDivider style={styles.emptyDivider} />
          <ActionButton
            label="Add Crop"
            variant="muted"
            height={36}
            radius={8}
            onPress={onAddCrop}
            leftIcon={<Add size={20} color={ink.title} />}
            labelStyle={styles.addCropLabel}
            style={styles.addCrop}
          />
        </View>
      ) : (
        <>
          <DashedDivider style={styles.divider} />
          <View style={styles.crops}>
            {field.crops.map((c) => {
              const badge = cropBadgesSmall[c.crop];
              return (
                <View key={c.name} style={styles.cropRow}>
                  {badge ? (
                    <Image source={badge} style={styles.badge} />
                  ) : (
                    <GlyphCircle source={cropOption(c.crop).glyph} size={36} />
                  )}
                  <View style={styles.flex}>
                    <Text style={styles.cropName}>{c.name}</Text>
                    <Text style={styles.cropArea}>{c.area}</Text>
                  </View>
                  <StatusChip status={c.status} />
                </View>
              );
            })}
          </View>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#E7E8EB',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 9,
    backgroundColor: palette.neutral100,
  },
  header: { flexDirection: 'row', alignItems: 'center', gap: 13 },
  headerEmpty: { alignItems: 'flex-start' },
  plot: { width: 29, height: 29, marginLeft: -2 },
  flex: { flex: 1 },
  name: font('medium', 14.5, 22, ink.title),
  area: font('regular', 13, 20, ink.body),
  divider: { marginTop: 9, marginBottom: 10 },
  crops: { gap: 8 },
  cropRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  badge: { width: 36, height: 36 },
  cropName: font('medium', 13, 20, ink.title),
  cropArea: font('regular', 13, 20, ink.body),
  empty: { alignItems: 'center', paddingTop: 14 },
  noCrop: { width: 40, height: 40 },
  emptyTitle: { ...font('medium', 14.5, 22, ink.title), marginTop: 9 },
  emptyBody: font('regular', 12.5, 20, ink.body),
  emptyDivider: { alignSelf: 'stretch', marginTop: 12, marginBottom: 16 },
  addCrop: { alignSelf: 'stretch', borderColor: '#E7E8EB' },
  addCropLabel: font('regular', 15, 22, ink.title),
});
