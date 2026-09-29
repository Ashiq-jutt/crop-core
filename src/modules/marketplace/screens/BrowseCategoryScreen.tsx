import { useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Heart } from 'iconsax-react-native';

import { Screen } from '@/components/ui';

import { FilterChips } from '../components/FilterChips';
import { MarketHeader, WishCartIcons } from '../components/MarketHeader';
import { SearchRow } from '../components/SearchRow';
import { Txt } from '../components/Txt';
import { mk } from '../components/tokens';
import { categoryFilters, categoryGrid, categoryTitles, type GridItem } from '../data/products';

function GridCard({ item }: { item: GridItem }) {
  const [liked, setLiked] = useState(false);
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={item.name}
      onPress={() => router.push(`/marketplace/product/${item.id}`)}
      style={styles.card}>
      <View>
        <Image source={item.image} style={styles.image} />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={liked ? 'Remove from wishlist' : 'Add to wishlist'}
          accessibilityState={{ selected: liked }}
          onPress={() => setLiked((v) => !v)}
          style={styles.heart}>
          <Heart size={16} color={liked ? mk.orange : '#FFFFFF'} variant={liked ? 'Bold' : 'Linear'} />
        </Pressable>
      </View>
      <Txt size={14.5} weight="semibold" color={mk.ink} lineHeight={20} numberOfLines={2} style={styles.name}>
        {item.name}
      </Txt>
      <View style={styles.priceRow}>
        <Txt size={16.5} weight="semibold" color={mk.orange} lineHeight={22}>
          {item.price}
        </Txt>
        {item.oldPrice ? (
          <Txt size={13} color={mk.subtle} lineHeight={18} strike>
            {item.oldPrice}
          </Txt>
        ) : null}
      </View>
      <Txt size={14.5} weight="semibold" color={mk.ink} lineHeight={20} style={styles.size}>
        {item.size}
      </Txt>
    </Pressable>
  );
}

export function BrowseCategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [filter, setFilter] = useState<string | null>(null);
  const title = categoryTitles[id ?? ''] ?? 'Seeds';

  return (
    <Screen header={<MarketHeader title={title} right={<WishCartIcons />} />} contentStyle={styles.content}>
      <View style={styles.search}>
        <SearchRow placeholder="Search Product" />
      </View>
      <View style={styles.chips}>
        <FilterChips options={categoryFilters} selected={filter} onSelect={setFilter} />
      </View>
      <View style={styles.grid}>
        {categoryGrid.map((item) => (
          <GridCard key={item.id} item={item} />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 24 },
  search: { marginTop: 24 },
  chips: { marginTop: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, columnGap: 7, rowGap: 12, marginTop: 15 },
  card: { width: 168, height: 256, borderWidth: 1, borderColor: mk.border, borderRadius: 12, padding: 11 },
  image: { width: 145, height: 125, borderRadius: 8 },
  heart: {
    position: 'absolute',
    left: 107,
    top: 4,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2A2A2A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { marginTop: 8 },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 5 },
  size: { marginTop: 13 },
});
