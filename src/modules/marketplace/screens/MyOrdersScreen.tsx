import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ShoppingCart } from 'iconsax-react-native';

import { Screen } from '@/components/ui';

import { DELIVERED, LeaveReviewSheet } from '../components/LeaveReviewSheet';
import { HeaderIcon, MarketHeader } from '../components/MarketHeader';
import { OrderCard } from '../components/OrderCard';
import { SegmentTabs } from '../components/SegmentTabs';
import { Txt } from '../components/Txt';
import { mk } from '../components/tokens';
import { completedOrders, incomingOrders, type Order } from '../data/orders';

const TABS = [
  { id: 'incoming', label: 'Incoming' },
  { id: 'completed', label: 'Completed' },
] as const;

const IN_TRANSIT = { label: 'In Transit', color: mk.orange, background: mk.orangeSurface };

export function MyOrdersScreen() {
  const [tab, setTab] = useState<'incoming' | 'completed'>('completed');
  const { review } = useLocalSearchParams<{ review?: string }>();
  const [reviewing, setReviewing] = useState<Order | null>(completedOrders.find((o) => o.id === review) ?? null);
  const orders = tab === 'completed' ? completedOrders : incomingOrders;

  return (
    <Screen
      header={<MarketHeader title="My Orders" right={<HeaderIcon icon={ShoppingCart} label="Cart" onPress={() => router.push('/marketplace/cart')} />} />}
      contentStyle={styles.content}>
      <SegmentTabs options={TABS} value={tab} onChange={setTab} height={42} style={styles.tabs} />
      <View style={styles.rule} />
      <View style={styles.list}>
        {orders.map((o) => (
          <OrderCard
            key={o.id}
            order={o}
            status={tab === 'completed' ? DELIVERED : IN_TRANSIT}
            imageHeight={118}
            action={
              tab === 'completed' ? (
                <Pressable accessibilityRole="button" accessibilityLabel={`Leave review for ${o.name}`} onPress={() => setReviewing(o)} style={styles.review}>
                  <Txt size={12.5} weight="medium" color="#FFFFFF" lineHeight={18}>
                    Leave Review
                  </Txt>
                </Pressable>
              ) : null
            }
          />
        ))}
      </View>
      <LeaveReviewSheet key={reviewing?.id ?? 'none'} order={reviewing} onClose={() => setReviewing(null)} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 24 },
  tabs: { marginTop: 23 },
  rule: { height: 1, backgroundColor: '#E6E8EA', marginTop: 14 },
  list: { marginTop: 15, gap: 15 },
  review: { height: 34, borderRadius: 17, backgroundColor: '#EB5C0A', paddingHorizontal: 12, justifyContent: 'center' },
});
