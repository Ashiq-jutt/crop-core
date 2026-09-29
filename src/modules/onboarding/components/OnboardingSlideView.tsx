import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';

import { AppText, PageDots } from '@/components/ui';
import { spacing } from '@/theme';

import type { OnboardingSlide } from '../data/slides';

/** Illustration artboard is 375×544 inside a 375×812 frame. */
const ILLUSTRATION_RATIO = 375 / 544;
/** The artboard starts at the frame top, under Figma's 50pt status bar. */
const FIGMA_STATUS_BAR = 50;

type Props = {
  slide: OnboardingSlide;
  index: number;
  total: number;
  width: number;
  /** Real status-bar height; the illustration bleeds up underneath it. */
  topInset: number;
};

export function OnboardingSlideView({ slide, index, total, width, topInset }: Props) {
  return (
    <View style={{ width }}>
      <Image source={slide.image} style={{ width, aspectRatio: ILLUSTRATION_RATIO, marginTop: topInset - FIGMA_STATUS_BAR }} contentFit="cover" />
      <View style={styles.content}>
        <PageDots count={total} active={index} />
        <View style={styles.text}>
          <AppText variant="headlineSmall" align="center">
            {slide.title}
          </AppText>
          <AppText variant="labelLarge" align="center">
            {slide.description}
          </AppText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    gap: spacing.xl,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  text: { alignSelf: 'stretch', gap: spacing.lg, minHeight: 120 },
});
