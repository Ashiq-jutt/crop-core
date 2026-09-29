import { Switch } from 'react-native';

import { colors, palette } from '@/theme';

type ToggleProps = {
  value: boolean;
  onChange: (value: boolean) => void;
  accessibilityLabel?: string;
};

export function Toggle({ value, onChange, accessibilityLabel }: ToggleProps) {
  return (
    <Switch
      value={value}
      onValueChange={onChange}
      accessibilityLabel={accessibilityLabel}
      trackColor={{ false: palette.neutral90, true: colors.primary }}
      thumbColor={colors.surface}
      ios_backgroundColor={palette.neutral90}
    />
  );
}
