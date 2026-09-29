import type { ReactNode } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import type { Order } from '../data/orders';
import { Txt } from './Txt';
import { mk } from './tokens';

type OrderCardProps = {
  order: Order;
  status: { label: string; color: string; background: string };
  imageHeight: number;
  action?: ReactNode;
};

export function OrderCard({ order, status, imageHeight, action }: OrderCardProps) {
  return (
    <View style={styles.card}>
      <Image source={order.image} style={[styles.image, { height: imageHeight }]} />
      <View style={styles.info}>
        <Txt size={14} weight="semibold" color={mk.ink} lineHeight={20} numberOfLines={1}>
          {order.name}
        </Txt>
        <View style={styles.meta}>
          {order.size ? (
            <>
              <Txt size={12.5} color="#393C43" lineHeight={18}>
                {order.size}
              </Txt>
              <View style={styles.dot} />
            </>
          ) : null}
          <Txt size={12.5} color="#393C43" lineHeight={18}>
            {order.orderNo}
          </Txt>
        </View>
        <View style={[styles.status, { backgroundColor: status.background }]}>
          <Txt size={10.5} weight="medium" color={status.color} lineHeight={16}>
            {status.label}
          </Txt>
        </View>
        <View style={styles.bottom}>
          <Txt size={17.5} weight="semibold" color={mk.ink} lineHeight={22}>
            {order.amount}
            <Txt size={13.5} weight="regular" color={mk.ink} lineHeight={22}>
              {order.cents}
            </Txt>
          </Txt>
          {action}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: mk.border,
    borderRadius: 12,
    flexDirection: 'row',
    padding: 11,
  },
  image: { width: 117, borderRadius: 8 },
  info: { flex: 1, marginLeft: 16 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 9, marginTop: 7 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#E3E5E8' },
  status: { alignSelf: 'flex-start', height: 25, borderRadius: 6, paddingHorizontal: 10, justifyContent: 'center', marginTop: 7 },
  bottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 },
});
