import { Fragment } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { Calendar2, Clock, Timer1 } from 'iconsax-react-native';

import { colors, fonts } from '@/theme';

import { images, incomingTask, type IncomingRequest } from '../data/collaboration';
import { collabColors } from '../theme';
import { CheckGlyph, CloseGlyph, DotsGlyph } from './Glyphs';
import { PersonRow } from './PersonRow';
import { RoundIconButton } from './RoundIconButton';
import { StatusBadge } from './StatusBadge';
import { TaskSummary } from './TaskSummary';

type IncomingRequestCardProps = {
  request: IncomingRequest;
  onPress: () => void;
  onAccept: () => void;
  onReject: () => void;
  onMore: () => void;
};

const noteTones = {
  blue: collabColors.blueSurface,
  red: collabColors.redSurface,
  grey: collabColors.grey,
} as const;

const facts = [
  { key: 'date', Icon: Calendar2, value: incomingTask.date },
  { key: 'time', Icon: Clock, value: incomingTask.time },
  { key: 'duration', Icon: Timer1, value: incomingTask.duration },
];

export function IncomingRequestCard({ request, onPress, onAccept, onReject, onMore }: IncomingRequestCardProps) {
  const pending = request.status === 'pending';
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Incoming request from David Malan"
      onPress={onPress}
      style={styles.card}>
      <PersonRow
        avatarSize={38}
        right={
          pending ? (
            <View style={styles.actions}>
              <RoundIconButton
                accessibilityLabel="Accept request"
                onPress={onAccept}
                icon={<CheckGlyph color={colors.textPrimary} strokeWidth={2.6} />}
              />
              <RoundIconButton
                accessibilityLabel="Reject request"
                onPress={onReject}
                icon={<CloseGlyph color={colors.textPrimary} strokeWidth={2.2} />}
              />
            </View>
          ) : (
            <View style={styles.actions}>
              <StatusBadge status={request.status} />
              <Pressable accessibilityRole="button" accessibilityLabel="More options" hitSlop={8} onPress={onMore}>
                <DotsGlyph color={colors.textPrimary} vertical />
              </Pressable>
            </View>
          )
        }
      />

      {request.note ? (
        <View style={[styles.note, { backgroundColor: noteTones[request.note.tone] }]}>
          <Text style={styles.noteText}>{request.note.text}</Text>
        </View>
      ) : null}

      <View style={styles.dashed} />

      <TaskSummary />

      <View style={styles.facts}>
        {facts.map(({ key, Icon, value }, i) => (
          <Fragment key={key}>
            {i > 0 ? <View style={styles.factDivider} /> : null}
            <View style={styles.fact}>
              <View style={styles.factIcon}>
                <Icon size={18} color={colors.textPrimary} />
              </View>
              <Text style={styles.factValue}>{value}</Text>
            </View>
          </Fragment>
        ))}
      </View>

      <Text style={styles.description}>{incomingTask.note}</Text>

      {request.helpedNote ? (
        <View style={styles.helped}>
          <Image source={images.davidMalan} style={styles.helpedAvatar} />
          <Text style={styles.helpedText}>{request.helpedNote}</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: collabColors.border,
    borderRadius: 12,
    paddingHorizontal: 11,
    paddingTop: 9,
    paddingBottom: 11,
    backgroundColor: colors.surface,
  },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  note: { marginTop: 10, marginBottom: 2, height: 32, borderRadius: 8, paddingHorizontal: 8, justifyContent: 'center' },
  noteText: { fontFamily: fonts.semibold, fontSize: 13, lineHeight: 20, color: colors.textPrimary },
  dashed: {
    marginTop: 9,
    marginBottom: 12,
    height: 0,
    borderTopWidth: 1,
    borderStyle: 'dashed',
    borderColor: collabColors.border,
  },
  facts: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  fact: { width: 95, alignItems: 'center', gap: 3 },
  factIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: collabColors.grey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  factValue: { fontFamily: fonts.medium, fontSize: 13, lineHeight: 18, color: colors.textPrimary },
  factDivider: { width: 2, height: 32, backgroundColor: '#676767' },
  description: { marginTop: 11, fontFamily: fonts.regular, fontSize: 14, lineHeight: 20, color: colors.textPrimary },
  helped: {
    marginTop: 12,
    height: 40,
    borderRadius: 8,
    backgroundColor: collabColors.greenSurface,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    gap: 8,
  },
  helpedAvatar: { width: 24, height: 24, borderRadius: 12 },
  helpedText: { fontFamily: fonts.semibold, fontSize: 13, lineHeight: 20, color: colors.textPrimary },
});
