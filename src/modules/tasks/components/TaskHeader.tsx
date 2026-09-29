import { Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Calendar2 } from 'iconsax-react-native';

import { AppText } from '@/components/ui';
import { colors } from '@/theme';

type Props = { title: string; onCalendar?: () => void };

/** 55pt "← Title" bar with a hairline, optionally a calendar action on the right. */
export function TaskHeader({ title, onCalendar }: Props) {
  return (
    <View style={styles.bar}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Go back"
        hitSlop={8}
        onPress={() => (router.canGoBack() ? router.back() : router.replace('/home'))}>
        <ArrowLeft size={24} color={colors.textPrimary} />
      </Pressable>
      <AppText variant="titleMedium" style={styles.title}>
        {title}
      </AppText>
      {onCalendar ? (
        <Pressable accessibilityRole="button" accessibilityLabel="Open calendar" hitSlop={8} onPress={onCalendar}>
          <Calendar2 size={24} color={colors.textPrimary} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 23,
    paddingRight: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F7',
  },
  title: { flex: 1, marginLeft: 16 },
});
