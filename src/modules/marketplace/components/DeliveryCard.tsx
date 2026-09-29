import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Edit2 } from 'iconsax-react-native';

import { delivery } from '../data/productDetail';
import { Txt } from './Txt';
import { mk } from './tokens';

/** "Deliver to / Estimated Delivery by" card shared by Product Details and Checkout. */
export function DeliveryCard() {
  const [index, setIndex] = useState(0);
  const onChange = () => setIndex((i) => (i + 1) % delivery.places.length);
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.flex}>
          <Txt size={13} color="#232629" lineHeight={18}>
            🚚 Deliver to
          </Txt>
          <Txt size={14.5} weight="semibold" color={mk.ink} lineHeight={20} style={styles.value}>
            {delivery.places[index]}
          </Txt>
        </View>
        <Pressable accessibilityRole="button" accessibilityLabel="Change delivery address" onPress={onChange} style={styles.change}>
          <Txt size={13} weight="semibold" color="#14161A" lineHeight={18}>
            Change
          </Txt>
          <Edit2 size={16} color="#14161A" />
        </Pressable>
      </View>
      <View style={styles.divider} />
      <View style={[styles.row, styles.rowLast]}>
        <View style={styles.flex}>
          <Txt size={13} color="#232629" lineHeight={18}>
            🚚 Estimated Delivery by:
          </Txt>
          <Txt size={14.5} weight="semibold" color={mk.ink} lineHeight={20} style={styles.value}>
            {delivery.date}
          </Txt>
        </View>
        <View style={styles.free}>
          <Txt size={13} weight="medium" color={mk.greenStrong} lineHeight={18}>
            Free Delivery
          </Txt>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderColor: mk.border, borderRadius: 16, paddingHorizontal: 15, marginHorizontal: 16 },
  row: { height: 65, flexDirection: 'row', alignItems: 'center' },
  rowLast: { height: 68, paddingBottom: 5 },
  flex: { flex: 1 },
  value: { marginTop: 4 },
  divider: { height: 1, backgroundColor: mk.border },
  change: {
    height: 32,
    borderRadius: 10,
    backgroundColor: mk.surface,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 7,
    gap: 8,
  },
  free: { height: 32, borderRadius: 10, backgroundColor: mk.greenSurface, justifyContent: 'center', paddingHorizontal: 12 },
});
