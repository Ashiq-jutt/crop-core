import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { fonts } from '@/theme';

import { reviewChips, type Order } from '../data/orders';
import { PrimaryButton } from './FooterButton';
import { MarketSheet } from './MarketSheet';
import { OrderCard } from './OrderCard';
import { StarIcon } from './StarIcon';
import { Txt } from './Txt';
import { mk } from './tokens';

export const DELIVERED = { label: 'Delivered', color: '#3FC064', background: '#E8F8EC' };

type LeaveReviewSheetProps = { order: Order | null; onClose: () => void };

/** Remount (change `key`) per order so rating, chips and note start fresh. */
export function LeaveReviewSheet({ order, onClose }: LeaveReviewSheetProps) {
  const [stars, setStars] = useState(4);
  const [chips, setChips] = useState<string[]>(['Grain']);
  const [note, setNote] = useState('');

  const toggleChip = (c: string) => setChips((xs) => (xs.includes(c) ? xs.filter((x) => x !== c) : [...xs, c]));

  return (
    <MarketSheet visible={order !== null} onClose={onClose} title="Leave Review" titleTop={43} dividerTop={74} variant="thin">
      {order ? (
        <View>
          <View style={styles.card}>
            <OrderCard order={order} status={DELIVERED} imageHeight={110} />
          </View>
          <View style={styles.rule} />
          <Txt size={24} weight="semibold" color={mk.ink} lineHeight={30} align="center" style={styles.how}>
            How is your order?
          </Txt>
          <Txt size={13} color="#6D7380" lineHeight={18} align="center" style={styles.sub}>
            Please give your rating & also your review...
          </Txt>
          <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map((n) => (
              <Pressable key={n} accessibilityRole="button" accessibilityLabel={`${n} star`} onPress={() => setStars(n)}>
                <StarIcon size={30} color={n <= stars ? mk.orange : '#E3E5E8'} />
              </Pressable>
            ))}
          </View>
          <View style={[styles.rule, styles.ruleStars]} />
          <View style={styles.chips}>
            {reviewChips.map((c) => {
              const on = chips.includes(c);
              return (
                <Pressable
                  key={c}
                  accessibilityRole="button"
                  accessibilityState={{ selected: on }}
                  accessibilityLabel={c}
                  onPress={() => toggleChip(c)}
                  style={[styles.chip, on && styles.chipOn]}>
                  <Txt size={12.5} weight={on ? 'semibold' : 'regular'} color={on ? '#101214' : '#26282C'} lineHeight={18}>
                    {c}
                  </Txt>
                </Pressable>
              );
            })}
          </View>
          <Txt size={15.5} weight="semibold" color={mk.ink} lineHeight={22} style={styles.write}>
            Write Review
          </Txt>
          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder="Add a short note (optional)..."
            placeholderTextColor="#31363C"
            multiline
            accessibilityLabel="Write Review"
            style={styles.input}
          />
          <View style={styles.buttons}>
            <PrimaryButton label="Cancel" size={15.5} outline onPress={onClose} style={styles.flex} />
            <PrimaryButton label="Submit" size={15.5} weight="semibold" onPress={onClose} style={styles.flex} />
          </View>
        </View>
      ) : null}
    </MarketSheet>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  card: { marginTop: 16 },
  rule: { height: 1, backgroundColor: '#E7EDF0', marginHorizontal: 16, marginTop: 15 },
  how: { marginTop: 16 },
  sub: { marginTop: 10 },
  stars: { flexDirection: 'row', justifyContent: 'center', gap: 10, marginTop: 18 },
  ruleStars: { marginTop: 16 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', columnGap: 17, rowGap: 16, paddingHorizontal: 16, marginTop: 16 },
  chip: {
    height: 32,
    borderRadius: 12,
    backgroundColor: mk.surface,
    borderWidth: 1.5,
    borderColor: mk.surface,
    paddingHorizontal: 13,
    justifyContent: 'center',
  },
  chipOn: { height: 34, backgroundColor: mk.orangeSurface, borderColor: '#EB5F0F' },
  write: { marginTop: 16, paddingHorizontal: 16 },
  input: {
    marginTop: 12,
    marginHorizontal: 16,
    height: 118,
    borderWidth: 1,
    borderColor: mk.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingTop: 12,
    fontFamily: fonts.regular,
    fontSize: 12.5,
    color: mk.ink,
    textAlignVertical: 'top',
  },
  buttons: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, marginTop: 16 },
});
