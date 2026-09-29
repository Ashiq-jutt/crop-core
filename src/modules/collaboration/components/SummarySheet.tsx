import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, fonts, palette } from '@/theme';

import { collabColors } from '../theme';
import { PrimaryButton } from './PrimaryButton';

type SummarySheetProps = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  rows: { label: string; value: string }[];
  note: string;
};

/** Figma 04 / 12 — "Request Summary" bottom sheet. */
export function SummarySheet({ visible, onClose, onConfirm, rows, note }: SummarySheetProps) {
  const insets = useSafeAreaInsets();
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.root}>
        <Pressable style={styles.backdrop} onPress={onClose} accessibilityLabel="Close summary" />
        <View style={[styles.sheet, { paddingBottom: 15 + insets.bottom }]}>
          <View style={styles.handle} />
          <Text style={styles.title}>Request Summary</Text>
          {rows.map((r) => (
            <View key={r.label} style={styles.row}>
              <Text style={styles.label}>{r.label}</Text>
              <Text style={styles.value}>{r.value}</Text>
            </View>
          ))}
          <View style={styles.noteBlock}>
            <Text style={styles.label}>Short Note</Text>
            <Text style={styles.note}>{note}</Text>
          </View>
          <PrimaryButton label="Confirm" onPress={onConfirm} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(19,20,22,0.45)' },
  sheet: {
    backgroundColor: '#FBFBFB',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  handle: { alignSelf: 'center', width: 40, height: 8, borderRadius: 4, backgroundColor: '#ACB4B9' },
  title: {
    marginTop: 10,
    paddingBottom: 18,
    fontFamily: fonts.semibold,
    fontSize: 15,
    lineHeight: 20,
    color: colors.textPrimary,
    borderBottomWidth: 1,
    borderBottomColor: collabColors.border,
    marginBottom: 16,
  },
  row: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: collabColors.border,
  },
  label: { fontFamily: fonts.regular, fontSize: 14.3, lineHeight: 20, color: palette.neutral20 },
  value: { fontFamily: fonts.semibold, fontSize: 14.2, lineHeight: 20, color: colors.textPrimary },
  noteBlock: { paddingTop: 8, paddingBottom: 24, gap: 8 },
  note: { fontFamily: fonts.semibold, fontSize: 14.2, lineHeight: 20, color: colors.textPrimary },
});
