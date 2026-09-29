import { Pressable, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import type { BottomTabBarProps } from 'expo-router/tabs';
import { Home, ShoppingCart, Tree, User, type Icon } from 'iconsax-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

import { AppText } from '@/components/ui';
import { colors, fonts, palette } from '@/theme';

const TAB_ICONS: Record<string, { icon: Icon; label: string }> = {
  home: { icon: Home, label: 'Home' },
  fields: { icon: Tree, label: 'Fields' },
  market: { icon: ShoppingCart, label: 'Market' },
  profile: { icon: User, label: 'Profile' },
};

const BAR_HEIGHT = 64;
const TAB_WIDTH = 72;
const FAB_SIZE = 56;
const FAB_RING = 8;
const RING_SIZE = FAB_SIZE + FAB_RING * 2;
const FADE_HEIGHT = 56;

/** Split-rectangle "scan" glyph drawn in the centre action button. */
function ScanGlyph() {
  return (
    <Svg width={30} height={30} viewBox="0 0 30 30" fill="none">
      <Path
        d="M1.5 12V8.5a7 7 0 0 1 7-7h13a7 7 0 0 1 7 7V12M1.5 18v3.5a7 7 0 0 0 7 7h13a7 7 0 0 0 7-7V18M0.8 15h28.4"
        stroke="#fff"
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </Svg>
  );
}

type Props = BottomTabBarProps & { onCenterPress?: () => void };

export function AppTabBar({ state, navigation, onCenterPress }: Props) {
  const insets = useSafeAreaInsets();
  const routes = state.routes.filter((r) => TAB_ICONS[r.name]);
  const left = routes.slice(0, 2);
  const right = routes.slice(2);

  const renderTab = (route: (typeof routes)[number]) => {
    const focused = state.routes[state.index]?.key === route.key;
    const { icon: TabIcon, label } = TAB_ICONS[route.name];
    const tint = focused ? colors.primary : palette.neutral30;
    return (
      <Pressable
        key={route.key}
        accessibilityRole="tab"
        accessibilityState={{ selected: focused }}
        accessibilityLabel={label}
        onPress={() => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!focused && !event.defaultPrevented) navigation.navigate(route.name);
        }}
        style={styles.tab}>
        <TabIcon size={24} color={tint} variant={focused ? 'Bold' : 'Linear'} />
        <AppText color={tint} style={[styles.label, focused && styles.labelActive]}>
          {label}
        </AppText>
      </Pressable>
    );
  };

  return (
    <View style={[styles.bar, { paddingBottom: insets.bottom }]}>
      <LinearGradient
        pointerEvents="none"
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.008)', 'rgba(0,0,0,0.02)', 'rgba(0,0,0,0.06)']}
        locations={[0, 0.3, 0.65, 1]}
        style={styles.fade}
      />
      <View style={styles.row}>
        {left.map(renderTab)}
        <View style={styles.fabSlot} />
        {right.map(renderTab)}
      </View>
      <LinearGradient
        pointerEvents="box-none"
        colors={['rgba(236,238,238,0)', '#ECEEEE']}
        locations={[0.3, 0.5]}
        style={styles.fabRing}>
        <Pressable accessibilityRole="button" accessibilityLabel="Scan crop" onPress={onCenterPress}>
          <LinearGradient
            colors={['#F9AF84', colors.primary]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.fab}>
            <ScanGlyph />
          </LinearGradient>
        </Pressable>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { backgroundColor: colors.surface },
  fade: { position: 'absolute', left: 0, right: 0, top: -FADE_HEIGHT, height: FADE_HEIGHT },
  row: { height: BAR_HEIGHT, flexDirection: 'row', alignItems: 'flex-start', paddingHorizontal: 4, paddingTop: 11 },
  tab: { width: TAB_WIDTH, alignItems: 'center', gap: 2 },
  label: { fontFamily: fonts.regular, fontSize: 12, lineHeight: 16, letterSpacing: 0.4 },
  labelActive: { fontFamily: fonts.semibold },
  fabSlot: { flex: 1 },
  fabRing: {
    position: 'absolute',
    alignSelf: 'center',
    top: -RING_SIZE / 2,
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: RING_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
