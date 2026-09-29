import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View, type StyleProp, type TextStyle } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft } from 'iconsax-react-native';

import { palette } from '@/theme';

import { font, ink } from './text';

type PageHeaderProps = {
  title: string;
  /** Hide the back arrow (tab roots). */
  showBack?: boolean;
  onBack?: () => void;
  right?: ReactNode;
  titleStyle?: StyleProp<TextStyle>;
  /** Where the back arrow goes when there is no history (deep links). */
  fallbackHref?: '/fields' | '/home';
};

/** Left-aligned 56pt app bar with a hairline bottom border, as drawn on every Field / Diagnosis screen. */
export function PageHeader({ title, showBack = true, onBack, right, titleStyle, fallbackHref = '/fields' }: PageHeaderProps) {
  const back = onBack ?? (() => (router.canGoBack() ? router.back() : router.replace(fallbackHref)));
  return (
    <View style={styles.bar}>
      {showBack ? (
        <Pressable accessibilityRole="button" accessibilityLabel="Go back" hitSlop={10} onPress={back} style={styles.back}>
          <ArrowLeft size={24} color={ink.title} />
        </Pressable>
      ) : null}
      <Text style={[styles.title, !showBack && styles.titleRoot, titleStyle]} numberOfLines={1}>
        {title}
      </Text>
      {right ? <View style={styles.right}>{right}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 24,
    paddingRight: 24,
    borderBottomWidth: 1,
    borderBottomColor: palette.neutral95,
    backgroundColor: palette.neutral100,
  },
  back: { marginRight: 16 },
  title: { ...font('medium', 16.5, 24, ink.title), flex: 1 },
  titleRoot: { marginLeft: -8 },
  right: { marginLeft: 12 },
});
