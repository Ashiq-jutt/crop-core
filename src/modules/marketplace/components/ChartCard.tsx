import { useState, type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Line } from 'react-native-svg';

import { SegmentTabs } from './SegmentTabs';
import { Txt } from './Txt';
import { mk } from './tokens';

export type ChartRange = 'weekly' | 'monthly';

const RANGES = [
  { id: 'weekly', label: 'Weekly' },
  { id: 'monthly', label: 'Monthly' },
] as const;

/** Card-relative geometry shared by both Figma charts (Price Trend + Compare Market). */
export const CHART = {
  width: 343,
  gridYs: [71, 113, 156, 199],
  baseline: 238,
  left: 11,
  right: 331,
  xCenters: [55, 99, 143, 187, 231, 275, 319.5],
};

const WEEK = { top: ['25', '26', '27', '28', '29', '30', '31'], bottom: 'Oct' };
const MONTH = { top: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'], bottom: '25' };

type ChartCardProps = {
  yLabels: string[];
  /** Plot layer drawn in card coordinates (receives the active range). */
  plot: (range: ChartRange) => ReactNode;
  footer?: ReactNode;
  height: number;
};

export function ChartCard({ yLabels, plot, footer, height }: ChartCardProps) {
  const [range, setRange] = useState<ChartRange>('weekly');
  const labels = range === 'weekly' ? WEEK : MONTH;
  return (
    <View style={[styles.card, { height }]}>
      <Svg width={CHART.width} height={height} style={StyleSheet.absoluteFill}>
        {CHART.gridYs.map((y) => (
          <Line key={y} x1={CHART.left} x2={CHART.right} y1={y + 0.5} y2={y + 0.5} stroke="#E7E8EB" strokeWidth={1} strokeDasharray="2 2" />
        ))}
        <Line x1={CHART.left} x2={CHART.right} y1={CHART.baseline + 0.5} y2={CHART.baseline + 0.5} stroke="#F4F6F8" strokeWidth={1} />
      </Svg>
      {yLabels.map((l, i) => (
        <Txt key={l} size={14} color="#3F4145" lineHeight={18} style={[styles.yLabel, { top: CHART.gridYs[i] + 13 }]}>
          {l}
        </Txt>
      ))}
      {plot(range)}
      {labels.top.map((t, i) => (
        <View key={t} style={[styles.xLabel, { left: CHART.xCenters[i] - 20 }]}>
          <Txt size={14} color={mk.ink} lineHeight={16} align="center">
            {t}
          </Txt>
          <Txt size={14} color={i < 2 ? '#6D7380' : mk.ink} lineHeight={16} align="center">
            {labels.bottom}
          </Txt>
        </View>
      ))}
      <View style={styles.head}>
        <Txt size={15} weight="semibold" color={mk.ink} lineHeight={24} style={styles.title}>
          {'Prize Movement\nOver Time'}
        </Txt>
        <SegmentTabs options={RANGES} value={range} onChange={setRange} height={34} style={styles.toggle} />
      </View>
      {footer}
      <View style={styles.border} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { marginHorizontal: 16, borderRadius: 12, overflow: 'hidden' },
  border: { ...StyleSheet.absoluteFill, pointerEvents: 'none', borderWidth: 1, borderColor: mk.border, borderRadius: 12 },
  head: { position: 'absolute', top: 13, left: 11, right: 11, flexDirection: 'row' },
  title: { flex: 1 },
  toggle: { width: 162, gap: 9, paddingHorizontal: 0, marginTop: 8 },
  yLabel: { position: 'absolute', left: 11 },
  xLabel: { position: 'absolute', top: CHART.baseline + 10, width: 40 },
});
