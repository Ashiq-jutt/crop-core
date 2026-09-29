import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { palette } from '@/theme';

import { font, ink } from './text';

type FieldSheetProps = {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  /** Extra space under the content (the frames end 16 or 24pt below the last button). */
  bottomPadding?: number;
  background?: string;
  /** The Add Task sheet uses a darker handle, a smaller title and a looser divider. */
  variant?: 'field' | 'task';
};

/**
 * Bottom sheet as drawn in the Field / Diagnosis frames: grab handle, left title,
 * hairline divider, then content. Scrolls when taller than the screen.
 */
export function FieldSheet({
  visible,
  onClose,
  title,
  children,
  bottomPadding = 16,
  background = palette.neutral100,
  variant = 'field',
}: FieldSheetProps) {
  const task = variant === 'task';
  const insets = useSafeAreaInsets();
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.root}>
        <Pressable style={styles.backdrop} onPress={onClose} accessibilityRole="button" accessibilityLabel="Close" />
        <View style={[styles.sheet, { backgroundColor: background }]}>
          <View style={[styles.handle, task && styles.handleTask]} />
          <Text style={[styles.title, task && styles.titleTask]}>{title}</Text>
          <View style={[styles.divider, task && styles.dividerTask]} />
          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: bottomPadding + insets.bottom }}>
            {children}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(19,20,22,0.45)' },
  sheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 13,
    maxHeight: '94%',
  },
  handle: { alignSelf: 'center', width: 40, height: 7, borderRadius: 4, backgroundColor: ink.cardBorder },
  title: { ...font('medium', 17, 24, ink.title), marginTop: 8 },
  handleTask: { backgroundColor: '#ADB5BA' },
  titleTask: font('medium', 16, 24, ink.title),
  dividerTask: { marginTop: 15 },
  divider: { height: 1, backgroundColor: '#E7E8EB', marginTop: 8 },
});
