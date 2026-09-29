import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Microphone2, VolumeHigh } from 'iconsax-react-native';

import { Screen } from '@/components/ui';
import { colors, fonts, palette } from '@/theme';

import { AccountHeader } from '../components/AccountHeader';
import { FooterButton } from '../components/FooterButton';
import { languageOptions } from '../data/languages';

export function LanguageScreen() {
  const [selected, setSelected] = useState('en');
  const [voiceMode, setVoiceMode] = useState(false);

  return (
    <Screen
      header={<AccountHeader title="Select Language" />}
      footer={<FooterButton label="Update App Language" medium onPress={() => router.back()} />}
      contentStyle={styles.content}>
      <View style={styles.grid}>
        {languageOptions.map((lang) => {
          const active = lang.id === selected;
          return (
            <Pressable
              key={lang.id}
              accessibilityRole="radio"
              accessibilityState={{ checked: active }}
              accessibilityLabel={lang.english}
              onPress={() => setSelected(lang.id)}
              style={[styles.card, active && styles.cardActive]}>
              <View style={styles.names}>
                <Text style={[styles.native, lang.id !== 'en' && styles.nativeScript]}>{lang.native}</Text>
                <Text style={[styles.english, active && styles.englishActive]}>{lang.english}</Text>
              </View>
              <View style={[styles.speaker, active && styles.speakerActive]}>
                <VolumeHigh size={16} color={active ? colors.textOnPrimary : palette.neutral0} />
              </View>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        accessibilityRole="switch"
        accessibilityState={{ checked: voiceMode }}
        accessibilityLabel="Voice Selection Mode"
        onPress={() => setVoiceMode((v) => !v)}
        style={styles.voice}>
        <Text style={styles.voiceLabel}>Voice Selection Mode</Text>
        <Microphone2 size={24} color={voiceMode ? colors.primary : palette.neutral0} />
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 24 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  card: {
    width: '47.6%',
    flexGrow: 1,
    height: 64,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E7E8EB',
    paddingLeft: 11,
    paddingRight: 11,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardActive: { backgroundColor: palette.primary95, borderColor: colors.primaryBorder },
  names: { flex: 1 },
  native: { fontFamily: fonts.semibold, fontSize: 14, lineHeight: 20, color: palette.neutral0 },
  // DM Sans has no Indic glyphs; the fallback system font needs an explicit weight to render bold.
  nativeScript: { fontWeight: '700' },
  english: { marginTop: 4, fontFamily: fonts.regular, fontSize: 12, lineHeight: 16, letterSpacing: 0.4, color: '#3C4045' },
  englishActive: { color: palette.neutral0 },
  speaker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: palette.neutral95,
    alignItems: 'center',
    justifyContent: 'center',
  },
  speakerActive: { backgroundColor: colors.primary },
  voice: {
    marginTop: 24,
    height: 56,
    borderRadius: 12,
    backgroundColor: palette.neutral95,
    paddingLeft: 12,
    paddingRight: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  voiceLabel: { fontFamily: fonts.semibold, fontSize: 14, lineHeight: 20, color: palette.neutral0 },
});
