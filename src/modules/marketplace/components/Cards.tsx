import { useState } from 'react';
import { Image, Pressable, StyleSheet, View, type ImageSourcePropType } from 'react-native';
import { Heart } from 'iconsax-react-native';

import type { FeatureItem, OfferItem, PartialPhoto, RecommendedItem, Tag } from '../data/products';
import { Dashed } from './RateParts';
import { Txt } from './Txt';
import { mk } from './tokens';

type LikeProps = { size?: number; color?: string };

/** Outline heart that toggles to a filled orange heart. */
export function LikeButton({ size = 24, color = mk.ink }: LikeProps) {
  const [liked, setLiked] = useState(false);
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={liked ? 'Remove from wishlist' : 'Add to wishlist'}
      accessibilityState={{ selected: liked }}
      hitSlop={8}
      onPress={() => setLiked((v) => !v)}>
      <Heart size={size} color={liked ? mk.orange : color} variant={liked ? 'Bold' : 'Linear'} />
    </Pressable>
  );
}

export function ProductTag({ tag }: { tag: Tag }) {
  return (
    <View style={styles.tag}>
      <Image source={tag.icon} style={styles.tagIcon} />
      <Txt size={13} weight="medium" color={mk.ink} lineHeight={18}>
        {tag.label}
      </Txt>
    </View>
  );
}

type PressProps = { onPress: () => void };

function CardPhoto({ source, partial }: { source: ImageSourcePropType; partial?: PartialPhoto }) {
  if (!partial) return <Image source={source} style={styles.featureImage} />;
  return (
    <View style={[styles.featureImage, styles.clip, { backgroundColor: partial.fill }]}>
      <Image source={source} style={{ width: partial.width, height: 125 }} />
    </View>
  );
}

export function FeatureCard({ item, onPress }: { item: FeatureItem } & PressProps) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={item.name} onPress={onPress} style={styles.feature}>
      <CardPhoto source={item.image} partial={item.partial} />
      <View style={styles.tagRow}>
        <ProductTag tag={item.tag} />
        <LikeButton />
      </View>
      <View style={styles.featureFoot}>
        <Txt size={14.5} weight="medium" color={mk.ink} lineHeight={20} numberOfLines={1} style={styles.flex}>
          {item.name}
        </Txt>
        <Txt size={14.5} weight="semibold" color={mk.orange} lineHeight={20}>
          {item.price}
        </Txt>
      </View>
    </Pressable>
  );
}

export function RecommendedCard({ item, onPress }: { item: RecommendedItem } & PressProps) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={item.name} onPress={onPress} style={styles.recommended}>
      <CardPhoto source={item.image} partial={item.partial} />
      <View style={[styles.tagRow, styles.recTags]}>
        <ProductTag tag={item.tag} />
        <LikeButton />
      </View>
      <Txt size={14.5} weight="medium" color={mk.ink} lineHeight={20} numberOfLines={1} style={styles.recName}>
        {item.name}
      </Txt>
      <Txt size={13} color="#50555F" lineHeight={18} numberOfLines={1} style={styles.recBrand}>
        {item.brand}
      </Txt>
      <Txt size={16.5} weight="semibold" color={mk.orange} lineHeight={22} style={styles.recPrice}>
        {item.price}
      </Txt>
      <Txt size={14.5} weight="semibold" color={mk.ink} lineHeight={20} style={styles.recSize}>
        {item.size}
      </Txt>
    </Pressable>
  );
}

type IconCardProps = { label: string; icon: ImageSourcePropType; width: number; height: number; labelSize: number; gap: number } & PressProps;

/** Bordered tile with a 40pt grey icon disc above a centred label (equipment + quick action). */
export function IconCard({ label, icon, width, height, labelSize, gap, onPress }: IconCardProps) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress} style={[styles.iconCard, { width, height, gap }]}>
      <Image source={icon} style={styles.iconDisc} />
      <Txt size={labelSize} weight="medium" color={mk.ink} lineHeight={20} numberOfLines={1}>
        {label}
      </Txt>
    </Pressable>
  );
}

export function OfferCard({ item, wide, onPress }: { item: OfferItem; wide?: boolean } & PressProps) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={item.name} onPress={onPress} style={[styles.offer, wide && styles.offerWide]}>
      <View style={styles.offerTop}>
        <View style={styles.offBadge}>
          <Txt size={13} weight="medium" color={mk.orange} lineHeight={18}>
            {item.off}
          </Txt>
        </View>
        <LikeButton />
      </View>
      <View style={styles.offerBody}>
        <Image source={item.image} style={styles.offerImage} />
        <View style={styles.offerText}>
          <Txt size={14.5} weight="semibold" color={mk.ink} lineHeight={20} numberOfLines={1}>
            {item.name}
          </Txt>
          <View style={styles.offerPrice}>
            <Txt size={17} weight="semibold" color={mk.orange} lineHeight={22}>
              {item.price}
            </Txt>
            <Txt size={13} color={mk.subtle} lineHeight={18} strike>
              {item.oldPrice}
            </Txt>
          </View>
          <Dashed style={styles.dashed} />
          <Txt size={13} weight="medium" color="#50555F" lineHeight={18}>
            {item.size}
          </Txt>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  tag: {
    height: 30,
    borderRadius: 8,
    backgroundColor: mk.surface,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 8,
    gap: 3,
  },
  tagIcon: { width: 18, height: 18 },
  feature: {
    width: 247,
    height: 220,
    borderWidth: 1,
    borderColor: mk.border,
    borderRadius: 12,
    padding: 10.5,
  },
  featureImage: { width: 224, height: 125, borderRadius: 8 },
  clip: { overflow: 'hidden' },
  tagRow: { marginTop: 8.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  featureFoot: { marginTop: 13, flexDirection: 'row', alignItems: 'center', gap: 8 },
  recommended: {
    width: 247,
    height: 308,
    borderWidth: 1,
    borderColor: mk.border,
    borderRadius: 12,
    padding: 10.5,
  },
  recTags: { marginTop: 12 },
  recName: { marginTop: 14 },
  recBrand: { marginTop: 8 },
  recPrice: { marginTop: 17 },
  recSize: { marginTop: 4 },
  iconCard: {
    borderWidth: 1,
    borderColor: mk.border,
    borderRadius: 12,
    alignItems: 'center',
    paddingTop: 11,
  },
  iconDisc: { width: 40, height: 40 },
  offer: {
    width: 240,
    height: 130,
    borderWidth: 1,
    borderColor: mk.border,
    borderRadius: 12,
    paddingHorizontal: 11,
    paddingTop: 11,
  },
  offerWide: { width: 343 },
  offerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  offBadge: { height: 24, paddingHorizontal: 8, borderRadius: 8, backgroundColor: mk.orangeSurface, justifyContent: 'center' },
  offerBody: { flexDirection: 'row', marginTop: 12.5, gap: 10 },
  offerText: { flex: 1, marginTop: -2.5 },
  offerImage: { width: 67, height: 67, borderRadius: 6 },
  offerPrice: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 5 },
  dashed: { marginTop: 4, marginBottom: 3.5 },
});
