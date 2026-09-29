import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Heart, ShoppingCart, type Icon } from 'iconsax-react-native';

import { Txt } from './Txt';
import { mk } from './tokens';

type MarketHeaderProps = {
  title: string;
  showBack?: boolean;
  right?: ReactNode;
};

/** Flat app bar used across the Marketplace frames: back arrow, left-aligned title, hairline below. */
export function MarketHeader({ title, showBack = true, right }: MarketHeaderProps) {
  return (
    <View style={[styles.bar, !showBack && styles.barRoot]}>
      {showBack ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={10}
          onPress={() => (router.canGoBack() ? router.back() : router.replace('/market'))}
          style={styles.back}>
          <ArrowLeft size={24} color={mk.ink} />
        </Pressable>
      ) : null}
      <Txt size={16.5} weight="semibold" color={mk.ink} lineHeight={24} style={styles.title}>
        {title}
      </Txt>
      <View style={styles.right}>{right}</View>
    </View>
  );
}

type HeaderIconProps = { icon: Icon; label: string; onPress: () => void };

export function HeaderIcon({ icon: IconCmp, label, onPress }: HeaderIconProps) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} hitSlop={8} onPress={onPress}>
      <IconCmp size={24} color={mk.ink} />
    </Pressable>
  );
}

/** Wishlist + cart pair shown on the Marketplace and category headers. */
export function WishCartIcons() {
  return (
    <>
      <HeaderIcon icon={Heart} label="Wishlist" onPress={() => router.push('/marketplace/wishlist')} />
      <HeaderIcon icon={ShoppingCart} label="Cart" onPress={() => router.push('/marketplace/cart')} />
    </>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 2,
    borderBottomWidth: 2,
    borderBottomColor: '#F4F4F7',
  },
  barRoot: { paddingLeft: 16 },
  back: { marginRight: 16 },
  title: { flex: 1 },
  right: { flexDirection: 'row', alignItems: 'center', gap: 24 },
});
