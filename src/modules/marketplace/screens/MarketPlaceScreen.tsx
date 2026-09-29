import { Image, Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import { Screen } from '@/components/ui';

import { FeatureCard, IconCard, OfferCard, RecommendedCard } from '../components/Cards';
import { MarketHeader, WishCartIcons } from '../components/MarketHeader';
import { SearchRow } from '../components/SearchRow';
import { Carousel, SectionTitle } from '../components/Section';
import { Txt } from '../components/Txt';
import {
  agroSupplies,
  categories,
  equipments,
  featureItems,
  marketBanner,
  offers,
  quickActions,
  recommended,
} from '../data/products';

/** Left offset + width of each category column, measured off the Figma frame. */
const CATEGORY_SLOTS = [
  { marginLeft: 34, width: 56 },
  { marginLeft: 29, width: 54 },
  { marginLeft: 27, width: 69 },
  { marginLeft: 24, width: 62 },
];

const openProduct = (id: string) => router.push(`/marketplace/product/${id}`);
const openCategory = (id: string) => router.push(`/marketplace/category/${id}`);

export function MarketPlaceScreen() {
  return (
    <Screen edges={['top']} contentStyle={styles.content} header={<MarketHeader title="Marketplace" showBack={false} right={<WishCartIcons />} />}>
      <View style={styles.search}>
        <SearchRow placeholder="Search Team Member" />
      </View>

      <SectionTitle title="Category" style={styles.title24} />
      <View style={styles.categories}>
        {categories.map((c, i) => (
          <Pressable
            key={c.id}
            accessibilityRole="button"
            accessibilityLabel={c.label}
            onPress={() => openCategory(c.id)}
            style={[styles.category, CATEGORY_SLOTS[i]]}>
            <Image source={c.icon} style={styles.categoryIcon} />
            <Txt size={14} color="#101013" lineHeight={18}>
              {c.label}
            </Txt>
          </Pressable>
        ))}
      </View>

      <Pressable accessibilityRole="button" accessibilityLabel="Grow Smart. Save More. Up to 40% off on Agro Product" onPress={() => openCategory('seeds')}>
        <Image source={marketBanner} style={styles.banner} />
      </Pressable>

      <SectionTitle title="Feature Item" onViewAll={() => openCategory('seeds')} style={styles.title15} />
      <Carousel style={styles.rail12}>
        {featureItems.map((item) => (
          <FeatureCard key={item.id} item={item} onPress={() => openProduct(item.id)} />
        ))}
      </Carousel>

      <SectionTitle title="Explore By Equipments" onViewAll={() => openCategory('equipment')} style={styles.title16} />
      <Carousel style={styles.rail12} gap={12}>
        {equipments.map((e) => (
          <IconCard key={e.id} label={e.label} icon={e.icon} width={100} height={92} labelSize={15} gap={8} onPress={() => openCategory('equipment')} />
        ))}
      </Carousel>

      <SectionTitle title="Recmonded For You" onViewAll={() => openCategory('seeds')} style={styles.title17} />
      <Carousel style={styles.rail}>
        {recommended.map((item) => (
          <RecommendedCard key={item.id} item={item} onPress={() => openProduct(item.id)} />
        ))}
      </Carousel>

      <SectionTitle title="Quick Action" style={styles.title17} />
      <View style={[styles.quick, styles.rail]}>
        {quickActions.map((q) => (
          <IconCard key={q.id} label={q.label} icon={q.icon} width={168} height={84} labelSize={13.5} gap={3} onPress={() => router.push(q.href)} />
        ))}
      </View>

      <SectionTitle title="Offer For You" onViewAll={() => openCategory('fertilizer')} style={styles.title17} />
      <Carousel style={styles.rail}>
        {offers.map((item) => (
          <OfferCard key={item.id} item={item} onPress={() => openProduct(item.id)} />
        ))}
      </Carousel>

      <SectionTitle title="Agro Supplies" style={styles.title17} />
      <View style={styles.rail}>
        {agroSupplies.map((item) => (
          <OfferCard key={item.id} item={item} wide onPress={() => openProduct(item.id)} />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 120 },
  search: { marginTop: 24 },
  title24: { marginTop: 24 },
  title15: { marginTop: 15 },
  title16: { marginTop: 16 },
  title17: { marginTop: 17 },
  categories: { marginTop: 12, flexDirection: 'row' },
  category: { alignItems: 'center', gap: 9 },
  categoryIcon: { width: 54, height: 54 },
  banner: { marginTop: 17, marginHorizontal: 16, width: 344, height: 177, borderRadius: 20 },
  rail: { marginTop: 11 },
  rail12: { marginTop: 12 },
  quick: { flexDirection: 'row', gap: 8, marginHorizontal: 16 },
});
