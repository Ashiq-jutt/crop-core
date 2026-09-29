import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { Edit2 } from 'iconsax-react-native';

import { palette } from '@/theme';

import { font, ink } from './text';

const plot = require('@assets/images/fields/plot-large.png');

type FieldSummaryCardProps = { title: string; subtitle: string; onEdit?: () => void };

/** Grey field banner at the top of the crop set-up screens. */
export function FieldSummaryCard({ title, subtitle, onEdit }: FieldSummaryCardProps) {
  return (
    <View style={styles.card}>
      <Image source={plot} style={styles.plot} contentFit="contain" />
      <View style={styles.flex}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      {onEdit ? (
        <Pressable accessibilityRole="button" accessibilityLabel="Edit field" hitSlop={10} onPress={onEdit} style={styles.edit}>
          <Edit2 size={24} color={ink.title} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 72,
    borderRadius: 12,
    backgroundColor: palette.neutral95,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 16,
  },
  plot: { width: 56, height: 56, marginRight: -1 },
  flex: { flex: 1 },
  title: font('medium', 14.5, 22, ink.title),
  subtitle: { ...font('regular', 13, 20, ink.muted), marginTop: 2 },
  edit: { marginLeft: 12 },
});
