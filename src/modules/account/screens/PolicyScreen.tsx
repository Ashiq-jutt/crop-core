import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { Screen } from '@/components/ui';
import { fonts, palette } from '@/theme';

import { AccountHeader } from '../components/AccountHeader';
import { policies, type PolicyId } from '../data/policies';

function isPolicyId(value: unknown): value is PolicyId {
  return typeof value === 'string' && value in policies;
}

export function PolicyScreen() {
  const { doc } = useLocalSearchParams<{ doc?: string }>();
  const policy = policies[isPolicyId(doc) ? doc : 'privacy'];

  return (
    <Screen header={<AccountHeader title={policy.title} />} contentStyle={styles.content}>
      {policy.sections.map((section) => (
        <View key={section.heading} style={styles.section}>
          <Text style={styles.heading}>{section.heading}</Text>
          <Text style={styles.body}>{section.body}</Text>
        </View>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 40, gap: 15 },
  section: { gap: 16 },
  heading: { fontFamily: fonts.semibold, fontSize: 16, lineHeight: 24, color: palette.neutral0 },
  body: { fontFamily: fonts.regular, fontSize: 14, lineHeight: 20, letterSpacing: 0.3, color: '#4C525C' },
});
