import { Pressable, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { More } from 'iconsax-react-native';

import { AppText, DashedDivider } from '@/components/ui';
import { colors, palette } from '@/theme';

import { featuredField, type FieldStatusTone } from '../data/home';
import { homeStyles } from './homeStyles';

const chipTones: Record<FieldStatusTone, { bg: string; fg: string }> = {
  warning: { bg: colors.warningSurface, fg: colors.warning },
  success: { bg: colors.successSurface, fg: colors.success },
};

export function MyFieldsCard({ onPress }: { onPress?: () => void }) {
  const field = featuredField;
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={field.name} onPress={onPress} style={homeStyles.card}>
      <View style={styles.header}>
        <Image source={field.icon} style={styles.fieldIcon} />
        <View style={styles.flex}>
          <AppText variant="labelLargeStrong">{field.name}</AppText>
          <AppText variant="bodySmall" color={palette.neutral10} style={styles.area}>
            {field.area}
          </AppText>
        </View>
        <More size={24} variant="Bold" color={colors.textPrimary} style={styles.more} />
      </View>

      <DashedDivider color={palette.neutral90} style={styles.divider} />

      <View style={styles.crops}>
        {field.crops.map((c) => {
          const tone = chipTones[c.status.tone];
          return (
            <View key={c.name} style={styles.cropRow}>
              <Image source={c.badge} style={styles.badge} />
              <View style={styles.flex}>
                <AppText variant="labelMediumStrong">{c.name}</AppText>
                <AppText variant="bodySmall" color={palette.neutralColor30} style={styles.cropArea}>
                  {c.area}
                </AppText>
              </View>
              <View style={[styles.chip, { backgroundColor: tone.bg }]}>
                <AppText variant="labelMedium" color={tone.fg}>
                  {`${c.status.label} ${c.status.emoji}`}
                </AppText>
              </View>
            </View>
          );
        })}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  fieldIcon: { width: 32, height: 32, marginLeft: -4 },
  flex: { flex: 1 },
  area: { marginTop: 3 },
  more: { transform: [{ rotate: '90deg' }] },
  divider: { marginVertical: 12 },
  crops: { gap: 12 },
  cropRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  badge: { width: 36, height: 36 },
  cropArea: { marginTop: 2 },
  chip: { height: 32, justifyContent: 'center', paddingHorizontal: 12, borderRadius: 12 },
});
