import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ArrowDown2, ArrowUp2 } from 'iconsax-react-native';

import { Screen } from '@/components/ui';
import { fonts, palette } from '@/theme';

import { AccountHeader } from '../components/AccountHeader';
import { Dash } from '../components/Dash';
import { FilterChips } from '../components/FilterChips';
import { accountColors } from '../components/tokens';
import { faqCategories, faqs, type FaqCategory } from '../data/help';

export function FaqsScreen() {
  const [category, setCategory] = useState<FaqCategory>('general');
  const [openId, setOpenId] = useState<string | null>('g1');

  return (
    <Screen header={<AccountHeader title="FAQs" />} contentStyle={styles.content}>
      <FilterChips options={faqCategories} value={category} onChange={setCategory} />
      <View style={styles.list}>
        {faqs
          .filter((faq) => faq.category === category)
          .map((faq) => {
            const open = faq.id === openId;
            const Chevron = open ? ArrowUp2 : ArrowDown2;
            return (
              <View key={faq.id} style={styles.card}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ expanded: open }}
                  accessibilityLabel={faq.question}
                  onPress={() => setOpenId(open ? null : faq.id)}
                  style={styles.question}>
                  <Text style={styles.questionText}>{faq.question}</Text>
                  <Chevron size={24} color={palette.neutral0} />
                </Pressable>
                {open ? (
                  <>
                    <Dash style={styles.dash} />
                    <Text style={styles.answer}>{faq.answer}</Text>
                  </>
                ) : null}
              </View>
            );
          })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 23, paddingBottom: 24 },
  list: { paddingHorizontal: 16, marginTop: 23, gap: 16 },
  card: { borderWidth: 1, borderColor: accountColors.border, borderRadius: 12, padding: 11 },
  question: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  questionText: { flex: 1, fontFamily: fonts.semibold, fontSize: 14, lineHeight: 24, color: palette.neutral0 },
  dash: { marginTop: 8 },
  answer: { marginTop: 7, fontFamily: fonts.regular, fontSize: 13, lineHeight: 16, color: palette.neutral0 },
});
