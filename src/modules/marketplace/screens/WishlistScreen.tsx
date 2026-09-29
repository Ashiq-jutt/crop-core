import { useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Heart, ShoppingCart } from 'iconsax-react-native';

import { Screen } from '@/components/ui';

import { FilterChips } from '../components/FilterChips';
import { HeaderIcon, MarketHeader } from '../components/MarketHeader';
import { SearchRow } from '../components/SearchRow';
import { Txt } from '../components/Txt';
import { mk } from '../components/tokens';
import { wishlist, wishlistFilters, type WishItem } from '../data/products';

function WishCard({ item, onRemove }: { item: WishItem; onRemove: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={item.name}
      onPress={() => router.push(`/marketplace/product/${item.id}`)}
      style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.info}>
        <Txt size={14.5} weight="semibold" color={mk.ink} lineHeight={20} style={styles.name}>
          {item.name}
        </Txt>
        <Txt size={13} color="#50555F" lineHeight={18} numberOfLines={1} style={styles.brand}>
          {item.brand}
        </Txt>
        <View style={styles.priceRow}>
          <Txt size={14.5} weight="semibold" color={mk.orange} lineHeight={20}>
            {item.price}
          </Txt>
          <Txt size={13} color={mk.subtle} lineHeight={18} strike>
            {item.oldPrice}
          </Txt>
        </View>
        <Txt size={14.5} weight="semibold" color={mk.ink} lineHeight={20} style={styles.size}>
          {item.size}
        </Txt>
      </View>
      <Pressable accessibilityRole="button" accessibilityLabel="Remove from wishlist" hitSlop={8} onPress={onRemove} style={styles.heart}>
        <Heart size={24} color={mk.orange} variant="Bold" />
      </Pressable>
    </Pressable>
  );
}

export function WishlistScreen() {
  const [items, setItems] = useState(wishlist);
  const [filter, setFilter] = useState<string | null>(null);

  return (
    <Screen
      header={<MarketHeader title="Wishlist" right={<HeaderIcon icon={ShoppingCart} label="Cart" onPress={() => router.push('/marketplace/cart')} />} />}
      contentStyle={styles.content}>
      <View style={styles.search}>
        <SearchRow placeholder="Search Product" />
      </View>
      <View style={styles.chips}>
        <FilterChips options={wishlistFilters} selected={filter} onSelect={setFilter} />
      </View>
      <View style={styles.list}>
        {items.map((item) => (
          <WishCard key={item.id} item={item} onRemove={() => setItems((xs) => xs.filter((x) => x.id !== item.id))} />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 24 },
  search: { marginTop: 24 },
  chips: { marginTop: 12 },
  list: { marginTop: 23, gap: 16, paddingHorizontal: 16 },
  card: {
    height: 144,
    borderWidth: 1,
    borderColor: mk.border,
    borderRadius: 12,
    flexDirection: 'row',
    padding: 11,
  },
  image: { width: 117, height: 121, borderRadius: 8 },
  info: { flex: 1, marginLeft: 11 },
  name: { marginTop: 1, width: 150 },
  brand: { marginTop: 6 },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 11 },
  size: { marginTop: 4 },
  heart: { position: 'absolute', right: 13, top: 12 },
});
