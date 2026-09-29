import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft } from 'iconsax-react-native';

import { fonts, palette } from '@/theme';

import { accountColors } from './tokens';

type AccountHeaderProps = {
  title: string;
  showBack?: boolean;
  right?: ReactNode;
};

/** Figma "User Account" top bar: plain back arrow, left-aligned title, hairline below. */
export function AccountHeader({ title, showBack = true, right }: AccountHeaderProps) {
  return (
    <View style={styles.bar}>
      {showBack ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={10}
          onPress={() => (router.canGoBack() ? router.back() : router.replace('/profile'))}
          style={styles.back}>
          <ArrowLeft size={24} color={palette.neutral0} />
        </Pressable>
      ) : null}
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      {right ? <View style={styles.right}>{right}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: accountColors.headerLine,
  },
  back: { marginLeft: 8, marginRight: 16 },
  title: { flex: 1, fontFamily: fonts.semibold, fontSize: 16, lineHeight: 24, color: palette.neutral0 },
  right: { marginLeft: 12 },
});
