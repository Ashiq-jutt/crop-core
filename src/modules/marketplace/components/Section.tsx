import type { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { Txt } from './Txt';
import { mk } from './tokens';

type SectionTitleProps = { title: string; onViewAll?: () => void; style?: StyleProp<ViewStyle>; size?: number };

export function SectionTitle({ title, onViewAll, style, size = 16.5 }: SectionTitleProps) {
  return (
    <View style={[styles.row, style]}>
      <Txt size={size} weight="medium" color={mk.ink} lineHeight={24}>
        {title}
      </Txt>
      {onViewAll ? (
        <Pressable accessibilityRole="button" accessibilityLabel={`View all ${title}`} hitSlop={8} onPress={onViewAll}>
          <Txt size={13} weight="medium" color={mk.orange} lineHeight={18}>
            View All
          </Txt>
        </Pressable>
      ) : null}
    </View>
  );
}

type CarouselProps = { children: ReactNode; gap?: number; style?: StyleProp<ViewStyle> };

/** Horizontal rail clipped to the 16pt page gutters, as in the Figma frames. */
export function Carousel({ children, gap = 12, style }: CarouselProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[styles.rail, style]}
      contentContainerStyle={{ gap }}>
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16 },
  rail: { marginHorizontal: 16, flexGrow: 0 },
});
