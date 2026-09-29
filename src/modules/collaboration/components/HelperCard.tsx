import { StyleSheet, View } from 'react-native';
import { Call } from 'iconsax-react-native';

import { colors } from '@/theme';

import { collabColors } from '../theme';
import { PersonRow } from './PersonRow';
import { RoundIconButton } from './RoundIconButton';

/** Bordered David Malan row with a call button (confirmed helper / requester farmer). */
export function HelperCard({ onCall }: { onCall: () => void }) {
  return (
    <View style={styles.card}>
      <PersonRow
        right={
          <RoundIconButton accessibilityLabel="Call David Malan" onPress={onCall} icon={<Call size={22} color={colors.textPrimary} />} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: collabColors.border,
    borderRadius: 12,
    paddingHorizontal: 11,
    paddingVertical: 9,
  },
});
