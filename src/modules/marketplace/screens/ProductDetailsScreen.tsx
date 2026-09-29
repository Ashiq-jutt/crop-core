import { useState } from 'react';
import { Image, Pressable, ScrollView, Share, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { ArrowRight2 } from 'iconsax-react-native';

import { Screen } from '@/components/ui';

import { DeliveryCard } from '../components/DeliveryCard';
import { MarketHeader, WishCartIcons } from '../components/MarketHeader';
import { RatingSummary, ReviewCard } from '../components/Reviews';
import { SectionTitle } from '../components/Section';
import { Txt } from '../components/Txt';
import { mk } from '../components/tokens';
import { comboOffer, productDetail as p, productReviews } from '../data/productDetail';

const bulb = require('@assets/images/marketplace/bulb.png');
const starHalf = require('@assets/images/marketplace/star-half.png');
const shareIcon = require('@assets/images/marketplace/icon-share.png');

export function ProductDetailsScreen() {
  const [variantId, setVariantId] = useState(p.variants[0].id);
  const [expanded, setExpanded] = useState(false);
  const variant = p.variants.find((v) => v.id === variantId) ?? p.variants[0];

  return (
    <Screen
      header={
        <MarketHeader
          title="Product Details"
          right={
            <>
              <WishCartIcons />
              <Pressable accessibilityRole="button" accessibilityLabel="Share product" hitSlop={8} onPress={() => Share.share({ message: `${p.name} – ${p.price}` })}>
                <Image source={shareIcon} style={styles.share} />
              </Pressable>
            </>
          }
        />
      }
      footer={
        <View style={styles.footer}>
          <View style={styles.footRow}>
            <Txt size={12.5} color="#7E838E" lineHeight={18}>
              Size
            </Txt>
            <Txt size={12.5} color="#7E838E" lineHeight={18}>
              Total Prize
            </Txt>
          </View>
          <View style={[styles.footRow, styles.footValues]}>
            <Txt size={14.5} weight="semibold" color={mk.ink} lineHeight={20}>
              {variant.footSize}
            </Txt>
            <Txt size={14.5} weight="semibold" color={mk.ink} lineHeight={20}>
              {variant.total}
            </Txt>
          </View>
          <View style={styles.footButtons}>
            <Pressable accessibilityRole="button" accessibilityLabel="Add to Cart" onPress={() => router.push('/marketplace/cart')} style={[styles.footBtn, styles.outline]}>
              <Txt size={15.5} weight="medium" color={mk.orange} lineHeight={24}>
                Add to Cart
              </Txt>
            </Pressable>
            <Pressable accessibilityRole="button" accessibilityLabel="Buy Now" onPress={() => router.push('/marketplace/checkout')} style={[styles.footBtn, styles.filled]}>
              <Txt size={16.5} weight="semibold" color="#FFFFFF" lineHeight={24}>
                Buy Now
              </Txt>
            </Pressable>
          </View>
        </View>
      }>
      <Image source={p.image} style={styles.hero} accessibilityLabel={p.name} />

      <View style={styles.titleRow}>
        <View style={styles.flex}>
          <Txt size={16.5} weight="semibold" color={mk.ink} lineHeight={20}>
            {p.name}
          </Txt>
          <Txt size={14.5} color="#34383E" lineHeight={18} style={styles.brand}>
            {p.brand}
          </Txt>
        </View>
        <View style={styles.ratingCol}>
          <View style={styles.ratingRow}>
            <Image source={starHalf} style={styles.starHalf} />
            <Txt size={14} color="#222222" lineHeight={18}>
              {p.rating}
            </Txt>
          </View>
          <Txt size={12} color="#818181" lineHeight={16} style={styles.reviewCount}>
            {p.reviews}
          </Txt>
        </View>
      </View>

      <View style={styles.priceRow}>
        <View style={styles.flex}>
          <Txt size={12} color={mk.muted} lineHeight={16} strike>
            {p.oldPrice}
          </Txt>
          <Txt size={25} weight="semibold" color="#E84100" lineHeight={32}>
            {p.price}
          </Txt>
        </View>
        <Txt size={14.5} weight="semibold" color={mk.ink} lineHeight={20} style={styles.size}>
          {p.size}
        </Txt>
      </View>

      <View style={styles.discount}>
        <Image source={bulb} style={styles.bulb} />
        <Txt size={13} color="#0E0E0E" lineHeight={18}>
          {p.discount}
        </Txt>
      </View>

      <SectionTitle title="Description" style={styles.mt15} size={17} />
      <View style={styles.descCard}>
        <Txt size={15.5} color="#595959" lineHeight={20} numberOfLines={expanded ? undefined : 2} style={styles.lorem}>
          {p.description}
          <Txt size={15.5} color={mk.orange} lineHeight={20} onPress={() => setExpanded((v) => !v)} accessibilityRole="button">
            {expanded ? 'Show Less' : 'Show More...'}
          </Txt>
        </Txt>
        {p.specs.map((s, i) => (
          <View key={s.label} style={[styles.spec, i > 0 && styles.specDivider]}>
            <Txt size={14.5} color="#33373D" lineHeight={20}>
              {s.label}
            </Txt>
            <Txt size={14.5} weight="semibold" color={mk.ink} lineHeight={20}>
              {s.value}
            </Txt>
          </View>
        ))}
      </View>

      <SectionTitle title="Product Variant" style={styles.mt16} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.variantRail} contentContainerStyle={styles.variantContent}>
        {p.variants.map((v) => {
          const active = v.id === variantId;
          return (
            <Pressable
              key={v.id}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              accessibilityLabel={`${v.size} ${v.price}`}
              onPress={() => setVariantId(v.id)}
              style={[styles.variant, active && styles.variantActive]}>
              <View style={styles.variantOff}>
                <Txt size={13} color={mk.orange} lineHeight={18}>
                  {v.off}
                </Txt>
              </View>
              <Txt size={14.5} weight="medium" color={mk.ink} lineHeight={20} style={styles.variantSize}>
                {v.size}
              </Txt>
              <View style={styles.variantLine} />
              <Txt size={16.5} weight="semibold" color={mk.orange} lineHeight={22} style={styles.variantPrice}>
                {v.price}
              </Txt>
              <Txt size={13} color="#6E7481" lineHeight={18} strike style={styles.variantOld}>
                {v.oldPrice}
              </Txt>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.mt16}>
        <DeliveryCard />
      </View>

      <SectionTitle title="Review & Ratings" style={styles.mt16} />
      <View style={styles.mt12}>
        <RatingSummary />
      </View>
      <View style={styles.reviews}>
        {productReviews.map((r) => (
          <ReviewCard key={r.id} review={r} />
        ))}
      </View>
      <Pressable accessibilityRole="button" accessibilityLabel="View All Review" style={styles.viewAll}>
        <Txt size={15} weight="medium" color={mk.orange} lineHeight={20}>
          View All Review
        </Txt>
        <ArrowRight2 size={24} color={mk.orange} />
      </Pressable>

      <View style={styles.combo}>
        <Txt size={15.5} weight="medium" color={mk.ink} lineHeight={24} style={styles.comboTitle}>
          Combo Offer
        </Txt>
        <View style={styles.comboRow}>
          {comboOffer.items.map((c) => (
            <View key={c.id} style={styles.comboCard}>
              <Image source={c.image} style={styles.comboImage} />
              <Txt size={14.5} weight="semibold" color={mk.ink} lineHeight={20} style={styles.comboName}>
                {c.name}
              </Txt>
              <Txt size={13} color="#6D7380" lineHeight={16} style={styles.comboBrand}>
                {c.brand}
              </Txt>
              <Txt size={14.5} weight="semibold" color={mk.ink} lineHeight={20} style={styles.comboSize}>
                {c.size}
              </Txt>
            </View>
          ))}
        </View>
        <Pressable accessibilityRole="button" accessibilityLabel={`Buy 2 at ${comboOffer.price}`} onPress={() => router.push('/marketplace/checkout')} style={styles.comboBtn}>
          <Txt size={11.5} color="#FFFFFF" lineHeight={18}>
            {comboOffer.label}
          </Txt>
          <View style={styles.comboSep} />
          <Txt size={16.5} weight="semibold" color="#FFFFFF" lineHeight={22}>
            {comboOffer.price}
          </Txt>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  share: { width: 28, height: 28, marginVertical: -2, marginHorizontal: -2 },
  mt12: { marginTop: 12 },
  mt15: { marginTop: 15 },
  mt16: { marginTop: 16 },
  hero: { marginTop: 24, marginHorizontal: 15.5, width: 344, height: 179, borderRadius: 10 },
  titleRow: { flexDirection: 'row', paddingHorizontal: 16, marginTop: 15 },
  brand: { marginTop: 8 },
  ratingCol: { alignItems: 'center' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  starHalf: { width: 16, height: 16 },
  reviewCount: { marginTop: 7 },
  priceRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginTop: 14 },
  size: { marginTop: 4 },
  discount: {
    marginTop: 20,
    marginHorizontal: 16,
    height: 41,
    borderRadius: 8,
    backgroundColor: mk.blueSurface,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 6,
    gap: 6,
  },
  bulb: { width: 28, height: 28 },
  descCard: {
    marginTop: 12,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: mk.border,
    borderRadius: 16,
    paddingHorizontal: 15,
    paddingTop: 16,
    paddingBottom: 14,
  },
  lorem: { marginBottom: 12 },
  spec: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 13.5 },
  specDivider: { borderTopWidth: 1, borderTopColor: mk.border },
  variantRail: { marginTop: 12, marginLeft: 15, flexGrow: 0 },
  variantContent: { gap: 12 },
  variant: {
    width: 101,
    height: 126,
    borderWidth: 1,
    borderColor: mk.border,
    borderRadius: 12,
    alignItems: 'center',
    overflow: 'hidden',
  },
  variantActive: { borderWidth: 2, borderColor: mk.orange },
  variantOff: {
    width: 64,
    height: 24,
    backgroundColor: mk.orangeSurface,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  variantSize: { marginTop: 8 },
  variantLine: { alignSelf: 'stretch', marginHorizontal: 11, height: 1, backgroundColor: mk.border, marginTop: 6 },
  variantPrice: { marginTop: 10 },
  variantOld: { marginTop: 5 },
  reviews: { marginTop: 12, gap: 13 },
  viewAll: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 14, marginTop: 10, height: 24 },
  combo: { marginTop: 17, backgroundColor: mk.surface, paddingTop: 16, paddingBottom: 12 },
  comboTitle: { paddingHorizontal: 16 },
  comboRow: { flexDirection: 'row', gap: 7, paddingHorizontal: 16, marginTop: 12 },
  comboCard: { flex: 1, height: 266, backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, borderColor: mk.border, padding: 11 },
  comboImage: { width: 145, height: 125, borderRadius: 8 },
  comboName: { marginTop: 12 },
  comboBrand: { marginTop: 5 },
  comboSize: { marginTop: 11 },
  comboBtn: {
    marginTop: 11,
    marginHorizontal: 16,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#ED4A00',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  comboSep: { width: 2, height: 16, backgroundColor: '#FFFFFF' },
  footer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 15,
    shadowColor: '#000000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -4 },
  },
  footRow: { flexDirection: 'row', justifyContent: 'space-between' },
  footValues: { marginTop: 3 },
  footButtons: { flexDirection: 'row', gap: 6, marginTop: 6, marginHorizontal: -1 },
  footBtn: { flex: 1, height: 50, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  outline: { borderWidth: 1.5, borderColor: mk.orange },
  filled: { backgroundColor: mk.orangeButton },
});
