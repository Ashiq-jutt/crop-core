import { Linking, StyleSheet, View } from 'react-native';
import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { TickCircle } from 'iconsax-react-native';

import { Screen } from '@/components/ui';
import { colors } from '@/theme';

import { CollabFooter } from '../components/CollabFooter';
import { CollabHeader } from '../components/CollabHeader';
import { CompensationCard } from '../components/CompensationCard';
import { DateTimeRow } from '../components/DateTimeRow';
import { DetailHeaderCard } from '../components/DetailHeaderCard';
import { HelperCard } from '../components/HelperCard';
import { MoreMenu } from '../components/MoreMenu';
import { NoteBox } from '../components/NoteBox';
import { PrimaryButton } from '../components/PrimaryButton';
import { ResponsesCard } from '../components/ResponsesCard';
import { SectionTitle } from '../components/SectionTitle';
import { StatusBanner } from '../components/StatusBanner';
import { compensationOptions, requestDetails, requester } from '../data/collaboration';

const paidHelp = compensationOptions[1];

const openRequest = (id: string) => router.replace({ pathname: '/collaboration/request/[id]', params: { id } });
const repost = () => router.push('/collaboration/task-details');
const call = () => Linking.openURL(requester.phone);

/** Figma 06 (pending), 07 (in progress), 08 (expired), 11 (completed) and 14 (equipment pending). */
export function RequestDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const detail = requestDetails[id];
  if (!detail) return <Redirect href="/collaboration" />;

  const onCta = () => {
    switch (detail.status) {
      case 'inProgress':
        return openRequest('spray-completed');
      case 'expired':
      case 'completed':
        return repost();
      default:
        return router.back();
    }
  };

  const equipment = detail.kind === 'equipment';

  return (
    <Screen
      header={
        <CollabHeader
          title="Request Details"
          right={
            <MoreMenu
              actions={[
                { label: 'Edit Request', onPress: repost },
                { label: 'Cancel Request', onPress: () => router.back() },
              ]}
            />
          }
        />
      }
      contentStyle={styles.content}
      footer={
        <CollabFooter>
          <PrimaryButton
            label={detail.cta}
            onPress={onCta}
            rightIcon={detail.status === 'inProgress' ? <TickCircle size={24} color={colors.surface} variant="Bold" /> : undefined}
          />
        </CollabFooter>
      }>
      {equipment ? <SectionTitle style={styles.firstTitle}>{"Selected Equipment's"}</SectionTitle> : null}
      <View style={equipment ? styles.afterTitle : undefined}>
        <DetailHeaderCard
          title={detail.title}
          meta={detail.meta}
          icon={detail.icon}
          iconBg={detail.iconBg}
          status={detail.status}
          compact={equipment}
        />
      </View>

      <SectionTitle style={styles.title}>Timings</SectionTitle>
      <View style={styles.afterTitle}>
        <DateTimeRow label="Starting Date" value={detail.start} first />
        <DateTimeRow label="End Date" value={detail.end} />
      </View>

      <SectionTitle style={styles.title}>Short Note</SectionTitle>
      <View style={styles.afterTitle}>
        <NoteBox text={detail.note} />
      </View>

      <SectionTitle style={styles.title}>Compensation</SectionTitle>
      <View style={styles.afterTitle}>
        <CompensationCard title={paidHelp.title} description={paidHelp.description} amount={{ value: detail.amount }} />
      </View>

      {detail.banner ? (
        <View style={styles.banner}>
          <StatusBanner text={detail.banner.text} tone={detail.banner.tone} />
        </View>
      ) : null}

      {detail.responses ? (
        <>
          <SectionTitle style={styles.title}>Response</SectionTitle>
          <View style={styles.afterTitle}>
            <ResponsesCard
              responses={detail.responses}
              onConfirmHelper={() => openRequest('harvesting-progress')}
              onCall={call}
            />
          </View>
        </>
      ) : null}

      {detail.helperTitle ? (
        <>
          <SectionTitle style={styles.title}>{detail.helperTitle}</SectionTitle>
          <View style={styles.afterTitle}>
            <HelperCard onCall={call} />
          </View>
        </>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 25, paddingBottom: 20 },
  firstTitle: { marginTop: -2 },
  title: { marginTop: 14 },
  afterTitle: { marginTop: 14 },
  banner: { marginTop: 16 },
});
