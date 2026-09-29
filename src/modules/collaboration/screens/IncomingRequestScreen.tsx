import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Edit2 } from 'iconsax-react-native';

import { Screen } from '@/components/ui';
import { colors, fonts } from '@/theme';

import { CollabFooter } from '../components/CollabFooter';
import { CollabHeader } from '../components/CollabHeader';
import { CompensationCard } from '../components/CompensationCard';
import { DateTimeRow } from '../components/DateTimeRow';
import { HelperCard } from '../components/HelperCard';
import { NoteBox } from '../components/NoteBox';
import { PrimaryButton } from '../components/PrimaryButton';
import { SectionTitle } from '../components/SectionTitle';
import { TaskSummary } from '../components/TaskSummary';
import { compensationOptions, incomingDetail, requester } from '../data/collaboration';
import { collabColors } from '../theme';

const paidHelp = compensationOptions[1];

const backToIncoming = () => router.dismissTo({ pathname: '/collaboration', params: { tab: 'incoming' } });

/** Figma 16 — details of a request another farmer sent to me. */
export function IncomingRequestScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <Screen
      header={<CollabHeader title="Request Details" />}
      contentStyle={styles.content}
      footer={
        <CollabFooter>
          <View style={styles.suggestRow}>
            <Text style={styles.suggestText}>You Can Also Suggest Your Timings</Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => router.push({ pathname: '/collaboration/incoming/[id]/suggest', params: { id } })}
              style={styles.edit}>
              <Edit2 size={20} color={colors.primary} />
              <Text style={styles.editText}>Edit Request</Text>
            </Pressable>
          </View>
          <View style={styles.buttons}>
            <PrimaryButton label="Accept" onPress={backToIncoming} style={styles.button} />
            <PrimaryButton label="Rejected" variant="outline" onPress={backToIncoming} style={styles.button} />
          </View>
        </CollabFooter>
      }>
      <SectionTitle style={styles.firstTitle}>Requester Farmer</SectionTitle>
      <View style={styles.afterTitle}>
        <HelperCard onCall={() => Linking.openURL(requester.phone)} />
      </View>

      <SectionTitle style={styles.title}>Requested Task</SectionTitle>
      <View style={[styles.afterTitle, styles.taskCard]}>
        <TaskSummary />
      </View>

      <SectionTitle style={styles.title}>Timings</SectionTitle>
      <View style={styles.afterTitle}>
        <DateTimeRow label="Starting Date" value={incomingDetail.start} first />
        <DateTimeRow label="End Date" value={incomingDetail.end} />
      </View>

      <SectionTitle style={styles.title}>Short Note</SectionTitle>
      <View style={styles.afterTitle}>
        <NoteBox text={incomingDetail.note} />
      </View>

      <SectionTitle style={styles.title}>Compensation</SectionTitle>
      <View style={styles.afterTitle}>
        <CompensationCard
          title={paidHelp.title}
          description={paidHelp.description}
          amount={{ value: incomingDetail.amount }}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 23, paddingBottom: 24 },
  firstTitle: { marginTop: 0 },
  title: { marginTop: 14 },
  afterTitle: { marginTop: 14 },
  taskCard: {
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: collabColors.border,
    borderRadius: 12,
    padding: 11,
  },
  suggestRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  suggestText: { fontFamily: fonts.semibold, fontSize: 13, lineHeight: 20, color: colors.textPrimary },
  edit: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  editText: { fontFamily: fonts.medium, fontSize: 13.2, lineHeight: 20, color: colors.primary },
  buttons: { flexDirection: 'row', gap: 7, marginTop: 16 },
  button: { flex: 1 },
});
