import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { Calendar2, Call } from 'iconsax-react-native';

import { colors, fonts, palette } from '@/theme';

import { requester, type HelperResponse, type ResponseTab } from '../data/collaboration';
import { collabColors } from '../theme';
import { CheckGlyph } from './Glyphs';
import { RoundIconButton } from './RoundIconButton';

type ResponsesCardProps = {
  responses: Record<ResponseTab, HelperResponse[]>;
  onConfirmHelper: () => void;
  onCall: () => void;
};

const tabLabels: Record<ResponseTab, string> = {
  accepted: 'Accepted',
  suggested: 'Suggested',
  rejected: 'Rejected',
};

const tabOrder: ResponseTab[] = ['accepted', 'suggested', 'rejected'];

export function ResponsesCard({ responses, onConfirmHelper, onCall }: ResponsesCardProps) {
  const [tab, setTab] = useState<ResponseTab>('accepted');
  const list = responses[tab];

  return (
    <View style={styles.card}>
      <View style={styles.tabs}>
        {tabOrder.map((t) => {
          const active = t === tab;
          return (
            <Pressable
              key={t}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
              onPress={() => setTab(t)}
              style={[styles.tab, active && styles.tabActive]}>
              <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>
                {`${tabLabels[t]} (${responses[t].length})`}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <View style={styles.dashed} />

      {list.length === 0 ? (
        <View style={styles.empty}>
          <View style={styles.emptyIcon}>
            <Calendar2 size={24} color={colors.textPrimary} />
          </View>
          <Text style={styles.emptyText}>{`No ${tabLabels[tab]} Responses`}</Text>
        </View>
      ) : (
        <View style={styles.list}>
          {list.map((r) => (
            <View key={r.id} style={styles.response}>
              <View style={styles.responseHead}>
                <Image source={requester.avatar} style={styles.avatar} />
                <View style={styles.who}>
                  <Text style={styles.name}>{requester.name}</Text>
                  <Text style={styles.distance}>{requester.distance}</Text>
                </View>
                {tab !== 'rejected' ? (
                  <RoundIconButton
                    accessibilityLabel="Confirm helper"
                    onPress={onConfirmHelper}
                    icon={<CheckGlyph color={colors.textPrimary} strokeWidth={2.6} />}
                  />
                ) : null}
                <RoundIconButton
                  accessibilityLabel="Call David Malan"
                  onPress={onCall}
                  icon={<Call size={22} color={colors.textPrimary} />}
                />
              </View>
              <Text style={styles.message} numberOfLines={1}>
                {r.message}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: collabColors.border,
    borderRadius: 12,
    padding: 11,
  },
  tabs: {
    height: 48,
    borderRadius: 12,
    backgroundColor: collabColors.grey,
    flexDirection: 'row',
    padding: 6,
  },
  tab: { flex: 1, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  tabActive: { backgroundColor: colors.primary },
  tabLabel: { fontFamily: fonts.regular, fontSize: 13, lineHeight: 18, color: colors.textPrimary },
  tabLabelActive: { fontFamily: fonts.semibold, color: colors.textOnPrimary },
  dashed: {
    marginTop: 11,
    height: 0,
    borderTopWidth: 1,
    borderStyle: 'dashed',
    borderColor: collabColors.border,
  },
  list: { marginTop: 12, gap: 16 },
  response: {
    borderWidth: 1,
    borderColor: collabColors.border,
    borderRadius: 12,
    paddingHorizontal: 11,
    paddingTop: 10,
    paddingBottom: 10,
  },
  responseHead: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  avatar: { width: 38, height: 38, borderRadius: 19, marginRight: 4 },
  who: { flex: 1, gap: 2 },
  name: { fontFamily: fonts.semibold, fontSize: 14, lineHeight: 18, color: colors.textPrimary },
  distance: { fontFamily: fonts.regular, fontSize: 13, lineHeight: 18, color: palette.neutral20 },
  message: { marginTop: 10, fontFamily: fonts.regular, fontSize: 12.9, lineHeight: 18, color: colors.textPrimary },
  empty: { alignItems: 'center', paddingTop: 24, paddingBottom: 12, gap: 12 },
  emptyIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: collabColors.grey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: { fontFamily: fonts.regular, fontSize: 13, lineHeight: 20, color: palette.neutral30 },
});
