import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ArrowRight2, type Icon } from 'iconsax-react-native';

import { fonts, palette } from '@/theme';

import { accountColors } from './tokens';

type MenuCardProps = { icon: Icon; title: string; subtitle: string; lightTitle?: boolean; onPress: () => void };

/** Bordered 64pt row with a grey icon disc, title + caption and a chevron (Help & Legal lists). */
export function MenuCard({ icon: IconCmp, title, subtitle, lightTitle = false, onPress }: MenuCardProps) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={title} onPress={onPress} style={styles.card}>
      <View style={styles.disc}>
        <IconCmp size={24} color={palette.neutral0} />
      </View>
      <View style={styles.text}>
        <Text style={[styles.title, lightTitle && styles.titleLight]}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <ArrowRight2 size={24} color={palette.neutral0} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 64,
    borderWidth: 1,
    borderColor: accountColors.border,
    borderRadius: 12,
    paddingLeft: 11,
    paddingRight: 11,
    flexDirection: 'row',
    alignItems: 'center',
  },
  disc: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: palette.neutral95,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  text: { flex: 1, gap: 4 },
  title: { fontFamily: fonts.semibold, fontSize: 14, lineHeight: 20, color: palette.neutral0 },
  titleLight: { fontFamily: fonts.medium },
  subtitle: { fontFamily: fonts.regular, fontSize: 12, lineHeight: 16, letterSpacing: 0.4, color: '#515660' },
});
