import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { colors, fonts, palette } from '@/theme';

import { amountPlaceholder } from '../data/collaboration';
import { collabColors } from '../theme';
import { Radio } from './Radio';

type CompensationCardProps = {
  title: string;
  description: string;
  /** Present when the card is one of several choices (shows the radio + orange title). */
  selected?: boolean;
  onPress?: () => void;
  /** Present when an amount field is shown under the description. */
  amount?: { value: string; onChangeText?: (value: string) => void };
};

export function CompensationCard({ title, description, selected, onPress, amount }: CompensationCardProps) {
  const choice = selected !== undefined;
  return (
    <Pressable
      accessibilityRole={choice ? 'radio' : undefined}
      accessibilityState={choice ? { selected } : undefined}
      accessibilityLabel={title}
      disabled={!onPress}
      onPress={onPress}
      style={styles.card}>
      <View style={styles.head}>
        <View style={[styles.text, choice && styles.choiceText]}>
          <Text style={[styles.title, selected && styles.titleActive]}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        {choice ? <Radio selected={selected} size={20} /> : null}
      </View>
      {amount ? (
        <TextInput
          value={amount.value}
          onChangeText={amount.onChangeText}
          editable={!!amount.onChangeText}
          placeholder={amountPlaceholder}
          placeholderTextColor={palette.neutral30}
          accessibilityLabel="Compensation amount"
          keyboardType="numeric"
          style={styles.amount}
        />
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: collabColors.border,
    borderRadius: 12,
    paddingHorizontal: 11,
    paddingTop: 11,
    paddingBottom: 11,
  },
  head: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  choiceText: { marginRight: 28 },
  text: { flex: 1, gap: 4 },
  title: { fontFamily: fonts.semibold, fontSize: 14, lineHeight: 20, color: colors.textPrimary },
  titleActive: { color: colors.primary },
  description: { fontFamily: fonts.regular, fontSize: 12.8, lineHeight: 16, color: colors.textPrimary },
  amount: {
    marginTop: 13,
    height: 40,
    borderWidth: 1,
    borderColor: '#E9EBEE',
    borderRadius: 8,
    paddingHorizontal: 11,
    fontFamily: fonts.regular,
    fontSize: 12.8,
    color: colors.textPrimary,
  },
});
