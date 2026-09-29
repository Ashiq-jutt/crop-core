import type { ImageSource } from 'expo-image';

export type OnboardingSlide = {
  id: string;
  title: string;
  description: string;
  image: ImageSource | number;
};

export const onboardingSlides: OnboardingSlide[] = [
  {
    id: 'weather',
    title: '🌤️ Get Weather & Crop Guidance',
    description: 'AI gives forecasts and crop advice tailored for your farm — in your own language.',
    image: require('@assets/images/onboarding/weather-guidance.png'),
  },
  {
    id: 'marketplace',
    title: '🛒 Buy Smarter with Marketplace',
    description:
      'Discover seeds, fertilizers, and equipment — and track daily mandi prices to sell at the best rate.',
    image: require('@assets/images/onboarding/marketplace.png'),
  },
  {
    id: 'collaborate',
    title: '🤝 Collaborate & Grow Together',
    description:
      'Connect with local farmers, share tools, and work together to save time and increase yields.',
    image: require('@assets/images/onboarding/collaborate.png'),
  },
];
