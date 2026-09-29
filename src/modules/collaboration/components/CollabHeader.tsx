import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft } from 'iconsax-react-native';

import { colors, fonts } from '@/theme';

import { collabColors } from '../theme';

type CollabHeaderProps = {
  title: string;
  right?: ReactNode;
  onBack?: () => void;
};

/** Flat top bar used across the section: bare back arrow, left-aligned title, hairline divider. */
export function CollabHeader({ title, right, onBack }: CollabHeaderProps) {
  const handleBack = onBack ?? (() => (router.canGoBack() ? router.back() : router.replace('/')));
  return (
    <View style={styles.bar}>
      <Pressable accessibilityRole="button" accessibilityLabel="Go back" hitSlop={8} onPress={handleBack}>
        <ArrowLeft size={24} color={colors.textPrimary} />
      </Pressable>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 55,
    paddingLeft: 24,
    paddingRight: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderBottomWidth: 1,
    borderBottomColor: collabColors.headerDivider,
  },
  title: { flex: 1, fontFamily: fonts.medium, fontSize: 16.7, lineHeight: 24, color: colors.textPrimary },
});
