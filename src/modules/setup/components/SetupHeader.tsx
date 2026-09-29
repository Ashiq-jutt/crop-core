import { Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft } from 'iconsax-react-native';

import { AppText } from '@/components/ui';
import { fonts } from '@/theme';

import { setupColors } from '../data/setup';

type SetupHeaderProps = { title: string; showBack?: boolean };

/** Left-aligned 16pt title with an optional plain back arrow and a hairline underneath. */
export function SetupHeader({ title, showBack = true }: SetupHeaderProps) {
  return (
    <View style={styles.bar}>
      {showBack ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={8}
          onPress={() => router.canGoBack() && router.back()}
          style={({ pressed }) => [styles.back, pressed && styles.pressed]}>
          <ArrowLeft size={24} color="#000000" />
        </Pressable>
      ) : null}
      <AppText style={styles.title} color="#000000" numberOfLines={1}>
        {title}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: setupColors.headerBorder,
  },
  title: { flex: 1, fontFamily: fonts.medium, fontSize: 16, lineHeight: 24, letterSpacing: 0.25 },
  back: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  pressed: { opacity: 0.6 },
});
