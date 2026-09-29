import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import { Screen } from '@/components/ui';

import { BillCard, CartItemCard } from '../components/CartParts';
import { DeliveryCard } from '../components/DeliveryCard';
import { FooterButton } from '../components/FooterButton';
import { MarketHeader } from '../components/MarketHeader';
import { Txt } from '../components/Txt';
import { billSubtotal, checkoutLines, TAX } from '../data/cart';

export function CheckoutScreen() {
  const [lines, setLines] = useState(checkoutLines);
  const subtotal = billSubtotal(lines);
  const setQty = (id: string, qty: number) => setLines((ls) => ls.map((l) => (l.id === id ? { ...l, qty } : l)));

  return (
    <Screen
      header={<MarketHeader title="Checkout" />}
      footer={<FooterButton label="Procees to Pay" onPress={() => router.push('/marketplace/orders')} />}>
      <View style={styles.items}>
        {lines.map((l) => (
          <CartItemCard key={l.id} line={l} onQty={(q) => setQty(l.id, q)} />
        ))}
      </View>
      <Txt size={14.5} weight="semibold" color="#121519" lineHeight={20} style={styles.label}>
        Delivery Address
      </Txt>
      <DeliveryCard />
      <Txt size={14.5} weight="semibold" color="#121519" lineHeight={20} style={styles.label}>
        Bill Details
      </Txt>
      <BillCard
        rows={[
          { label: 'Prize', value: `$${subtotal.toFixed(2)}` },
          { label: 'Delivery Charge', value: 'Free' },
          { label: 'Tax', value: `$${TAX.toFixed(1)}` },
        ]}
        total={`$${(subtotal + TAX).toFixed(1)}`}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  items: { marginTop: 24, gap: 12 },
  label: { marginTop: 13, marginBottom: 11, paddingHorizontal: 16 },
});
