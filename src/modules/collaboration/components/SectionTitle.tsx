import { StyleSheet, Text, type StyleProp, type TextStyle } from 'react-native';

import { text } from '../theme';

export function SectionTitle({ children, style }: { children: string; style?: StyleProp<TextStyle> }) {
  return <Text style={[text.section, styles.title, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  /* Figma's optical-size DM Sans sits ~2pt lower in its 24pt line than the static web font. */
  title: { marginHorizontal: 16, top: 2 },
});
