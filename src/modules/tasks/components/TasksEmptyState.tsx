import { Pressable, StyleSheet, View } from 'react-native';
import { Calendar2 } from 'iconsax-react-native';

import { AppText } from '@/components/ui';
import { colors, palette } from '@/theme';

/** "Schedule New Task" empty state with the orange calendar bubble and Add Task CTA. */
export function TasksEmptyState({ onAddTask }: { onAddTask: () => void }) {
  return (
    <View style={styles.root}>
      <View style={styles.bubble}>
        <Calendar2 size={68} color={colors.primary} />
      </View>
      <AppText variant="labelLargeStrong" align="center" style={styles.title}>
        Schedule New Task
      </AppText>
      <AppText variant="bodySmall" align="center" color={palette.neutral30} style={styles.subtitle}>
        You have no Task or Today
      </AppText>
      <Pressable accessibilityRole="button" accessibilityLabel="Add Task" onPress={onAddTask} style={styles.button}>
        <AppText variant="titleMedium" color={colors.textOnPrimary}>
          Add Task
        </AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { alignItems: 'center', paddingHorizontal: 16 },
  bubble: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarySurface,
  },
  title: { marginTop: 16 },
  subtitle: { marginTop: 8 },
  button: {
    alignSelf: 'stretch',
    height: 48,
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: colors.primary,
  },
});
