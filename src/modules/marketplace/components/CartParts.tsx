import { Image, Pressable, StyleSheet, View } from 'react-native';
import { Add, Minus } from 'iconsax-react-native';

import type { CartLine } from '../data/cart';
import { Txt } from './Txt';
import { mk } from './tokens';

type StepperProps = { qty: number; onChange: (qty: number) => void; name: string };

export function QtyStepper({ qty, onChange, name }: StepperProps) {
  return (
    <View style={styles.stepper}>
      <Pressable accessibilityRole="button" accessibilityLabel={`Decrease ${name}`} hitSlop={6} onPress={() => onChange(Math.max(1, qty - 1))}>
        <Minus size={18} color="#636466" />
      </Pressable>
      <Txt size={16} weight="semibold" color={mk.ink} lineHeight={20} style={styles.qty}>
        {qty}
      </Txt>
      <Pressable accessibilityRole="button" accessibilityLabel={`Increase ${name}`} hitSlop={6} onPress={() => onChange(qty + 1)} style={styles.plus}>
        <Add size={16} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}

type CartItemCardProps = { line: CartLine; onQty: (qty: number) => void };

export function CartItemCard({ line, onQty }: CartItemCardProps) {
  return (
    <View style={styles.card}>
      <Image source={line.image} style={styles.thumb} />
      <View style={styles.info}>
        <Txt size={13} weight="semibold" color={mk.ink} lineHeight={16} style={styles.name}>
          {line.name}
        </Txt>
        <Txt size={13} color="#34383E" lineHeight={18} numberOfLines={1} style={styles.brand}>
          {line.brand}
        </Txt>
        <View style={styles.priceRow}>
          <Txt size={13.5} weight="semibold" color={mk.orange} lineHeight={18}>
            {line.price}
          </Txt>
          <Txt size={13.5} color="#6D7380" lineHeight={18} strike>
            {line.oldPrice}
          </Txt>
        </View>
        <Txt size={14.5} weight="semibold" color={mk.ink} lineHeight={18} style={styles.size}>
          {line.size}
        </Txt>
      </View>
      <QtyStepper qty={line.qty} onChange={onQty} name={line.name} />
    </View>
  );
}

export type BillRow = { label: string; value: string };

type BillCardProps = { rows: BillRow[]; total: string };

export function BillCard({ rows, total }: BillCardProps) {
  return (
    <View style={styles.bill}>
      {rows.map((r) => (
        <View key={r.label} style={styles.billRow}>
          <Txt size={15} color="#232629" lineHeight={20}>
            {r.label}
          </Txt>
          <Txt size={15} color="#232629" lineHeight={20}>
            {r.value}
          </Txt>
        </View>
      ))}
      <View style={styles.billDivider} />
      <View style={styles.billTotal}>
        <Txt size={16.5} weight="semibold" color={mk.ink} lineHeight={22}>
          Total Amount
        </Txt>
        <Txt size={16.5} weight="semibold" color={mk.ink} lineHeight={22}>
          {total}
        </Txt>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stepper: {
    width: 88,
    height: 36,
    borderRadius: 18,
    backgroundColor: mk.surface,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 4,
  },
  qty: { flex: 1, textAlign: 'center' },
  plus: { width: 20, height: 20, borderRadius: 10, backgroundColor: mk.orange, alignItems: 'center', justifyContent: 'center' },
  card: {
    marginHorizontal: 16,
    height: 136,
    borderWidth: 1,
    borderColor: mk.border,
    borderRadius: 16,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 4,
    paddingTop: 15,
  },
  thumb: { width: 49, height: 49, borderRadius: 2 },
  info: { flex: 1, marginLeft: 15 },
  name: { marginTop: 1, width: 150 },
  brand: { marginTop: 4 },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  size: { marginTop: 6 },
  bill: {
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: mk.border,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingTop: 6,
    paddingBottom: 12,
  },
  billRow: { height: 32, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  billDivider: { height: 1, backgroundColor: mk.border, marginTop: 8 },
  billTotal: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 17 },
});
