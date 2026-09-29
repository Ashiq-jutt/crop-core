import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '@/theme';

import { collabColors } from '../theme';
import { DotsGlyph } from './Glyphs';

type MoreMenuProps = { actions: { label: string; onPress: () => void }[] };

/** Header "•••" button with a small action popover. */
export function MoreMenu({ actions }: MoreMenuProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Pressable accessibilityRole="button" accessibilityLabel="More options" hitSlop={8} onPress={() => setOpen(true)}>
        <DotsGlyph color={colors.textPrimary} />
      </Pressable>
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} accessibilityLabel="Close menu" onPress={() => setOpen(false)} />
        <View style={styles.menu}>
          {actions.map((a) => (
            <Pressable
              key={a.label}
              accessibilityRole="menuitem"
              onPress={() => {
                setOpen(false);
                a.onPress();
              }}
              style={styles.item}>
              <Text style={styles.label}>{a.label}</Text>
            </Pressable>
          ))}
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: { ...StyleSheet.absoluteFill },
  menu: {
    position: 'absolute',
    top: 64,
    right: 16,
    minWidth: 180,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: collabColors.border,
    backgroundColor: colors.surface,
    paddingVertical: 4,
    boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.08)',
  },
  item: { paddingHorizontal: 16, paddingVertical: 12 },
  label: { fontFamily: fonts.medium, fontSize: 14, lineHeight: 20, color: colors.textPrimary },
});
