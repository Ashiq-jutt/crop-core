import { Platform, Pressable, StyleSheet, View } from 'react-native';

import { icons } from '@/components/icons';
import { AppText, IconButton, SvgIcon } from '@/components/ui';
import { colors, radius, spacing } from '@/theme';

import type { Language } from '../data/languages';

type Props = {
  language: Language;
  selected: boolean;
  onPress: () => void;
  onSpeak: () => void;
};

/** "Langauge Name" component — Default and Selected variants. */
export function LanguageCard({ language, selected, onPress, onSpeak }: Props) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      onPress={onPress}
      style={[styles.card, selected && styles.cardSelected]}>
      <View style={styles.text}>
        <AppText variant="labelLargeStrong" style={styles.nativeName}>
          {language.nativeName}
        </AppText>
        <AppText variant="bodySmall" color={selected ? colors.textPrimary : colors.textSecondary}>
          {language.name}
        </AppText>
      </View>
      <IconButton
        accessibilityLabel={`Hear ${language.name}`}
        onPress={onSpeak}
        background={selected ? colors.primary : colors.surfaceMuted}
        icon={<SvgIcon source={selected ? icons.volumeHighWhite : icons.volumeHigh} width={16} />}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySurface,
  },
  text: { flex: 1, gap: spacing.xxs },
  /** Indic scripts render with a fallback font on web; ask it for the bold face the design shows. */
  nativeName: Platform.select({ web: { fontWeight: '700' }, default: {} }),
});
