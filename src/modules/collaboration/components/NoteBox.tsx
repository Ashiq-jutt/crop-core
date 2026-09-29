import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '@/theme';

import { collabColors } from '../theme';

export function NoteBox({ text }: { text: string }) {
  return (
    <View style={styles.box}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    marginHorizontal: 16,
    height: 40,
    borderWidth: 1,
    borderColor: collabColors.border,
    borderRadius: 8,
    paddingHorizontal: 11,
    justifyContent: 'center',
  },
  text: { fontFamily: fonts.semibold, fontSize: 13, lineHeight: 20, color: colors.textPrimary },
});
