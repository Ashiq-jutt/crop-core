import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Svg, { Line, Polyline } from 'react-native-svg';
import { useLocalSearchParams } from 'expo-router';
import { Add, InfoCircle } from 'iconsax-react-native';

import { Screen } from '@/components/ui';

import { CHART, ChartCard } from '../components/ChartCard';
import { CommodityCard } from '../components/CommodityCard';
import { MarketHeader } from '../components/MarketHeader';
import { ChangeText, Dashed } from '../components/RateParts';
import { SelectMarketSheet } from '../components/SelectMarketSheet';
import { Txt } from '../components/Txt';
import { mk } from '../components/tokens';
import { compareLines } from '../data/charts';
import { chartTooltip, compareColumns, compareRows, crops, marketInsights } from '../data/rates';

const CHART_HEIGHT = 327;
const SERIES = [
  { id: 'bhuj', label: 'Bhuj', color: '#E91F64', points: compareLines.bhuj },
  { id: 'anjar', label: 'Anjar', color: '#248DD2', points: compareLines.anjar },
  { id: 'rajkot', label: 'Rajkot', color: '#1EE550', points: compareLines.rajkot },
];

function Dot({ color }: { color: string }) {
  return <View style={[styles.dot, { backgroundColor: color }]} />;
}

function ComparePlot() {
  return (
    <>
      <Svg width={CHART.width} height={CHART_HEIGHT} style={StyleSheet.absoluteFill}>
        <Line x1={101.5} x2={101.5} y1={88} y2={233} stroke="#D9DCE0" strokeWidth={1.5} strokeDasharray="3 3" />
        {SERIES.map((s) => (
          <Polyline key={s.id} points={s.points} fill="none" stroke={s.color} strokeWidth={1.5} strokeLinejoin="round" />
        ))}
      </Svg>
      <View style={styles.tooltip}>
        <Txt size={12} color="#26282C" lineHeight={16}>
          {chartTooltip.date}
        </Txt>
        <Dashed style={styles.tooltipDash} />
        <View style={styles.tooltipRow}>
          <Dot color={SERIES[0].color} />
          <Txt size={12} color="#26282C" lineHeight={16}>
            {chartTooltip.bhuj}
          </Txt>
          <View style={styles.gap} />
          <Dot color={SERIES[1].color} />
          <Txt size={12} color="#26282C" lineHeight={16}>
            {chartTooltip.anjar}
          </Txt>
        </View>
        <View style={styles.tooltipRow}>
          <Dot color={SERIES[2].color} />
          <Txt size={12} color="#26282C" lineHeight={16}>
            {chartTooltip.rajkot}
          </Txt>
        </View>
      </View>
    </>
  );
}

export function CompareMarketScreen() {
  const [marketIds, setMarketIds] = useState(['anjar', 'rajkot']);
  const { select } = useLocalSearchParams<{ select?: string }>();
  const [sheetOpen, setSheetOpen] = useState(select !== undefined);
  const [sheetKey, setSheetKey] = useState(0);
  const columns = ['bhuj', ...marketIds].map((id) => compareColumns[id]);

  const openSheet = () => {
    setSheetKey((k) => k + 1);
    setSheetOpen(true);
  };

  return (
    <Screen
      header={<MarketHeader title="Compare Market" right={<Pressable accessibilityRole="button" accessibilityLabel="More options" hitSlop={8} onPress={openSheet} style={styles.more}>
              {[0, 1, 2].map((d) => (
                <View key={d} style={styles.moreDot} />
              ))}
            </Pressable>} />}
      contentStyle={styles.content}>
      <Txt size={16.5} weight="semibold" color={mk.ink} lineHeight={24} style={styles.section}>
        Commodity
      </Txt>
      <CommodityCard crop={crops[0]} style={styles.commodity} />

      <Txt size={16.5} weight="semibold" color={mk.ink} lineHeight={24} style={styles.section}>
        Market Comparison
      </Txt>
      <Pressable accessibilityRole="button" accessibilityLabel="Add Market" onPress={openSheet} style={styles.add}>
        <Add size={22} color={mk.ink} />
        <Txt size={14.5} weight="semibold" color={mk.ink} lineHeight={20}>
          Add Market
        </Txt>
      </Pressable>
      <View style={styles.chips}>
        {marketIds.map((id) => (
          <Pressable
            key={id}
            accessibilityRole="button"
            accessibilityLabel={`Remove ${compareColumns[id].name}`}
            onPress={() => setMarketIds((ids) => ids.filter((x) => x !== id))}
            style={styles.chip}>
            <Txt size={13} weight="semibold" color={mk.ink} lineHeight={18}>
              {compareColumns[id].name}
            </Txt>
            <View style={styles.close}>
              <Add size={18} color={mk.ink} />
            </View>
          </Pressable>
        ))}
      </View>
      <Dashed style={styles.rule} />

      <View style={styles.table}>
        <View style={styles.headRow}>
          <Txt size={13} color="#26282C" lineHeight={18} style={styles.metric}>
            Metrics
          </Txt>
          {columns.map((c) => (
            <Txt key={c.name} size={13} color="#26282C" lineHeight={18} align="center" style={styles.col}>
              {c.name}
            </Txt>
          ))}
        </View>
        {compareRows.map((label, r) => (
          <View key={label}>
            <Dashed />
            <View style={[styles.row, r === compareRows.length - 1 && styles.rowLast]}>
              <Txt size={13} color="#26282C" lineHeight={16} style={styles.metric}>
                {label}
              </Txt>
              {columns.map((c) => {
                const v = c.values[r];
                return (
                  <View key={c.name} style={styles.col}>
                    {v.up === undefined ? (
                      <Txt size={13} color="#26282C" lineHeight={18} align="center">
                        {v.text}
                      </Txt>
                    ) : (
                      <ChangeText text={v.text} up={v.up} size={14.5} />
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        ))}
        <Dashed />
      </View>

      <Txt size={16.5} weight="semibold" color={mk.ink} lineHeight={24} style={styles.sectionTrends}>
        Prize Trends
      </Txt>
      <View style={styles.chart}>
        <ChartCard
          yLabels={['$150', '$100', '$50', '$25']}
          height={CHART_HEIGHT}
          plot={() => <ComparePlot />}
          footer={
            <>
              <View style={styles.chartRule} />
              <View style={styles.legend}>
                {SERIES.map((s) => (
                  <View key={s.id} style={styles.legendItem}>
                    <Dot color={s.color} />
                    <Txt size={11.5} color="#3A3B3D" lineHeight={16}>
                      {s.label}
                    </Txt>
                  </View>
                ))}
              </View>
            </>
          }
        />
      </View>

      <View style={styles.insight}>
        <View style={styles.insightHead}>
          <InfoCircle size={24} color="#1B87D0" />
          <Txt size={16.5} weight="medium" color={mk.ink} lineHeight={24}>
            Market Inside
          </Txt>
        </View>
        <View style={styles.insightList}>
          <Dashed color="#DCE3EA" />
          {marketInsights.map((m) => (
            <View key={m.label}>
              <View style={styles.bulletRow}>
                <Txt size={13} color={mk.ink} lineHeight={16} style={styles.bullet}>
                  •
                </Txt>
                <Txt size={13} color="#26282C" lineHeight={16} style={styles.flex}>
                  <Txt size={13} weight="semibold" color={mk.ink} lineHeight={16}>
                    {m.label}
                  </Txt>
                  {m.text}
                </Txt>
              </View>
              <Dashed color="#DCE3EA" />
            </View>
          ))}
        </View>
      </View>

      <SelectMarketSheet
        key={sheetKey}
        visible={sheetOpen}
        selected={marketIds}
        onClose={() => setSheetOpen(false)}
        onApply={(ids) => {
          setMarketIds(ids.slice(0, 3));
          setSheetOpen(false);
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  more: { width: 24, height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 3 },
  moreDot: { width: 4.5, height: 4.5, borderRadius: 2.25, backgroundColor: mk.ink },
  content: { paddingBottom: 110 },
  section: { marginTop: 24, paddingHorizontal: 16 },
  sectionTrends: { marginTop: 25, paddingHorizontal: 16 },
  commodity: { marginTop: 11 },
  add: {
    marginTop: 12,
    marginHorizontal: 16,
    height: 52,
    borderRadius: 26,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#E4E6E9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  chips: { flexDirection: 'row', gap: 12, paddingHorizontal: 16, marginTop: 12 },
  chip: {
    height: 32,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7E9',
    backgroundColor: mk.surface,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 11,
    gap: 8,
  },
  close: { transform: [{ rotate: '45deg' }] },
  rule: { marginTop: 12, marginHorizontal: 16 },
  table: {
    marginTop: 11,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: mk.border,
    borderRadius: 12,
    paddingHorizontal: 11,
    paddingBottom: 10,
  },
  headRow: { height: 38, flexDirection: 'row', alignItems: 'center', paddingTop: 2 },
  row: { height: 55, flexDirection: 'row', alignItems: 'center' },
  rowLast: { height: 39 },
  metric: { width: 69 },
  col: { flex: 1, alignItems: 'center' },
  chart: { marginTop: 12 },
  chartRule: { position: 'absolute', left: 11, right: 11, top: 290, height: 1, backgroundColor: '#F4F6F8' },
  legend: { position: 'absolute', top: 301, left: 0, right: 0, flexDirection: 'row', justifyContent: 'center', gap: 12 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  tooltip: {
    position: 'absolute',
    left: 48,
    top: 161,
    width: 138,
    height: 64,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingTop: 4,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  tooltipDash: { marginTop: 3 },
  tooltipRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  gap: { width: 8 },
  insight: {
    marginTop: 26,
    marginHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#EDF6FC',
    paddingHorizontal: 12,
    paddingTop: 13,
    paddingBottom: 12,
  },
  insightHead: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  insightList: { marginLeft: 36, marginTop: 6 },
  bulletRow: { flexDirection: 'row', paddingTop: 8.5, paddingBottom: 6.5 },
  bullet: { width: 10, marginLeft: 6 },
});
