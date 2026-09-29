import { useRef, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/ui';
import { colors, spacing } from '@/theme';

import { OnboardingSlideView } from '../components/OnboardingSlideView';
import { PrimaryButton } from '../components/PrimaryButton';
import { onboardingSlides } from '../data/slides';

export function OnboardingScreen() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const listRef = useRef<FlatList>(null);
  const [index, setIndex] = useState(0);

  const finish = () => router.replace('/language');

  const handleContinue = () => {
    if (index < onboardingSlides.length - 1) {
      listRef.current?.scrollToIndex({ index: index + 1, animated: true });
      setIndex(index + 1);
    } else {
      finish();
    }
  };

  const onMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setIndex(Math.round(e.nativeEvent.contentOffset.x / width));
  };

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <FlatList
        ref={listRef}
        data={onboardingSlides}
        keyExtractor={(s) => s.id}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumEnd}
        getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
        renderItem={({ item, index: i }) => (
          <OnboardingSlideView slide={item} index={i} total={onboardingSlides.length} width={width} topInset={insets.top} />
        )}
      />

      <Pressable
        accessibilityRole="button"
        onPress={finish}
        hitSlop={8}
        style={[styles.skip, { top: insets.top }]}>
        <AppText variant="titleMediumRegular">Skip</AppText>
      </Pressable>

      <View style={[styles.footer, { paddingBottom: 23 + insets.bottom }]}>
        <PrimaryButton label="Continue" onPress={handleContinue} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  skip: {
    position: 'absolute',
    right: 0,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  footer: { paddingHorizontal: spacing.lg, paddingTop: spacing.xl },
});
