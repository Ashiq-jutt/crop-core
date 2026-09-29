import { StyleSheet } from 'react-native';

import { AppText } from '@/components/ui';

/** 16/24 semibold section heading; the gap to the content below varies per section in the design. */
export function WeatherSectionTitle({ title, gapBelow }: { title: string; gapBelow: number }) {
  return (
    <AppText variant="titleMedium" style={[styles.title, { marginBottom: gapBelow }]}>
      {title}
    </AppText>
  );
}

const styles = StyleSheet.create({
  title: { marginTop: 15, marginHorizontal: 16 },
});
