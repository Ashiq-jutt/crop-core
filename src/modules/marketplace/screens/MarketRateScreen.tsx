import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowRight2 } from 'iconsax-react-native';

import { Screen } from '@/components/ui';

import { MarketHeader } from '../components/MarketHeader';
import { BellButton, ChangePill, CropAvatar, CropHead, Dashed, DropdownRow, StatTriple } from '../components/RateParts';
import { SegmentTabs } from '../components/SegmentTabs';
import { SetAlertSheet } from '../components/SetAlertSheet';
import { Txt } from '../components/Txt';
import { mk } from '../components/tokens';
import { crops, gainers, getCrop, homeMarket, losers, markets, rateFilters, sortOptions, topMovers, type Crop } from '../data/rates';

const MOVER_TABS = [
  { id: 'gainers', label: 'Top Gainers' },
  { id: 'losers', label: 'Top Looser' },
] as const;

export function MarketRateScreen() {
  const [filter, setFilter] = useState('all');
  const [moverTab, setMoverTab] = useState<'gainers' | 'losers'>('gainers');
  const { alert } = useLocalSearchParams<{ alert?: string }>();
  const [alertCrop, setAlertCrop] = useState<Crop | null>(alert ? getCrop(alert) : null);
  const movers = moverTab === 'gainers' ? gainers : losers;

  return (
    <Screen header={<MarketHeader title="Market Rates" />} contentStyle={styles.content}>
      <View style={styles.drops}>
        <DropdownRow left={markets} right={sortOptions} />
      </View>
      <View style={styles.rule} />

      <View style={styles.marketRow}>
        <View style={styles.flex}>
          <Txt size={16.5} weight="semibold" color={mk.ink} lineHeight={22}>
            {homeMarket.name}
          </Txt>
          <Txt size={12.5} color="#565A64" lineHeight={18} style={styles.km}>
            {homeMarket.distance}
          </Txt>
        </View>
        <BellButton size={40} onPress={() => setAlertCrop(crops[0])} />
      </View>

      <View style={styles.movers}>
        {[
          { m: topMovers.gainer, up: true },
          { m: topMovers.loser, up: false },
        ].map(({ m, up }) => (
          <View key={m.label} style={[styles.mover, up ? styles.gain : styles.lose]}>
            <View style={styles.flex}>
              <Txt size={13} color="#25292C" lineHeight={18}>
                {m.label}
              </Txt>
              <Txt size={14.5} weight="semibold" color={mk.ink} lineHeight={20} style={styles.moverName}>
                {m.name}
              </Txt>
              <Txt size={16.5} weight="medium" color={up ? '#2AB952' : '#DE0000'} lineHeight={22} style={styles.moverPct}>
                {m.change}
              </Txt>
            </View>
            <Image source={m.image} style={up ? styles.onion : styles.wheat} />
          </View>
        ))}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chips} contentContainerStyle={styles.chipRow}>
        {rateFilters.map((f) => {
          const active = f.id === filter;
          return (
            <Pressable
              key={f.id}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              accessibilityLabel={f.label}
              onPress={() => setFilter(f.id)}
              style={[styles.chip, active && styles.chipActive]}>
              <Txt size={13} weight={active ? 'semibold' : 'regular'} color={mk.ink} lineHeight={18}>
                {f.label}
              </Txt>
              {f.icon ? <Image source={f.icon} style={styles.chipIcon} /> : null}
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.cards}>
        {crops.map((c) => (
          <View key={c.id} style={styles.card}>
            <View style={styles.cardHead}>
              <CropHead crop={c} inlineChange />
              <BellButton size={40} onPress={() => setAlertCrop(c)} />
            </View>
            <Dashed style={styles.cardDash} />
            <View style={styles.statsWrap}>
              <StatTriple crop={c} />
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`View prize trend for ${c.name}`}
              onPress={() => router.push(`/marketplace/trends/${c.id}`)}
              style={styles.trendLink}>
              <Txt size={15} weight="medium" color={mk.orange} lineHeight={20}>
                View Prize Trend
              </Txt>
              <ArrowRight2 size={20} color={mk.orange} />
            </Pressable>
          </View>
        ))}
      </View>

      <SegmentTabs options={MOVER_TABS} value={moverTab} onChange={setMoverTab} height={42} style={styles.moverTabs} />
      <Dashed style={styles.listDash} />
      {movers.map((m) => (
        <View key={m.id}>
          <View style={styles.moverRow}>
            <CropAvatar source={m.icon} size={40} />
            <View style={styles.moverText}>
              <Txt size={16} weight="semibold" color={mk.ink} lineHeight={20}>
                {m.name}
              </Txt>
              <Txt size={13} color="#121315" lineHeight={18} style={styles.moverPrice}>
                {m.price}
              </Txt>
            </View>
            <ChangePill text={m.change} up={moverTab === 'gainers'} height={28} width={65} />
          </View>
          <Dashed style={styles.rowDash} />
        </View>
      ))}

      <SetAlertSheet crop={alertCrop} onClose={() => setAlertCrop(null)} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { paddingBottom: 16 },
  drops: { marginTop: 24 },
  rule: { height: 1, backgroundColor: '#E6E8EA', marginTop: 15 },
  marketRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginTop: 17 },
  km: { marginTop: 5 },
  movers: { flexDirection: 'row', gap: 13, paddingHorizontal: 16, marginTop: 10 },
  mover: { flex: 1, height: 92, borderRadius: 16, flexDirection: 'row', alignItems: 'center', paddingLeft: 11, paddingRight: 10 },
  gain: { backgroundColor: mk.gainSurface },
  lose: { backgroundColor: '#FCE5E3' },
  moverName: { marginTop: 4 },
  moverPct: { marginTop: 4 },
  onion: { width: 47, height: 53, marginRight: 2 },
  wheat: { width: 54, height: 54, marginRight: -1 },
  chips: { marginHorizontal: 16, marginTop: 31, flexGrow: 0 },
  chipRow: { gap: 16 },
  chip: {
    height: 34,
    borderRadius: 12,
    backgroundColor: mk.surface,
    borderWidth: 1.5,
    borderColor: mk.surface,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 11,
    gap: 8,
  },
  chipActive: { backgroundColor: mk.orangeSurface, borderColor: '#EC6619' },
  chipIcon: { width: 20, height: 20 },
  cards: { marginTop: 10, gap: 12, paddingHorizontal: 16 },
  card: { height: 176, borderWidth: 1, borderColor: mk.border, borderRadius: 12, paddingHorizontal: 11, paddingTop: 12 },
  cardHead: { flexDirection: 'row', alignItems: 'center' },
  cardDash: { marginTop: 15 },
  statsWrap: { marginTop: 11 },
  trendLink: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 17 },
  moverTabs: { marginTop: 33 },
  listDash: { marginTop: 13, marginHorizontal: 16 },
  moverRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, height: 67 },
  moverText: { flex: 1, marginLeft: 16 },
  moverPrice: { marginTop: 7 },
  rowDash: { marginHorizontal: 16 },
});
