import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { colors, palette } from '@/theme';

import { cropAdjustmentReasons } from '../data/fields';
import { ActionButton } from './ActionButton';
import { GlyphCircle } from './GlyphCircle';
import { FieldSheet } from './FieldSheet';
import { font, ink } from './text';

const cottonGlyph = require('@assets/images/fields/crop-cotton.png');

type CropAdjustmentSheetProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

/** "Crop Area Adjustment": ask what happened to the acreage that was removed from a crop. */
export function CropAdjustmentSheet({ visible, onClose, onSubmit }: CropAdjustmentSheetProps) {
  const [reason, setReason] = useState<string | null>(null);
  const [note, setNote] = useState('');
  return (
    <FieldSheet visible={visible} onClose={onClose} title="Crop Area Adjustment" bottomPadding={24}>
      <View style={styles.crop}>
        <GlyphCircle source={cottonGlyph} size={48} />
        <View>
          <Text style={styles.cropName}>Cotton</Text>
          <Text style={styles.cropNote}>Cotton Crop Reduced 0.8 Acer</Text>
        </View>
      </View>
      <Text style={styles.question}>Would You Like to Mark it as :</Text>
      <View style={styles.reasons}>
        {cropAdjustmentReasons.map((r) => {
          const active = r === reason;
          return (
            <Pressable
              key={r}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              accessibilityLabel={r}
              onPress={() => setReason(r)}
              style={[styles.reason, active && styles.reasonOn]}>
              <Text style={styles.reasonLabel}>{r}</Text>
            </Pressable>
          );
        })}
      </View>
      <TextInput
        value={note}
        onChangeText={setNote}
        placeholder="Add a short note (optional)..."
        placeholderTextColor={ink.muted}
        accessibilityLabel="Add a short note"
        multiline
        style={styles.note}
      />
      <ActionButton label="Update Feilds" onPress={onSubmit} height={50} style={styles.submit} labelStyle={styles.submitLabel} />
    </FieldSheet>
  );
}

const styles = StyleSheet.create({
  crop: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 12 },
  cropName: font('medium', 17, 24, ink.title),
  cropNote: font('regular', 13, 20, ink.body),
  question: { ...font('medium', 14.5, 22, ink.title), marginTop: 15 },
  reasons: { flexDirection: 'row', flexWrap: 'wrap', columnGap: 22, rowGap: 16, marginTop: 11 },
  reason: {
    height: 32,
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
    backgroundColor: palette.neutral95,
    borderWidth: 1,
    borderColor: palette.neutral95,
  },
  reasonOn: { backgroundColor: palette.primary95, borderColor: colors.primary },
  reasonLabel: font('regular', 12.5, 18, ink.title),
  note: {
    height: 72,
    marginTop: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E7E8EB',
    paddingHorizontal: 12,
    paddingTop: 10,
    textAlignVertical: 'top',
    ...font('regular', 13, 20, ink.title),
  },
  submit: { marginTop: 35 },
  submitLabel: font('medium', 17, 24),
});
