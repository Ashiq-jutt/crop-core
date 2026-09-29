import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Camera } from 'iconsax-react-native';

import { Screen } from '@/components/ui';
import { ActionButton } from '@/modules/fields/components/ActionButton';
import { font } from '@/modules/fields/components/text';
import { colors, palette } from '@/theme';

import { DiagnosisHeader } from '../components/DiagnosisHeader';

export function PhotoDiagnosisScreen() {
  return (
    <Screen header={<DiagnosisHeader title="Crop Care" />} scroll={false} contentStyle={styles.content}>
      <View style={styles.icon}>
        <Camera size={64} color={colors.primary} />
      </View>
      <Text style={styles.title}>AI-Powered Crop Diagnostics</Text>
      <Text style={styles.body}>Take a photo or upload an image to detect crop diseases, pests, and nutrient deficiencies</Text>
      <ActionButton label="Scan Crop" height={50} onPress={() => router.push('/diagnosis/scan')} labelStyle={styles.primaryLabel} style={styles.scan} />
      <ActionButton
        label="Upload From Gallery"
        variant="outline"
        onPress={() => router.push('/diagnosis/scan?source=gallery')}
        labelStyle={styles.secondaryLabel}
        style={styles.upload}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { alignItems: 'center', paddingTop: 134, paddingHorizontal: 28 },
  icon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: palette.primary95,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { ...font('semibold', 16.5, 22, '#131416'), marginTop: 16, textAlign: 'center' },
  body: { ...font('regular', 14, 20, '#363C47'), marginTop: 10, textAlign: 'center' },
  scan: { alignSelf: 'stretch', marginTop: 35 },
  upload: { alignSelf: 'stretch', marginTop: 15, borderColor: '#E6E7EB' },
  primaryLabel: font('medium', 16, 22),
  secondaryLabel: font('regular', 16, 22),
});
