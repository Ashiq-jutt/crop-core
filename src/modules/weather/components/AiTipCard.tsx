import { Pressable, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { ArrowRight2 } from 'iconsax-react-native';

import { AppText } from '@/components/ui';
import { colors } from '@/theme';

type Props = { text: string; icon: number };

export function AiTipCard({ text, icon }: Props) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={text} style={styles.card}>
      <Image source={icon} style={styles.icon} />
      <AppText variant="labelMedium" style={styles.text}>
        {text}
      </AppText>
      <ArrowRight2 size={24} color={colors.textPrimary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 9,
    paddingRight: 14,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
  },
  icon: { width: 36, height: 36 },
  text: { flex: 1, marginLeft: 12, marginRight: 30 },
});
