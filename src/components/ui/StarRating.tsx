import { Pressable, StyleSheet, View } from 'react-native';
import { Star1 } from 'iconsax-react-native';

import { palette } from '@/theme';

type StarRatingProps = { value: number; onChange?: (value: number) => void; size?: number };

const STAR_COLOR = '#F5A524';

export function StarRating({ value, onChange, size = 16 }: StarRatingProps) {
  return (
    <View style={styles.row} accessibilityLabel={`${value} of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Pressable key={n} disabled={!onChange} onPress={() => onChange?.(n)} hitSlop={4}>
          <Star1
            size={size}
            variant={n <= Math.round(value) ? 'Bold' : 'Linear'}
            color={n <= Math.round(value) ? STAR_COLOR : palette.neutral60}
          />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({ row: { flexDirection: 'row', gap: 4 } });
