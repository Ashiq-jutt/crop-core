import type { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { TickCircle } from 'iconsax-react-native';

import { AppText, BottomSheet } from '@/components/ui';
import { colors, palette, radius, spacing } from '@/theme';

export type SheetOption<T extends string> = {
  value: T;
  label: string;
  description?: string;
  leading?: ReactNode;
};

type OptionSheetProps<T extends string> = {
  visible: boolean;
  title: string;
  options: SheetOption<T>[];
  value?: T;
  onSelect: (value: T) => void;
  onClose: () => void;
};

/** Single-choice picker presented in a BottomSheet; closes as soon as an option is chosen. */
export function OptionSheet<T extends string>({ visible, title, options, value, onSelect, onClose }: OptionSheetProps<T>) {
  return (
    <BottomSheet visible={visible} onClose={onClose} title={title}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {options.map((o) => {
          const selected = o.value === value;
          return (
            <Pressable
              key={o.value}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              accessibilityLabel={o.label}
              onPress={() => {
                onSelect(o.value);
                onClose();
              }}
              style={({ pressed }) => [styles.row, selected && styles.rowSelected, pressed && styles.pressed]}>
              {o.leading}
              <View style={styles.text}>
                <AppText variant="labelLargeStrong">{o.label}</AppText>
                {o.description ? (
                  <AppText variant="bodySmall" color={palette.neutral30}>
                    {o.description}
                  </AppText>
                ) : null}
              </View>
              <TickCircle
                size={22}
                variant={selected ? 'Bold' : 'Linear'}
                color={selected ? colors.primary : palette.neutral60}
              />
            </Pressable>
          );
        })}
      </ScrollView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  scroll: { maxHeight: 420 },
  list: { gap: spacing.sm },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    minHeight: 56,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  rowSelected: { borderColor: colors.primary, backgroundColor: colors.primarySurface },
  pressed: { opacity: 0.7 },
  text: { flex: 1, gap: 2 },
});
