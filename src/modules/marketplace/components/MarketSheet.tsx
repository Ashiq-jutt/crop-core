import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Txt } from './Txt';
import { mk } from './tokens';

type MarketSheetProps = {
  visible: boolean;
  onClose: () => void;
  title: string;
  /** y of the title line box and of the hairline under it, measured from the sheet top. */
  titleTop: number;
  dividerTop: number;
  /** `thin` = the 36×3 light handle of the Leave Review frame. */
  variant?: 'default' | 'thin';
  children: ReactNode;
};

/** Module sheet: #FBFBFB (or white) panel, grab handle, left title and a hairline, as in the Figma sheets. */
export function MarketSheet({ visible, onClose, title, titleTop, dividerTop, variant = 'default', children }: MarketSheetProps) {
  const insets = useSafeAreaInsets();
  const thin = variant === 'thin';
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.root}>
        <Pressable style={styles.backdrop} onPress={onClose} accessibilityRole="button" accessibilityLabel="Close" />
        <View style={[styles.sheet, thin && styles.sheetWhite, { paddingBottom: (thin ? 22 : 16) + insets.bottom }]}>
          <View style={[styles.head, { height: dividerTop + 1 }]}>
            <View style={thin ? styles.handleThin : styles.handle} />
            <Txt size={16} weight="medium" color={mk.ink} lineHeight={24} style={[styles.title, { top: titleTop }]}>
              {title}
            </Txt>
            <View style={[styles.divider, { top: dividerTop }]} />
          </View>
          {children}
        </View>
      </KeyboardAvoidingView>
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
    maxHeight: '97%',
  },
  sheetWhite: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#F3F4F6' },
  head: { position: 'relative' },
  handle: { position: 'absolute', top: 16, left: '50%', marginLeft: -20, width: 40, height: 8, borderRadius: 4, backgroundColor: '#ACB4B9' },
  handleThin: { position: 'absolute', top: 24, left: '50%', marginLeft: -18, width: 36, height: 3, borderRadius: 2, backgroundColor: '#DDDDDD' },
  title: { position: 'absolute', left: 16 },
  divider: { position: 'absolute', left: 16, right: 16, height: 1, backgroundColor: '#E7EDF0' },
});
