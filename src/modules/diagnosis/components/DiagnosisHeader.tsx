import { StyleSheet } from 'react-native';

import { PageHeader } from '@/modules/fields/components/PageHeader';
import { font } from '@/modules/fields/components/text';

/** App bar of the Photo Diagnosis frames (16pt semibold title, back to Home when opened cold). */
export function DiagnosisHeader({ title }: { title: string }) {
  return <PageHeader title={title} fallbackHref="/home" titleStyle={styles.title} />;
}

const styles = StyleSheet.create({
  title: font('semibold', 16, 22),
});
