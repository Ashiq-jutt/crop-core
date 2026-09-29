import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Heart } from 'iconsax-react-native';

import { Screen } from '@/components/ui';

import { RecommendedCard } from '../components/Cards';
import { BillCard, CartItemCard } from '../components/CartParts';
import { PrimaryButton } from '../components/FooterButton';
import { HeaderIcon, MarketHeader } from '../components/MarketHeader';
import { Carousel, SectionTitle } from '../components/Section';
import { Txt } from '../components/Txt';
import { mk } from '../components/tokens';
import { billSubtotal, cartLines, TAX } from '../data/cart';
import { recommended } from '../data/products';

export function CartScreen() {
  const [lines, setLines] = useState(cartLines);
  const subtotal = billSubtotal(lines);
  const total = `$${(subtotal + TAX).toFixed(2)}`;
  const setQty = (id: string, qty: number) => setLines((ls) => ls.map((l) => (l.id === id ? { ...l, qty } : l)));

  return (
    <Screen
      header={<MarketHeader title="Cart" right={<HeaderIcon icon={Heart} label="Wishlist" onPress={() => router.push('/marketplace/wishlist')} />} />}
      footer={
        <View style={styles.footer}>
          <View>
            <Txt size={24} weight="semibold" color={mk.ink} lineHeight={30}>
              {total}
            </Txt>
            <Txt size={13} color={mk.muted} lineHeight={16} style={styles.net}>
              Net Prize
            </Txt>
          </View>
          <PrimaryButton label="Procced to Buy" onPress={() => router.push('/marketplace/checkout')} style={styles.buy} />
        </View>
      }>
      <View style={styles.items}>
        {lines.map((l) => (
          <CartItemCard key={l.id} line={l} onQty={(q) => setQty(l.id, q)} />
        ))}
      </View>
      <Txt size={14.5} weight="semibold" color={mk.ink} lineHeight={20} style={styles.label}>
        Bill Details
      </Txt>
      <BillCard
        rows={[
          { label: 'Prize', value: `$${subtotal.toFixed(2)}` },
          { label: 'Delivery Charge', value: 'Free' },
          { label: 'Tax', value: `$${TAX.toFixed(1)}` },
        ]}
        total={total}
      />
      <SectionTitle title="You Might Like This" style={styles.like} />
      <Carousel style={styles.rail}>
        {recommended.map((item) => (
          <RecommendedCard key={item.id} item={item} onPress={() => router.push(`/marketplace/product/${item.id}`)} />
        ))}
      </Carousel>
    </Screen>
  );
}

const styles = StyleSheet.create({
  items: { marginTop: 24, gap: 12 },
  label: { marginTop: 13, marginBottom: 11, paddingHorizontal: 16 },
  like: { marginTop: 12 },
  rail: { marginTop: 12, marginBottom: 24 },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 26,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -4 },
  },
  net: { marginTop: 5 },
  buy: { width: 165 },
});
