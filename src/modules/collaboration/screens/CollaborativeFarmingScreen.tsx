import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { Screen } from '@/components/ui';

import { CollabFooter } from '../components/CollabFooter';
import { CollabHeader } from '../components/CollabHeader';
import { FilterChips } from '../components/FilterChips';
import { IncomingRequestCard } from '../components/IncomingRequestCard';
import { MyRequestCard } from '../components/MyRequestCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { TabSwitch } from '../components/TabSwitch';
import {
  filterChips,
  incomingRequests,
  myRequests,
  type DashboardTab,
  type FilterChip,
  type IncomingRequest,
  type RequestStatus,
} from '../data/collaboration';

const tabs: { id: DashboardTab; label: string }[] = [
  { id: 'my', label: 'My Request' },
  { id: 'incoming', label: 'Incoming Request' },
];

/** Figma 01 (My Request) and 15 (Incoming Request). */
export function CollaborativeFarmingScreen() {
  const params = useLocalSearchParams<{ tab?: string }>();
  // The tab lives in the URL so "Send Suggestion" / "Accept" can return straight to Incoming Request.
  const tab: DashboardTab = params.tab === 'incoming' ? 'incoming' : 'my';
  const setTab = (next: DashboardTab) => router.setParams({ tab: next });
  const [filter, setFilter] = useState<FilterChip['id']>('all');
  const [incoming, setIncoming] = useState<IncomingRequest[]>(incomingRequests);

  const setIncomingStatus = (id: string, status: RequestStatus) =>
    setIncoming((list) => list.map((r) => (r.id === id ? { ...r, status, helpedNote: undefined } : r)));

  const openIncoming = (id: string) =>
    router.push({ pathname: '/collaboration/incoming/[id]', params: { id } });

  return (
    <Screen
      header={
        <>
          <CollabHeader title="Collaborative Farming" />
          <TabSwitch tabs={tabs} value={tab} onChange={setTab} />
          <FilterChips chips={filterChips} value={filter} onChange={setFilter} />
        </>
      }
      contentStyle={styles.list}
      footer={
        <CollabFooter>
          <PrimaryButton label="Add Request Help" onPress={() => router.push('/collaboration/add')} />
        </CollabFooter>
      }>
      {tab === 'my'
        ? myRequests
            .filter((r) => filter === 'all' || r.filters.includes(filter))
            .map((r) => (
              <MyRequestCard
                key={r.id}
                request={r}
                onPress={() => router.push({ pathname: '/collaboration/request/[id]', params: { id: r.id } })}
              />
            ))
        : incoming
            .filter((r) => filter === 'all' || r.status === filter)
            .map((r) => (
              <IncomingRequestCard
                key={r.id}
                request={r}
                onPress={() => openIncoming(r.id)}
                onMore={() => openIncoming(r.id)}
                onAccept={() => setIncomingStatus(r.id, 'accepted')}
                onReject={() => setIncomingStatus(r.id, 'rejected')}
              />
            ))}
      <View style={styles.end} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { paddingTop: 23, gap: 16 },
  end: { height: 4 },
});
