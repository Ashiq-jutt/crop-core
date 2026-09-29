import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { Heart } from 'iconsax-react-native';

import { font, ink } from '@/modules/fields/components/text';
import { colors, palette } from '@/theme';

import type { SuggestedProduct } from '../data/diagnosis';

const sprayIcon = require('@assets/images/diagnosis/spray-small.png');

/** Suggested product tile in the horizontal carousel on "Summary". */
export function ProductCard({ product, onPress }: { product: SuggestedProduct; onPress: () => void }) {
  const [liked, setLiked] = useState(false);
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={product.name} onPress={onPress} style={styles.card}>
      <Image source={product.image} style={styles.image} contentFit="cover" />
      <View style={styles.row}>
        <View style={styles.chip}>
          <Image source={sprayIcon} style={styles.chipIcon} />
          <Text style={styles.chipLabel}>{product.category}</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={liked ? 'Remove from favourites' : 'Add to favourites'}
          accessibilityState={{ selected: liked }}
          hitSlop={8}
          onPress={() => setLiked((l) => !l)}>
          <Heart size={24} color={liked ? colors.primary : ink.title} variant={liked ? 'Bold' : 'Linear'} />
        </Pressable>
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {product.name}
      </Text>
      <Text style={styles.brand} numberOfLines={1}>
        {product.brand}
      </Text>
      <Text style={styles.price}>{product.price}</Text>
      <Text style={styles.size}>{product.size}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 247,
    borderWidth: 1,
    borderColor: '#E6E7EB',
    borderRadius: 12,
    padding: 11,
    paddingBottom: 14,
    backgroundColor: palette.neutral100,
  },
  image: { width: 223, height: 125, borderRadius: 8 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, paddingRight: 1 },
  chip: {
    height: 32,
    borderRadius: 8,
    backgroundColor: palette.neutral95,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 11,
    gap: 6,
  },
  chipIcon: { width: 16, height: 16 },
  chipLabel: { ...font('medium', 12.5, 18, ink.title), letterSpacing: 0.4 },
  name: { ...font('medium', 14.5, 20, ink.title), marginTop: 12 },
  brand: { ...font('regular', 12.5, 18, '#7F838A'), marginTop: 6, letterSpacing: 0.2 },
  price: { ...font('medium', 16.5, 22, colors.primary), marginTop: 14 },
  size: { ...font('semibold', 14.5, 20, ink.title), marginTop: 4 },
});
