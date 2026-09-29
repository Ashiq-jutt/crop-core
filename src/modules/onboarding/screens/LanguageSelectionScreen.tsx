import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { router } from 'expo-router';

import { icons } from '@/components/icons';
import { AppBar, AppText, IconButton, Screen, SvgIcon } from '@/components/ui';
import { colors, palette, radius, spacing, typography } from '@/theme';

import { LanguageCard } from '../components/LanguageCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { languages } from '../data/languages';

const chunk = <T,>(items: T[], size: number) =>
  Array.from({ length: Math.ceil(items.length / size) }, (_, i) => items.slice(i * size, i * size + size));

export function LanguageSelectionScreen() {
  const [selected, setSelected] = useState('en');
  const [custom, setCustom] = useState('');

  return (
    <Screen
      header={<AppBar />}
      footer={
        <View style={styles.footer}>
          <PrimaryButton label="Continue" onPress={() => router.push('/login')} />
        </View>
      }>
      <View style={styles.headings}>
        <AppText variant="headlineSmall" color={colors.textHeading} align="center">
          Choose Your Language
        </AppText>
        <AppText variant="labelLarge" color={palette.neutralColor30} align="center">
          CropCore speaks your language—select one to get started.
        </AppText>
      </View>

      <View style={styles.container}>
        <View style={styles.list}>
          {chunk(languages, 2).map((row) => (
            <View key={row[0].code} style={styles.row}>
              {row.map((lang) => (
                <LanguageCard
                  key={lang.code}
                  language={lang}
                  selected={selected === lang.code}
                  onPress={() => setSelected(lang.code)}
                  onSpeak={() => setSelected(lang.code)}
                />
              ))}
            </View>
          ))}
        </View>

        <View style={styles.manual}>
          <TextInput
            value={custom}
            onChangeText={setCustom}
            placeholder="Enter Your Language...."
            placeholderTextColor={colors.textTertiary}
            style={styles.manualInput}
          />
          <IconButton
            accessibilityLabel="Speak your language"
            padding={spacing.xs}
            icon={<SvgIcon source={icons.microphone} width={24} />}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  headings: {
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  container: {
    gap: spacing.xl,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
  },
  list: { gap: spacing.lg },
  row: { flexDirection: 'row', gap: spacing.lg },
  manual: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceMuted,
  },
  manualInput: {
    flex: 1,
    ...typography.bodySmall,
    color: colors.textPrimary,
    paddingVertical: 0,
  },
  footer: { paddingHorizontal: spacing.lg, paddingTop: spacing.xl, paddingBottom: 23 },
});
